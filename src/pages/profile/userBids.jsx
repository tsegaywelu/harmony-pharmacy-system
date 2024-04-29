import React, { useEffect } from 'react'
import {Table, message} from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../redux/loadersSlice';
import { GetAllBids } from '../../api/products';
import moment from 'moment';

function UserBids({selectedProduct}) {
            const [bidsData,setBidsData]=React.useState([]);
            const dispatch=useDispatch();
            const {user}=useSelector((state)=>state.users);
            const getData=async()=>{
             try{
                dispatch(setLoader(true));
                const response=await GetAllBids({
                    buyer:user._id,
                });
                dispatch(setLoader(false));
                if(response.success){
                    setBidsData(response.data);
                }
             }
             catch(error){
                dispatch(setLoader(false));
                message.error(error.message);
             }
            };
            const columns=[
                {
                    title:"Product",
                    dataIndex:"product",
                    render:(text,record)=>{
                        return record.product.name;
                    },
                },
                {
                    title:"Bid Placed On",
                    dataIndex:"createdAt",
                    render:(text,record)=>{
                       return moment.format("DD MM YYYY hh:mm a");
                    },
                },
                {
                    title:"Seller",
                    dataIndex:"name",
                    render:(text,record)=>{
                        return record.seller.name;
                    },
                },
                {
                    title:"Offered Price",
                    dataIndex:"offeredPrice",
                    render:(text,record)=>{
                        return record.product.price;
                    },
                },
                {
                    title:"Bid Amount",
                    dataIndex:"bidAmount",
                },{
                    title:"Bid Date",
                    dataIndex:"createAt",
                    render:(text,record)=>{
                        return moment(text).format("DD-MM-YYYY hh:mm a");
                    }
                },{
                    title:"Message",
                    dataIndex:"message",
                },
                {
                    title:"Contact Details",
                    dataIndex:"contactDetails",
                    render:(text,record)=>{
                        return(
                            <div>
                                <p>Phone:{record.mobile}</p>
                                <p>Email:{record.buyer.email}</p>
                            </div>
                        )
                    }
                }
            ]
            useEffect(()=>{
                getData();
            },[selectedProduct]);
            return (
    
    <div className='flex gap-3 flex-col'>
       <Table columns={columns} dataSource={bidsData}/>
     </div> 
  )
}

export default UserBids