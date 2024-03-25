import request from "../../utils/request";
import { authAction } from "../slices/authSlice";
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const loginUser=(user)=>{
    return async (dispatch)=>{
        try{
            const res=await request.post("/api/auth/login",user)
            dispatch(authAction.login(res.data));
            localStorage.setItem("userInfo",JSON.stringify(res.data))
        }catch(err){
            toast.error(err.response.data,{autoClose:1200})
           
        }
    }
}
const logoutUser=()=>{
    return  (dispatch)=>{
        dispatch(authAction.logout());
        localStorage.removeItem("userInfo");
    }
}

const registerUser=(user)=>{
    let id;
    return async (dispatch)=>{
        try{
            id= toast.loading("Registring User , Please wait ...")
            const res=await request.post("/api/auth/register",user)
            toast.dismiss(id)
            dispatch(authAction.register(res.data));
            setTimeout(()=>dispatch(authAction.clearIsRegistered()),2000);
        }catch(err){
            toast.update(id,  { render: err?.response?.data, type: "error", isLoading: false, autoClose: 1200 });
        }
    }
}
//verify email
const verifyEmail=(userId,token)=>{
    return async (dispatch)=>{
        try{
            await request.get(`/api/auth/${userId}/verify/${token}`)
            dispatch(authAction.setIsEmailVerified());
        }catch(err){
            toast.error(err.response.data,{autoClose:1200})
           
        }
    }
}

export {loginUser,logoutUser,registerUser,verifyEmail}