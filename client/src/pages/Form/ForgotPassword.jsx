import React from 'react'
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {useDispatch} from 'react-redux'
import { forgotPassword } from '../../redux/apiCalls/passwordApiCall'
const ForgotPassword = () => {
  const dispatch=useDispatch();
    const schema=yup.object().shape({
        email:yup.string().email().required("Email is required").trim(),
      });
      const {register,handleSubmit,formState:{errors}}=useForm({
        resolver:yupResolver(schema), 
      });
      const onSubmit=(data)=>{ 
        
       dispatch(forgotPassword(data.email));
        
      }
      return (
        <div className='flex flex-col justify-center items-center gap-4 w-11/12 mx-auto'>
          <h1 className='my-4 text-2xl font-bold text-gray-900'>Forgot Password</h1>
          <form className='md:w-1/3 w-11/12' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col justify-start items-start gap-2 '>
              <label htmlFor="email">Email</label>
              <input type="email" name='email' id='email' placeholder='enter your email' className='w-full pl-2 p-2 my-1 border rounded-md border-gray-600' {...register("email")} />
              <p className=' text-sm text-red-700'>{errors.email?.message}</p>
            </div>
            <div  ><input type="submit" value="Submit" className='w-full my-2 p-2 text-center text-white rounded-md cursor-pointer bg-green-500' /></div>
          </form>
        </div>
      )
}

export default ForgotPassword
