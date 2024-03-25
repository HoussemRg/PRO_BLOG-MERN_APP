import React, { useEffect } from 'react'
import AdminSideBar from './AdminSideBar'
import Swal from 'sweetalert2';
import { deleteComment, getAllComments } from '../../redux/apiCalls/commentApiCall'
import {useDispatch,useSelector} from 'react-redux'


const CommentsTable = () => {
  const dispatch=useDispatch();
  const {comments}=useSelector(state=> state.comment);
  useEffect(()=>{
    dispatch(getAllComments());
},[])
    const deleteCommentsHandler=(commentId)=>{
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
            dispatch(deleteComment(commentId))
          }
        });
    }
  return (
    <div className='md:grid  md:grid-cols-12 flex flex-col items-center w-full my-4'>
        <div className=' md:col-span-2 md:flex md:justify-start h-full'><AdminSideBar /></div>
        <div className=' md:col-span-10 flex flex-col justify-center items-center md:w-full '>
            <h1 className=' text-2xl text-gray-700 my-10 ml-7 underline font-sans font-bold'>Comments</h1>
            <table className='md:w-11/12 sm:w-full  border'>
              <thead className=' bg-gray-900 text-white'>
                <tr>
                  <th className='text-center'>Count</th>
                  <th className='text-center'>User</th>
                  <th className='text-center'>Comment</th>
                  <th className='text-center'>Action</th>
                </tr>
              </thead>
              <tbody>
                {comments.map((comment,index)=>(
                  <tr key={comment?._id} className='text-center border border-black'>
                    <td className=' font-semibold text-center border border-black'>{index+1}</td>
                    <td className=' border border-black'>
                      <div className='flex flex-col justify-center items-center'>
                        <img src={comment?.user?.profilePhoto?.url} alt="user" className='h-10 w-10 rounded-full my-2' />
                        <span>{comment?.user?.username}</span>
                      </div>
                    </td>
                    <td className=' border border-black'><div>{comment?.text}</div></td>
                    <td className=' flex  py-3	 justify-center items-center'>
                      
                      <div className='p-1 mt-3  cursor-pointer bg-red-500 hover:bg-red-700 text-white rounded-lg border-none text-xs md:text-base text-wrap text-center' onClick={()=>deleteCommentsHandler(comment?._id)}>Delete comment</div>
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      
      </div>
  )
}

export default CommentsTable
