import request from "../../utils/request";
import { passwordAction } from "../slices/passwordSlice";
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const forgotPassword=(email)=>{
    return async ()=>{
        try{
            const res=await request.post("/api/password/reset-password-link",{email})
            toast.success(res.data,{autoClose:1200})
        }catch(err){
            toast.error(err.response.data,{autoClose:1200})
           
        }
    }
}
const getResetPassword=(userId,token)=>{
    return async (dispatch)=>{
        try{
            await request.get(`/api/password/reset-password-link/${userId}/${token}`);
            
        }catch(err){
            dispatch(passwordAction.setError());
           
        }
    }
}
const resetPassword=(NewPassword,user)=>{
    return async ()=>{
        try{
            const res=await request.post(`/api/password/reset-password-link/${user.userId}/${user.token}`,{
                password:NewPassword
            });
            toast.success(res.data.message,{autoClose:1200})
        }catch(err){
            toast.error(err.response.data,{autoClose:1200})
            
           
        }
    }
}

export {
    forgotPassword,
    resetPassword,
    getResetPassword
}