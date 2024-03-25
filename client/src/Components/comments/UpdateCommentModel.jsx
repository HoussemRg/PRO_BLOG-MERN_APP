import React from 'react'
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {useDispatch} from 'react-redux'
import { updateComment } from '../../redux/apiCalls/commentApiCall'

const UpdateCommentModel = (props) => {
    const dispatch=useDispatch();
    const schema=yup.object().shape({
        comment:yup.string().required("please write something").trim()
    });
    const {register,handleSubmit,formState:{errors}}=useForm({
        resolver:yupResolver(schema),
        defaultValues: {
            comment:props.commentToUpdate.text || ""
        }
    });
    const onSubmit=(data)=>{ 
        console.log(data.comment)
        console.log(props.commentToUpdate._id);
        dispatch(updateComment(props.commentToUpdate?._id,{text:data.comment}))
        props.toggleUpdateCommentForm();
      }
  return (
    <div className='w-full h-full bg-gray-800 opacity-90 flex  justify-center items-center fixed top-0 left-0'>
        <form onSubmit={handleSubmit(onSubmit)} className='w-2/3 h-4/6 p-2  my-2  bg-white relative rounded-md '>
            <abbr title="close" className='absolute top-1 right-1 text-red-600 cursor-pointer  md:text-2xl'>
                <i className="fa-regular fa-circle-xmark" onClick={props.toggleUpdateCommentForm}></i>
            </abbr>
            <div className=' my-2'>
                <label htmlFor="title" className=' font-medium'>Post Title : </label>
                <input type="text" name='comment' placeholder='Add comment' {...register('comment')} className='border-2 border-gray-600 w-full my-2 pl-1 py-2' />
                <p className=' text-sm text-red-700'>{errors.comment?.message}</p>
            </div> 
            <input type="submit" value="Update Comment" className='font-medium my-4 p-2 w-full bg-green-400 text-white cursor-pointer rounded' />
        </form>
    </div>
  )
}

export default UpdateCommentModel
