import { React, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Divider } from 'antd';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../redux/loadersSlice';
import { LoginUser } from "../../api/users";

const rules = [{
  required: true,
  message: "This field is required",
}];

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(setLoader(true));
      const response = await LoginUser(values);
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        // Store session data in sessionStorage upon successful login
        sessionStorage.setItem("isLoggedIn", "true");
        navigate("/");
      } else {
        navigate('/dashboard')
        throw new Error(response.message);
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
      <div className="bg-light-gray p-5 rounded w-[450px] shadow-none">
        <h1 className="text-primary text-2xl">
          Pharmacy-  <span className="text-gray-400 text-2xl">Login</span>
        </h1>
        <Divider />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="UserName" name="tin" rules={rules}>
            <Input placeholder="Please Fill UserName" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={rules}>
            <Input type='Password' placeholder="Please Fill Password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block className="mt-2">
            Login
          </Button>
          <div className="mt-5 text-center">
            <span className="text-gray-600">
              Don't have An Account?{" "}
              <Link to="/register" className="text-primary">
                Register
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
