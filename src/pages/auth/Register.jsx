import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Button, Form, Input, message } from "antd";
import Divider from "../../components/divider/Divider";
import { RegisterUser } from "../../api/users";
import { useNavigate, Link } from "react-router-dom";
import { setLoader } from "../../redux/loadersSlice";

const rules = [{
  required: true,
  message: "This field is required",
}];

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(setLoader(true));
      const response = await RegisterUser(values);
      dispatch(setLoader(false));
      if (response.success) {
        // Store session data in sessionStorage upon successful registration
        sessionStorage.setItem("isLoggedIn", "true");
        navigate("/login");
        message.success(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    // Check if the user is already logged in using sessionStorage
    if (sessionStorage.getItem("isLoggedIn")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="h-screen bg-primary flex justify-center items-center">
      <div className="bg-light-gray p-5 rounded w-[450px]">
        <h1 className="text-primary text-2xl">Pharmacy User- <span className="text-gray-400 text-2xl">REGISTER</span></h1>
        <Divider />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="UseerName" name="name" rules={rules}>
            <Input placeholder="Please Fill User Name" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={rules}>
            <Input.Password placeholder="Please Fill Password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block className="mt-2">
            Register
          </Button>
          <div className="mt-5 text-center">
            <span className="text-gray-600">Already have An Account? <Link to="/login" className="text-primary">Login</Link></span>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
