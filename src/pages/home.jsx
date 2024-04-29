import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetProducts } from "../api/products";
import { setLoader } from "../redux/loadersSlice";
import { message, Input } from "antd";
import Divider from "../components/divider/Divider";
import { useNavigate } from "react-router-dom";
import Filters from "./Filters";
import { IoFilter } from "react-icons/io5";

function Home() {
  const [showFilters, setShowFilters] = React.useState(true);
  const [products, setProducts] = React.useState([]);
  const [filters, setFilters] = React.useState({
    status: "approved",
    category: [],
    age: [],
  });
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetProducts(filters);
      dispatch(setLoader(false));
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  React.useEffect(() => {
    getData();
  }, [filters]);

  return (
    <div className="flex gap-5">
      {showFilters && (
        <Filters
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          filters={filters}
          setFilters={setFilters}
        />
      )}
      <div className="flex flex-col gap-5 w-full">
        <div className="flex gap-5 items-center cursor-pointer">
          {!showFilters && (
            <IoFilter onClick={() => setShowFilters(!showFilters)} />
          )}
          <Input
            type="text"
            placeholder="Search Products here..."
            className="border border-gray-300 rounded border-solid w-full p-2 h-14"
          />
        </div>
        <div
          className={`grid gap-5 ${filters ? "grid-cols-5" : "grid-cols-5"}`}
        >
          {products?.map((product) => (
            <div
              className="border border-gray-300 rounded border-solid flex flex-col gap-5 pb-2 cursor-pointer"
              key={product._id}
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <img
                src={product.images[0]}
                className="w-full h-52 p-5 rounded-md object-cover"
                alt=""
              />
              <div className="px-2 flex flex-col">
                <h1 className="text-lg font-semibold">{product.name}</h1>
                <p className="text-sm">
                  {product.age} {product.age === 1 ? "year" : "years"} Old
                </p>
                <Divider />
                <span className="text-xl font-semibold text-green-700">
                  ${product.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
