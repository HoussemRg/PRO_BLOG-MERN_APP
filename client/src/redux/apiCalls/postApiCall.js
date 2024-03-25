import request from "../../utils/request";
import { postAction } from "../slices/postSlice";
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

//get posts based on bage number
const getPosts=(pageNumber)=>{
    return async (dispatch)=>{
        try{
            const res=await request.get(`/api/posts?pageNumber=${pageNumber}`,)
            
            dispatch(postAction.setPosts(res.data));

        }catch(err){
            toast.error(err.response.data,{autoClose:1200})
        }
    }
}

const getPostsCount=()=>{
    return async (dispatch)=>{
        try{
            const res=await request.get(`/api/posts/count`,)
            
            dispatch(postAction.setPostsCount(res.data.nbPosts));
            
        }catch(err){
            toast.error(err.response.data,{autoClose:1200})
        }
    }
}

const getPostsPerCategory=(category)=>{
    return async (dispatch)=>{
        try{
            const res=await request.get(`/api/posts?category=${category}`,)
            
            dispatch(postAction.setPostsPerCategory(res.data));
            //localStorage.setItem("userInfo",JSON.stringify(res.data))
        }catch(err){
            toast.error(err.response.data,{autoClose:1200})
        }
    }
}

const createPost=(newPost)=>{
    return async (dispatch,getState)=>{
        try{
            dispatch(postAction.setLoading());//this may take 2s or more to create a post
            await request.post('/api/posts',newPost,{
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                    'Content-Type': "multipart/form-data" 
                }
            })
            dispatch(postAction.setIsPostCreated());
            setTimeout(()=> dispatch(postAction.clearIsPostCreated()),2000);//we must reset the createdPost state to false to allow creation of other posts
        }catch(err){
            toast.error(err.response.data,{autoClose:1200});
            dispatch(postAction.clearLoading())//we must stop loading
        }
    }
}

//get Single post
const getSinglePost=(postId)=>{
    return async (dispatch)=>{
        try{
            const res=await request.get(`/api/posts/${postId}`,)
            
            dispatch(postAction.setPost(res.data));
        }catch(err){
            toast.error(err.response.data,{autoClose:1200})
        }
    }
}

//toggle like
const toggleLike=(postId)=>{
    return async (dispatch,getState)=>{
        try{
            const res=await request.put(`/api/posts/like/${postId}`,{},{
                headers:{
                    Authorization:"Bearer " + getState().auth.user.token,
                }
            })
            
            dispatch(postAction.setLikes(res.data));
        }catch(err){
            toast.error(err.response.data,{autoClose:1200})
        }
    }
}
//update post image
const updatePostImage=(postId,newImage)=>{
    return async (dispatch,getState)=>{
        try{
            const res=await request.put(`/api/posts/upload-post-image/${postId}`,newImage,{
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token,
                    'Content-Type': "multipart/form-data"
                }
            })
            toast.success(res.data,{autoClose:1200});
        }catch(err){
            toast.error(err.response.data,{autoClose:1200})
        }
    }
}

//update post 
const updatePost=(postId,newPost)=>{
    return async (dispatch,getState)=>{
        try{
            const res=await request.put(`/api/posts/${postId}`,newPost,{
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })
            dispatch(postAction.setPost(res.data));
            toast.success("Post updated Successfully",{autoClose:1200})
        }catch(err){
            toast.error(err.response.data,{autoClose:1200})
        }
    }
}

//delete post 
const deletePost=(postId)=>{
    return async (dispatch,getState)=>{
        try{
            const res=await request.delete(`/api/posts/${postId}`,{
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })
            dispatch(postAction.deletePost(res.postId));
            toast.success("Post dleted successfully",{autoClose:1200});
        }catch(err){
            toast.error(err.response.data,{autoClose:1200})
        }
    }
}


//get all posts for admin dashboard
const getAllPosts=()=>{
    return async (dispatch)=>{
        try{
            const res=await request.get(`/api/posts`,)
            dispatch(postAction.setPosts(res.data));
        }catch(err){
            toast.error(err.response.data,{autoClose:1200})
        }
    }
}

export {getPosts,getPostsCount,getPostsPerCategory,createPost,getSinglePost,toggleLike,updatePostImage,updatePost,deletePost,getAllPosts}