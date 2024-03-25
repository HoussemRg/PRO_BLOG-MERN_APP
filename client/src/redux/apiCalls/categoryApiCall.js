import request from "../../utils/request";
import { categoryAction } from "../slices/categorySlice";
import {toast} from 'react-toastify'

const getCategories=()=>{
    return async (dispatch)=>{
        try{
            const res=await request.get("/api/categories")
            dispatch(categoryAction.setCategories(res.data));
        }catch(err){
            toast.error(err.response.data,{autoClose:1200})
           
        }
    }
}
//create category
const createCategories=(category)=>{
    return async (dispatch,getState)=>{
        try{
            const res=await request.post("/api/categories",category,{
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token
                }
            })
            dispatch(categoryAction.addCategory(res.data));
            toast.success("category created successfully",{autoClose:1200});
        }catch(err){
            toast.error(err.response.data,{autoClose:1200})
           
        }
    }
}

//delete category
const deleteCategories=(categoryId)=>{
    return async (dispatch,getState)=>{
        try{
            const res=await request.delete(`/api/categories/${categoryId}`,{
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token
                }
            })
            dispatch(categoryAction.deleteCategory(res.data._id));
            toast.success(` ${res.data.title} category deleted successfully`,{autoClose:1200});
        }catch(err){
            toast.error(err.response.data,{autoClose:1200})
           
        }
    }
}
export {getCategories,createCategories,deleteCategories}