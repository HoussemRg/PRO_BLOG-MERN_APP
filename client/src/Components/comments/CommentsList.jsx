
import Swal from 'sweetalert2';
import Moment from 'react-moment'
import {useDispatch, useSelector} from 'react-redux'
import UpdateCommentModel from './UpdateCommentModel';
import { useState } from 'react';
import { deleteComment } from '../../redux/apiCalls/commentApiCall';



const CommentsList = (props) => {
  const dispatch=useDispatch()
  const [commentToUpdate,setCommentToUpdate]=useState(null)
  const {user}=useSelector(state => state.auth);
    const deleteCommentHandler=(comment)=>{
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
              dispatch(deleteComment(comment?._id))
            };
          }
        );
      }

      const commentUpdateHandler=(comment)=>{
        setCommentToUpdate(comment);
        props.toggleUpdateCommentForm();
      }
      
  return (
    <div id='comments-list'>
      <div className=' text-2xl '>{props.comments?.length} comments</div>
      <hr className=' bg-gray-400 h-1 mt-1 mb-3' />
      {props.comments?.map((comment)=>(
         <div key={comment?._id} className='border border-gray-400 my-8 rounded-md'>
            <div className='flex justify-between items-center p-1'>
                <div className='text-xl '>{comment?.username}</div>
                <div className='text-sm text-orange-400'>
                  <Moment fromNow ago>
                  {comment?.createdAt}
                  </Moment>{" "}ago
                </div>
            </div>
            <div className='pl-2 text-sm py-2'>{comment?.text}</div>
            {user?.id===comment?.user && <div className='flex items-center gap-2 p-1 '>
                <div>
                    <i onClick={()=> commentUpdateHandler(comment)} className="fa-solid fa-pen-to-square text-green-500 cursor-pointer" ></i>
                </div>
                <div>
                    <i className="fa-solid fa-trash text-red-500 cursor-pointer" onClick={()=>deleteCommentHandler(comment)}></i>
                </div> 
            </div>}
           
         </div>
        
      ))}
       {props.updateComment && <UpdateCommentModel toggleUpdateCommentForm={props.toggleUpdateCommentForm} commentToUpdate={commentToUpdate} /> }
    </div>
    
  )
}

export default CommentsList
