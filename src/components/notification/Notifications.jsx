import React from 'react'
import moment from "moment";
import { useNavigate } from 'react-router-dom'
import { message, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { DeleteNotifications } from '../../api/notfications'
import { setLoader } from '../../redux/loadersSlice'
function Notifications(
    notifications=[],
    reloadNotifications,
    showNotifications,
    setShowNotifications,
) { const navigate=useNavigate();
    const dispatch=useDispatch();
    const deleteNotifications=async(id)=>{
        try{
            dispatch(setLoader(true));
            const response=await DeleteNotifications(id);
            dispatch(setLoader(false));
            if(response.success){
            message.success(response.message)
            reloadNotifications();
        }else{
            throw new Error(response.message);
        }}
        catch(error){
            dispatch(setLoader(false));
            message.error(error.message);
        }
    }
  return (
    <Modal
        title="Notifications"
        open={showNotifications}
        onCancel={()=>setShowNotifications(false)}
        Footer={null}
        centered
        width={1000}>
      <div className='flex flex-col gap-2'>
        {notifications.map((notification)=>{
            <div className='flex justify-between items-center'>
            <div className='flex gap-2 flex-col items-center border border-solid p-2 border-gray-300 rounded cursor-pointer'
            key={notification._id}
            onClick={()=>{
                navigate(notification.onClick);
                setShowNotifications(false);
            }}>
                <h1 className='text-gray-700'>{notification.title}</h1>
                <span className='text-gray-600'>{notification.message}</span>
                <span className='text-gray-500'>
                    {moment(notifications.createdAt).fromNow()}
                </span>
                <button onClick={() => deleteNotifications(notification._id)}>
                     <FaTrash style={{ fontSize: '20px', color: 'red' }} />
                </button>
            </div>
            </div>
        })}
      </div>
    </Modal>
  )
}

export default Notifications