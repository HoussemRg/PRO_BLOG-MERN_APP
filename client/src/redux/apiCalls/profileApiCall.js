import request from "../../utils/request";
import { authAction } from "../slices/authSlice";
import { profileAction } from "../slices/profileSlice";
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const getUserProfiler=(userId)=>{
    return async (dispatch)=>{
        try{
            const res=await request.get(`/api/users/profile/${userId}`,)
            
            dispatch(profileAction.setProfile(res.data));
            localStorage.setItem("userInfo",JSON.stringify(res.data))
        }catch(err){
            toast.error(err.response.data,{autoClose:1200})
        }
    }
}
const updateProfilePhoto=(newPhoto)=>{
    return async (dispatch,getState)=>{
        try{
            
            const res=await request.post("/api/users/profile/upload-profile-photo",newPhoto,{
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token,
                    'Content-Type': "multipart/form-data"
                }
            })
            
            dispatch(profileAction.setProfilePhoto(res.data));
            dispatch(authAction.setUserPhoto(res.data.profilePhoto));
            //modify the user in local storage with new photo
            const user=JSON.parse(localStorage.getItem("userInfo"));
            user.profilePhoto=res.data?.profilePhoto;
            localStorage.setItem("userInfo",JSON.stringify(user))

            toast.success(res.data.message,{autoClose:1200})
        }catch(err){
            toast.error(err.response.data,{autoClose:1200})
        }
    }
}
const updateUserProfiler=(userId,profile)=>{
    return async (dispatch,getState)=>{
        try{
            const res=await request.put(`/api/users/profile/${userId}`,profile,{
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })
            
            dispatch(profileAction.updateProfile(res.data));
            dispatch(authAction.setUsername(res.data.username))
            //modify the user in local storage with new username
            const user=JSON.parse(localStorage.getItem("userInfo"));
            user.username=res.data?.username;
            localStorage.setItem("userInfo",JSON.stringify(user))
        }catch(err){
            toast.error(err.response.data,{autoClose:1200})
        }
    }
}
//delete user profile
const deleteUserProfiler=(userId)=>{
    return async (dispatch,getState)=>{
        try{
            dispatch(profileAction.setLoading());
            const res=await request.delete(`/api/users/profile/${userId}`,{
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })
            dispatch(profileAction.setIsProfileDeleted());
            toast.success(res.data,{autoClose:1200});
            setTimeout(()=>dispatch(profileAction.clearIsProfileDeleted()),2000)

        }catch(err){
            toast.error(err.response.data,{autoClose:1200});
            dispatch(profileAction.clearLoading())
        }
    }
}

//get number of users for admin dashboard
const getUsersCount=()=>{
    return async (dispatch,getState)=>{
        try{
            const res=await request.get("/api/users/count",{
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })
            dispatch(profileAction.setUsersCount(res.data.count));
        }catch(err){
            toast.error(err.response.data,{autoClose:1200})
        }
    }
}

//get all users profile for admin dashboard
const getAllUsersProfile=()=>{
    return async (dispatch,getState)=>{
        try{
            const res=await request.get(`/api/users/profile`,{
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })
            dispatch(profileAction.setProfiles(res.data));
        }catch(err){
            toast.error(err.response.data,{autoClose:1200})
        }
    }
}

export {getUserProfiler,updateProfilePhoto,updateUserProfiler,deleteUserProfiler,getUsersCount,getAllUsersProfile}