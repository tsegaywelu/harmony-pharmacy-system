import React from 'react';
import { Tabs } from 'antd';
import { useSelector } from 'react-redux'; // Importing useSelector from react-redux
import moment from 'moment'; // Importing moment for date formatting
import UserBids from './userBids';
import Products from '../products/products';
function Profile() {
  const user = useSelector((state) => state.user); // Accessing user state from Redux store

  return (
    <div>
      <Tabs defaultActiveKey='1'>
        <Tabs.TabPane tab='Products' key='1'>
          <Products />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Bids' key='2'>
          <UserBids />
        </Tabs.TabPane>
        <Tabs.TabPane tab='General' key='3'>
          <div className='flex flex-col w-1/3'>
            <span className='text-xl flex justify-between'>
              Name:<b className='text-xl'>{user.name}</b>
            </span>
            <span className=' text-xl flex justify-between'>
              Email:<b className='text-xl'>{user.email}</b>
            </span>
            <span className=' text-xl flex justify-between'>
              Created At:<b className='text-xl'>{moment(user.createdAt).format("MM DD YYYY hh:mm A")}</b>
            </span>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Profile;
