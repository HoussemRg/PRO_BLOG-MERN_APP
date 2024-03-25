import React from 'react'
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import { Link } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { loginUser } from '../../redux/apiCalls/authApiCall'

const Login = () => {
  const schema=yup.object().shape({
    email:yup.string().email().required("Email is required").trim(),
    password: yup.string().min(5).max(50).required("Password is required"),
    
  });
  const {register,handleSubmit,formState:{errors}}=useForm({
    resolver:yupResolver(schema), 
  });
  const dispatch=useDispatch() 
  const onSubmit=(data)=>{ 
    console.log({email:data.email,password:data.password});
    
    dispatch(loginUser({email:data.email,password:data.password}))
  }
  
  return (
    <div className='flex flex-col justify-center items-center gap-4 w-11/12 mx-auto'>
      <h1 className='my-4 text-2xl font-bold text-gray-900'>Login To Your Account</h1>
      <form className='md:w-1/3 w-11/12' onSubmit={handleSubmit(onSubmit)}>
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
        <input type="submit" value="Login" className='w-full my-2 p-2 text-center text-white rounded-md cursor-pointer bg-green-500' />
      </form>
      <div>Did you forgot your password? <Link to="/forgot-password" className=' text-blue-600 text-xs md:text-base'>Forgot password</Link></div>
    </div>
  )
  
}

export default Login
