import { axiosInstance } from "./axiosInstance";

// Register User
export const RegisterUser = async (payload) => {
  try {
    const response = await axiosInstance.post("users/registerUser", payload); // Added semicolon
    return response.data;
  } catch (error) {
    return error.message; // You may want to consider a more robust error handling approach
  }
};

// Login User
export const LoginUser = async (payload) => {
  try {
    const response = await axiosInstance.post("api/users/login", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Get Current User
export const GetCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/api/users/get-current-user");
    return response.data;
  } catch (error) {
    return error.message;
  }
};
//Get All users
export const GetAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/api/users/get-all-users");
    return response.data;
  } catch (error) {
    return error.message;
  }
};
//update user status
export const UpdateUsersStatus = async (id, payload) => {
  try {
    const response = await axiosInstance.put(
      "/api/users/update-user-status/${id}",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
