import React, { useEffect } from 'react'
import AdminSideBar from './AdminSideBar'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import { deleteUserProfiler, getAllUsersProfile } from '../../redux/apiCalls/profileApiCall'
import {useDispatch,useSelector} from 'react-redux'


const UsersTable = () => {
  const dispatch=useDispatch();
  const {profiles}=useSelector(state=> state.profile);
  useEffect(()=>{
    dispatch(getAllUsersProfile())
  },[profiles])
  const deleteProfileHandler=(userId)=>{
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
        dispatch(deleteUserProfiler(userId));
      }
    });
  }
  return (
    <div className='md:grid  md:grid-cols-12 flex flex-col items-center w-full my-4'>
        <div className=' md:col-span-2 md:flex md:justify-start h-full'><AdminSideBar /></div>
        <div className=' md:col-span-10 flex flex-col justify-center items-center md:w-full '>
            <h1 className=' text-2xl text-gray-700 my-10 ml-7 underline font-sans font-bold'>Users</h1>
            <table className='md:w-11/12 sm:w-full  border'>
              <thead className=' bg-gray-900 text-white'>
                <tr>
                  <th className='text-center'>Count</th>
                  <th className='text-center'>User</th>
                  <th className='text-center'>Email</th>
                  <th className='text-center'>Action</th>
                </tr>
              </thead>
              <tbody>
                {profiles.map((user,index)=>(
                  <tr key={user?._id} className='text-center border border-black'>
                    <td className=' font-semibold text-center border border-black'>{index+1}</td>
                    <td className=' border border-black'>
                      <div className='flex flex-col justify-center items-center'>
                        <img src={user?.profilePhoto?.url} alt="user" className='h-10 w-10 rounded-full my-2' />
                        <span>{user?.username}</span>
                      </div>
                    </td>
                    <td className=' border border-black'><div>{user?.email}</div></td>
                    <td className=' flex gap-5 	 justify-center items-center'>
                      <div className=' mt-5 p-1 text-xs md:text-base text-wrap text-center bg-green-500 cursor-pointer hover:bg-green-700 text-white rounded-lg border-none'>
                        <Link to={`/profile/${user?._id}`}>View Profile</Link>
                      </div>
                      <div className='p-1 text-xs md:text-base text-wrap text-center mt-5 cursor-pointer bg-red-500 hover:bg-red-700 text-white rounded-lg border-none' onClick={()=>deleteProfileHandler(user?._id)}>Delete user</div>
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      
      </div>
  )
}

export default UsersTable
