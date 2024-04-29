import { axiosInstance } from './axiosInstance';

//add a notfications  
export const AddNotficaations=async(data)=>{
    try{
        const response=await axiosInstance.post("/api/notifications/notify",data);
        return response.data;
    }catch(error){
        return error.response.data;
    }
}
//get all notfications by user
export const GetAllNotifications=async()=>{
    try{
        const response=await axiosInstance.get("/api/notifications/get-all-notifications");
        return response.data;
    }
    catch(error){
        return error.response.data;
    }
};

export const DeleteNotifications=async(id)=>{
    try{
        const response=await axiosInstance.delete('/api/notifications/dalete-notfications/${id}');
        return response.data;
    }
    catch(error){
        return error.response.data;
    }
};
//read all notfications by user 
export const ReadAllNotifications=async()=>{
    try{
        const response =await axiosInstance.put("/api/notifications/read-all-notifications");
        return response.data;
    }
    catch(error){
        return error.response.data;
    }
}