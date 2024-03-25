import React, { useEffect, useState } from 'react'
import {Link, useParams,useNavigate} from 'react-router-dom'
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import AddComment from '../../Components/comments/addComment.jsx';
import CommentsList from '../../Components/comments/CommentsList.jsx';
import Swal from 'sweetalert2';
import UpdatePostsModel from './UpdatePostsModel.jsx'

import {useDispatch,useSelector} from 'react-redux'
import { deletePost, getSinglePost, toggleLike, updatePostImage } from '../../redux/apiCalls/postApiCall.js'



const PostDetails = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate();
  const {post}=useSelector(state=> state.post);
  const {user}=useSelector(state => state.auth);
    const [file,setFile]=useState(null);
    const [updatePost,setUpdatePost]=useState(false);
    const {id}=useParams();
    useEffect(()=>{
      dispatch(getSinglePost(id));
      window.scrollTo(0,0);
    },[id]);
    const schema=yup.object().shape({
      file:yup.mixed().test("fileRequired", "Image is required", (value) => {
        return value && value.length > 0;
      })
    });
    const {register,handleSubmit,formState:{errors}}=useForm({
      resolver:yupResolver(schema)
    });
    const onSubmit=(data)=>{ 
      const formData=new FormData();
      formData.append("image",data.file[0]);
      dispatch(updatePostImage(post?._id,formData))
      setFile(formData.get("image"));
    }
    const deletePostHandler=()=>{
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deletePost(post?._id));
          navigate(`/`)
          
        }
      });
    }
    const toggleEditForm=()=>{
      
      setUpdatePost(!updatePost);
    }
    const [updateComment,setUpdateComment]=useState(false);
    const toggleUpdateCommentForm=()=>{
      setUpdateComment(!updateComment);
    }
  return (
    <div className=' w-11/12 mx-auto flex justify-center items-center md:my-10'>
      <div className=' w-full md:w-6/12'>
        <div className='flex justify-center'>
          <img src={file ? URL.createObjectURL(file) : post?.image.url} alt="" className=' rounded-md my-4 h-72 w-72' />
        </div>
        {user?.id===post?.user?._id && 
          <form className='flex items-center justify-center' onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="file" className=' cursor-pointer text-blue-700 text-lg  border p-2 border-blue-400 rounded-md hover:bg-blue-700 hover:text-white mr-5 '>
            <i class="fa-solid fa-image mr-5"></i>
            Select new image
          <div>
            <input type="file" name="file" id="file" className=' hidden' {...register('file')} />
            <p className=' text-sm text-red-700'>{errors.file?.message}</p>
            </div></label>
          <input type="submit" value="Upload" className=' cursor-pointer border hover:bg-gray-600 hover:text-white rounded-md p-2 text-lg  border-gray-500 text-gray-500 ' />
        </form>
        }
        <div className='flex flex-col justify-center items-center my-10'>
          <h1 className='my-6 text-2xl font-bold font-sans text-gray-900' >{post?.title}</h1>
          <div className='flex justify-center items-center gap-5 mb-5 '>
            <img src={post?.user.profilePhoto.url} alt=""  className=' rounded-full w-14 h-14'/>
            <div>
              <Link to={`/profile/${post?.user._id}`} className='text-lg text-blue-700'>{post?.user.username}</Link>
              <div className=' text-sm'>{new Date(post?.createdAt).toDateString()}</div>
            </div>
          </div>
          <div className='my-5 w-11/12'>{post?.description}
         
          </div>
          <div className='flex justify-between items-center w-full text-xl text-blue-500 p-2'>
            <div className='flex gap-3 items-center '>
              {user && <i className={post?.likes.includes(user?.id) ? `fa-solid fa-thumbs-down cursor-pointer`: `fa-solid fa-thumbs-up cursor-pointer` } onClick={()=> dispatch(toggleLike(post?._id))}></i>}
              <div>{post?.likes.length}{" "}Likes</div>
            </div>
            {user?.id===post?.user?._id ?
              <div className='flex items-center gap-10 text-2xl'>
            
              <i onClick={toggleEditForm} className="fa-solid fa-pen-to-square text-green-500 cursor-pointer p-2"></i>
              <i onClick={deletePostHandler} className="fa-regular fa-trash-can text-red-500 cursor-pointer p-2"></i>
            </div> : <div></div>
            }
            
          </div>
        </div>
        <div className='w-full'>
          {user ? <AddComment post={post} /> : <p className='mb-10 text-red-400 italic'>You should login to add comments</p>}
          <CommentsList updateComment={updateComment} toggleUpdateCommentForm={toggleUpdateCommentForm} comments={post?.comments}  />
        </div>
      </div>
       
      {updatePost && <UpdatePostsModel toggleEditForm={toggleEditForm} post={post}  />}
      
    </div>
  )
}

export default PostDetails
