import {createSlice} from '@reduxjs/toolkit';
export const usersSlice=createSlice({
    name:'users',
    initialState:{
        loading:false,
    },
    reducers:{
        setUser:(state,action)=>{
            state.User=action.payload;
        },
    }
});
export const {setUser}=usersSlice.actions;