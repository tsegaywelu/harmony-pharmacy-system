import { Modal, message,Input,Form } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { PlaceNewBid } from '../../api/products';
import {setLoader} from '../../redux/loadersSlice';
import { AddNotficaations } from '../../api/notfications';
function BidModel({showBidModal,
  setShowBidModal,
  product,
  reloadData}) {
    const {user}=useSelector((state)=>state.users);
    const formRef=React.useRef(null);
    const rules=[{required:true,message:"This field is required"}]
    const dispatch=useDispatch();
    const onFinish=async(values)=>{
      try{
          dispatch(setLoader(true));
          const response=await PlaceNewBid({
            ...values,
            product:product._id,
            seller:product.seller._id,
            buyer:user._id,
          })
          dispatch(setLoader(false));
          if(response.success){
            message.success("bid added successfully");
            await AddNotficaations({
              title:"A new Bid has been placed",
              message:"A new bid has been placed on your product ${product.name} by ${user.name} for $(values.bidAmount)",
              user:product.seller._id,
              onclick:"/profile",
              read:false,
            })
            reloadData();
            setShowBidModal(false);
          }
          else{
            throw new Error(response.message);
          }
      }catch(error){
            message.error(error.message);
            dispatch(setLoader(false));
      }
    }
    return (
    <Modal onCancel={()=>setShowBidModal(false)} open={showBidModal} centered
    width={600} onOk={()=>formRef.current.submit()}>
        <div className='flex flex-col gap-5 mb-5'>
            <h1 className='text-2xl font-semibold text-orange-900 text-center'>
              New Bid</h1>
              <Form 
                 layout="vertical"
                 ref={formRef}
                 onFinish={onFinish}>
                  <Form.Item label="Bid Amount"
                   name="bidAmount"
                   rules={rules}>
                    <Input/>
                   </Form.Item>
                   <Form.Item label="Message"
                   name="message"
                   rules={rules}>
                    <Input.textArea/>
                   </Form.Item>
                   <Form.Item label="Mobile"
                   name="mobile"
                   rules={rules}>
                    <Input/>
                   </Form.Item>
                 </Form>
        </div>
    </Modal>
  )
}

export default BidModel