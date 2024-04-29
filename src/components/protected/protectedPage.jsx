import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { message, Badge, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import { GetCurrentUser } from "../../api/users";
import { setLoader } from "../../redux/loadersSlice";
import { setUser } from "../../redux/usersSlice";
import {
  GetAllNotifications,
  ReadAllNotifications,
} from "../../api/notfications";
import Notifications from "../notification/Notifications";
import { RiNotification3Line } from "react-icons/ri";
import { LogoutOutlined } from "@ant-design/icons";
function ProtectedPage({ children }) {
  const [notifications = [], setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateToken = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetCurrentUser();
      dispatch(setLoader(false));
      if (response.success) {
        dispatch(setUser(response.data));
      } else {
        navigate("/login");
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      navigate("/login");
      message.error(error.message);
    }
  };

  const getNotifications = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetAllNotifications();
      dispatch(setLoader(false));
      if (response.success) {
        setNotifications(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  const readNotifications = async () => {
    try {
      dispatch(setLoader(true));
      const response = await ReadAllNotifications();
      dispatch(setLoader(false));
      if (response.success) {
        getNotifications();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      validateToken();
      getNotifications();
    } else {
      navigate("/login");
      message.error("Please login to continue");
    }
  }, []);

  return (
    user && (
      <div>
        {/* Header */}
        <div className="flex justify-between items-center bg-primary p-5">
          <h1
            className="text-2xl text-white cursor-pointer"
            onClick={() => navigate("/")}
          >
            Mercy
          </h1>
          <div className="bg-white py-2 px-5 rounded flex gap-1 items-center">
            <span
              className="underline cursor-pointer uppercase"
              onClick={() => {
                if (user.role === user) {
                  navigate("/profile");
                } else {
                  navigate("/admin");
                }
              }}
            >
              {user.name}
            </span>
            <Badge
              count={
                notifications.filter((notification) => !notification.read)
                  .length
              }
              onClick={() => {
                readNotifications();
                setShowNotifications(true);
              }}
              className="cursor-pointer"
            >
              <Avatar shape="circle" icon={<RiNotification3Line />} />
            </Badge>
            <LogoutOutlined
              className="h-8 w-8 text-red-500 ml-10 cursor-pointer"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            />
          </div>
        </div>
        {/* Body */}
        <div className="p-5">{children}</div>
        <Notifications
          notifications={notifications}
          reloadNotifications={getNotifications}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
        />
      </div>
    )
  );
}

export default ProtectedPage;
