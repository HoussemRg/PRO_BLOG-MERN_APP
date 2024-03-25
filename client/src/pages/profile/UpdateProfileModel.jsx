import React from 'react'
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'
import { updateUserProfiler } from '../../redux/apiCalls/profileApiCall'

const UpdateProfileModel = (props) => {
    const dispatch=useDispatch();
    const schema=yup.object().shape({
        username:yup.string().required("Name is required").min(2).max(200).trim(),
        bio:yup.string().required("bio is required").min(5).trim(),
        //password: yup.string().trim(),
      });
      const {register,handleSubmit,formState:{errors}}=useForm({
        resolver:yupResolver(schema),
        defaultValues: {
            username: props.profile.username || "",
            bio: props.profile.bio || "",
            password:"",
          }
      });
    
      const onSubmit=(data)=>{ 
        console.log({username:data.username,bio:data.bio,password:data.password});
        const newProfile={username:data.username,bio:data.bio,password: data.password !== "" ? data.password : null}
        dispatch(updateUserProfiler(props.profile?._id,newProfile))
        props.toggleEditForm();
        
      }
  return (
    <div className='w-full h-full bg-gray-950 opacity-90 flex  justify-center items-center fixed top-0'>
        <form className='w-2/3 h-4/6 p-2  my-2  bg-white relative rounded-md ' onSubmit={handleSubmit(onSubmit)}>
            <abbr title="close" className='absolute top-1 right-1 text-red-600 cursor-pointer  md:text-2xl'>
                <i className="fa-regular fa-circle-xmark" onClick={props.toggleEditForm}></i>
            </abbr>
                <div className=' my-2'>
                    <label htmlFor="username" className=' font-medium'>Username : </label>
                    <input type="text" name="username" id="name" placeholder='Username' className='border-2 border-gray-600 w-full my-2 pl-1 py-2' {...register("username")}/>
                    <p className=' text-sm text-red-700'>{errors.username?.message}</p>
                </div>
                <div className=' my-2 flex flex-col'>
                    <label htmlFor="bio" className=' font-medium'>Bio : </label>
                    <input type="text" name="bio" id="bio" placeholder='Your bio'  className='border-2 border-gray-600 my-2 py-2  ' {...register("bio")} />
                    <p className=' text-sm text-red-700'>{errors.bio?.message}</p>
                </div>
                <div className=' my-2 flex flex-col'>
                    <label htmlFor="password" className=' font-medium'>Password : </label>
                    <input type='password' name="password" placeholder='Password'  id='password' className='border-2 border-gray-600 my-2 p-1 pl-2' {...register("password")} />
                    <p className=' text-sm text-red-700'>{errors.password?.message}</p>
                </div>
                <div className='  w-full flex flex-col '>
                    <input type="submit" value="Update Profile" className='font-medium my-4 p-2 w-full bg-green-400 text-white cursor-pointer rounded' />
                </div>
        </form>
      
    </div>
  )
  
}

export default UpdateProfileModel
