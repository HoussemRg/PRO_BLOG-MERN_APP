import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {useDispatch} from 'react-redux'
import { createComment } from '../../redux/apiCalls/commentApiCall'

const AddComment = ({post}) => {
    const dispatch=useDispatch();

    const schema=yup.object().shape({
        comment:yup.string().required("please write something").trim()
    });
    const {register,handleSubmit,formState:{errors}}=useForm({
        resolver:yupResolver(schema)
    });
    const onSubmit=(data)=>{ 
        console.log(data.comment)
        dispatch(createComment({text:data.comment,postId:post?._id}));
      }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-11/12 my-9 flex items-center gap-7'>
        <input type="text" name='comment' placeholder='Add comment' {...register('comment')} className='border w-full h-10 my-4 rounded-md border-black pr-2 bg-white ' />
        <p className=' text-sm text-red-700'>{errors.comment?.message}</p>
        <input type="submit" value="Add"  className=' p-1 px-3   bg-green-400 text-white cursor-pointer rounded-md text-lg'/>
    </form>
  )
}

export default AddComment
