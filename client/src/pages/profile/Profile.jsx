import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import Swal from 'sweetalert2';
import UpdateProfileModel from './UpdateProfileModel.jsx'
import { useDispatch,useSelector } from 'react-redux'
import { deleteUserProfiler, getUserProfiler, updateProfilePhoto } from '../../redux/apiCalls/profileApiCall.js'
import { useParams,useNavigate } from 'react-router-dom'
import PostItem from '../../Components/Posts/PostItem.jsx'
import {Oval} from 'react-loader-spinner'
import { logoutUser } from '../../redux/apiCalls/authApiCall.js';
//here we can not import posts from the store because it contains all posts and we nedd only posts those belong to this user profile so that's
//why the postList and postItem components differe from here to home page
//we also need to the user from store to allow only the update and the delete of account only for logged in user (the owner)
// we will check if user._id===profile._id   ==> the user logged in is the owner of the profile

const Profile = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate();
    const {id}=useParams()
    const [file,setFile]=useState(null);
    const [updateProfile,setUpdateProfile]=useState(false);
    const {profile,isProfileDeleted,loading}=useSelector(state=>state.profile);
    const {user}=useSelector(state=>state.auth);
    const toggleEditForm=()=>{ 
      setUpdateProfile(!updateProfile);
    }
    useEffect(()=>{
      dispatch(getUserProfiler(id))
        window.scrollTo(0,0);
      },[id]);
    const schema=yup.object().shape({
        file:yup.mixed().test("fileRequired", "Image is required", (value) => {
          return value && value.length > 0;
        })
    })
    const {register,handleSubmit,formState:{errors}}=useForm({
        resolver:yupResolver(schema)
      });
      const onSubmit=(data)=>{ 
        console.log({image:data.file[0]});
        const formData=new FormData();
        formData.append("image",data.file[0]);
        setFile(formData.get("image"));
        dispatch(updateProfilePhoto(formData));
      }

      
      const deleteProfileHandler=()=>{
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
              dispatch(deleteUserProfiler(user?.id));
              dispatch(logoutUser())
            };
          }
        );
      }
      
      useEffect(()=>{
        if(isProfileDeleted){
          navigate('/');
        }
        },[navigate,isProfileDeleted]);

      if(loading===true){
        return <div className='w-full flex justify-center items-center'>
          <Oval
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
          />
        </div>
      }
        
  return (
    <div>
        <div className='w-full flex flex-col items-center '>
        <div className=' w-full md:w-11/12 bg-blue-950 flex flex-col justify-center items-center gap-4 md:rounded-md md:my-8'>
            <div className='relative my-6'>
                <img src={file ? URL.createObjectURL(file) : profile?.profilePhoto.url} alt="User Avatar" className='rounded-full h-40 w-40 md:h-60 md:w-60'  />
                {user?.id===profile?._id && 
                <form className='absolute bottom-1 right-0 flex ' onSubmit={handleSubmit(onSubmit)}>
                <abbr title="choose profile photo" className='mx-1  text-white '>
                    <label htmlFor="file" className="fa-solid fa-camera cursor-pointer"></label>
                </abbr>
                <input type="file" name='file' id='file' className=' hidden ' {...register('file')} />
                {errors.file?.message ? alert(errors.file.message) : '' }
                <input type="submit" value="upload" className='cursor-pointer text-white text-lg ' />
            </form>
                }
            </div>
            <div className=' font-bold  text-2xl text-white '>{profile?.username}</div>
            <div className='  text-lg text-white p-2'>{profile?.bio}</div>
            <div className='flex items-center gap-6'>
                <div className='text-gray-500 font-semibold'>Date Joined : </div>
                <div className=' text-green-500'>{new Date(profile?.createdAt).toDateString()}</div>
            </div>
            {user?.id===profile?._id && <div onClick={toggleEditForm} className=' cursor-pointer p-3 text-xl bg-green-500 text-white rounded-md my-2 mb-6'><i class="fa-regular fa-id-badge text-white text-lg mx-2"></i>Update profile</div> }
            
        </div>
        </div>
        <div className='w-3/4 mx-auto'>
            <div className='my-3 font-bold text-2xl'>{profile?.username} Posts</div>
            <hr className='border-2 border-gray-600 mb-10 mt-5'  />
            {profile?.posts?.map(post=>(
              <PostItem 
                key={post._id}
                post={post}
                username={profile?.username}
                userId={profile?._id}
                />
            ))}
        </div>
        {user?.id===profile?._id && <div onClick={deleteProfileHandler} className='md:p-4 p-1 text-sm md:text-lg bg-red-600 text-white w-2/12 text-center rounded-md mx-auto cursor-pointer mb-8'>Delete your account</div>}
        {updateProfile && <UpdateProfileModel profile={profile} toggleEditForm={toggleEditForm}  />}
      </div>

    
  )
}

export default Profile
