import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import { verifyEmail } from '../../redux/apiCalls/authApiCall';
import {useParams} from 'react-router-dom'
const VerifyEmail = () => {
  const dispatch=useDispatch();
  const {isEmailVerified}=useSelector(state => state.auth);
  const {userId,token}=useParams();
   useEffect(()=>{
    dispatch(verifyEmail(userId,token));
   },[userId,token])
      return (
    <div className='w-screen h-screen mx-auto mt-40'>
      {isEmailVerified ? 
        <div className='flex flex-col gap-4 justify-center items-center my-10 text-lg text-gray-500'>
            <div className=' text-2xl text-green-500'><i className="fa-solid fa-circle-check"></i></div>
            <div>Your email is verified successfully</div>
            <div>Please log in </div>
            <Link to={'/login'} className='p-2 rounded-md cursor-pointer bg-cyan-500 text-white '>Go to login page</Link>
        </div> 
      :
        <div className='text-lg text-gray-500'>Not Found</div>
       }
    </div>
  )
}

export default VerifyEmail
