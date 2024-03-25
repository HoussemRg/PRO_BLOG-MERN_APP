import React, { useEffect } from 'react'
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {useDispatch,useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import { getResetPassword, resetPassword } from '../../redux/apiCalls/passwordApiCall'
const ResetPassword = () => {
  
  const dispatch=useDispatch();
    const {isError}=useSelector(state=> state.password);
    const {userId,token}=useParams();
    const schema=yup.object().shape({
        password: yup.string().min(5).max(50).required("Password is required"),
    });
      const {register,handleSubmit,formState:{errors}}=useForm({
        resolver:yupResolver(schema), 
      });

      useEffect(()=>{
        dispatch(getResetPassword(userId,token));
      },[userId,token])

      const onSubmit=(data)=>{ 
        dispatch(resetPassword(data.password,{userId,token}))
      }
      return (
        <div className='flex flex-col justify-center items-center gap-4 w-11/12 mx-auto'>
          {isError ? <h1 className='my-4 text-2xl font-bold text-gray-900'>Not Found</h1> :
              <>
                <h1 className='my-4 text-2xl font-bold text-gray-900'>Reset Your Password</h1>
                <form className='md:w-1/3 w-11/12' onSubmit={handleSubmit(onSubmit)}>
                  <div className='flex flex-col justify-start items-start gap-2 '>
                    <label htmlFor="password">New Password</label>
                    <input type="password" name='password' id='password' placeholder='enter your new password' className='w-full pl-2 p-2 my-1 border rounded-md border-gray-600' {...register("password")} />
                    <p className=' text-sm text-red-700'>{errors.password?.message}</p>
                  </div>
                  <div  ><input type="submit" value="Submit" className='w-full my-2 p-2 text-center text-white rounded-md cursor-pointer bg-green-500'/></div>
                </form>
              </>
           }
          
        </div>
      )
}

export default ResetPassword
