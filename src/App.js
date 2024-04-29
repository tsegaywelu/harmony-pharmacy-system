import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedPage from "./components/protected/protectedPage";
import Login from "./pages/auth/Login";
import Home from "./pages/home";
import { useSelector } from "react-redux";
import Register from "./pages/auth/Register";
import Spinner from "./components/spinner/spinner";
import Profile from "./pages/profile/profile";
import Admin from "./pages/admin/Admin";
import ProductInfo from "./pages/productInfo/ProductInfo";

function App() {
  const { loading } = useSelector((state) => state.loaders);
  return (
    <>
      {loading && <Spinner />}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedPage>
                <Home />
              </ProtectedPage>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedPage>
                <Profile />
              </ProtectedPage>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedPage>
                <Admin />
              </ProtectedPage>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProtectedPage>
                <ProductInfo />
              </ProtectedPage>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
