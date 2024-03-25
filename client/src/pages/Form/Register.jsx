import React, { useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import { useDispatch,useSelector } from 'react-redux'
import { registerUser } from '../../redux/apiCalls/authApiCall'
import Swal from 'sweetalert2'


const Register = () => {
  localStorage.clear()
  const dispatch=useDispatch()
  const {registerMessage}=useSelector(state=> state.auth)
  const schema=yup.object().shape({
    username:yup.string().required("Username is required").min(2).max(200).trim(),
    email:yup.string().email().required("Email is required").trim(),
    password: yup.string().min(5).max(50).required("Password is required"),
    
  });
  const {register,handleSubmit,formState:{errors}}=useForm({
    resolver:yupResolver(schema), 
  });
  const navigate=useNavigate()
  const onSubmit=(data)=>{ 
    
    dispatch(registerUser({username:data.username,email:data.email,password:data.password}));
  }
  
  useEffect(()=>{
    if(registerMessage){
      Swal.fire({
        title:registerMessage,
        icon:"success"
      }).then(isOk=>{
        if(isOk){
          navigate("/login");
        }
      })
    }
  },[navigate,registerMessage]);
  return (
    <div className='flex flex-col justify-center items-center gap-4 w-11/12 mx-auto'>
      <h1 className='my-4 text-2xl font-bold text-gray-900'>Create New Account</h1>
      <form className='md:w-1/3 w-11/12' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col justify-start items-start gap-2 '>
          <label htmlFor="name">Username</label>
          <input type="text" name='username' id='name' placeholder='enter your username' className='w-full pl-2 p-2 my-1 border rounded-md border-gray-600' {...register("username")} />
          <p className=' text-sm text-red-700'>{errors.username?.message}</p>
        </div>
        <div className='flex flex-col justify-start items-start gap-2 '>
          <label htmlFor="email">Email</label>
          <input type="email" name='email' id='email' placeholder='enter your email' className='w-full pl-2 p-2 my-1 border rounded-md border-gray-600' {...register("email")} />
          <p className=' text-sm text-red-700'>{errors.email?.message}</p>
        </div>
        <div className='flex flex-col justify-start items-start gap-2 '>
          <label htmlFor="password">Password</label>
          <input type="password" name='password' id='password' placeholder='enter your password' className='w-full pl-2 p-2 my-1 border rounded-md border-gray-600' {...register("password")} />
          <p className=' text-sm text-red-700'>{errors.password?.message}</p>
        </div>
        <div  ><input type="submit" value="Register"  className='w-full my-2 p-2 text-center text-white rounded-md cursor-pointer bg-green-500'/></div>
      </form>
      <div>Already have an account? <Link to="/login" className=' text-blue-600'>Login</Link></div>
    </div>
  )
}

export default Register
