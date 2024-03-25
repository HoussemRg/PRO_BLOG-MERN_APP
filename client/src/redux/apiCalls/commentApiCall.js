// we will create the comment action in the postSlice because a post has an array of comments because if we add a comment so we have a changement 
//of state of the post and then a rerendring ,so page wich contain the comment must be rerendred that's why we must change the state of the post not
//the comment
//the rerendring is declenched by the useSelector of react redux
import request from "../../utils/request";
import { commentAction } from "../slices/commentSlice";
import { postAction } from "../slices/postSlice";
import {toast} from 'react-toastify'

const createComment=(newComment)=>{
    return async (dispatch,getState)=>{
        try{
            const res=await request.post("/api/comments",newComment,{
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })
            dispatch(postAction.addCommentToPost(res.data));
            toast.success("Comment created successfully",{autoClose:1200});
        }catch(err){
            toast.error(err.response.data,{autoClose:1200})
           
        }
    }
}

//update Comment
const updateComment=(commentId,newComment)=>{
    return async (dispatch,getState)=>{
        try{
            const res=await request.put(`/api/comments/${commentId}`,newComment,{
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })
            dispatch(postAction.updateCommentPost(res.data));
            toast.success("Comment updated successfully",{autoClose:1200});
        }catch(err){
            toast.error(err.response.data,{autoClose:1200})
           
        }
    }
}

//delete Comment
const deleteComment=(commentId)=>{
    return async (dispatch,getState)=>{
        try{
            await request.delete(`/api/comments/${commentId}`,{
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })
            dispatch(postAction.deleteCommentFromPost(commentId));
            dispatch(commentAction.deleteComment(commentId))
            toast.success("Comment deleted successfully",{autoClose:1200});
        }catch(err){
            toast.error(err.response.data,{autoClose:1200})
           
        }
    }
}

//get comments for admin dashboard
const getAllComments=()=>{
    return async (dispatch,getState)=>{
        try{
            const res=await request.get("/api/comments",{
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })
            dispatch(commentAction.setComments(res.data));
        }catch(err){
            toast.error(err.response.data,{autoClose:1200})
           
        }
    }
}
export {createComment,updateComment,deleteComment,getAllComments}