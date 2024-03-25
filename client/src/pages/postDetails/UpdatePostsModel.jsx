import React, { useEffect } from 'react'
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {useDispatch,useSelector} from 'react-redux'
import { updatePost } from '../../redux/apiCalls/postApiCall'
import { getCategories } from '../../redux/apiCalls/categoryApiCall'

const UpdatePostsModel = (props) => {
  const dispatch=useDispatch();
  const {post}=useSelector(state=> state.post);
  const{categories}=useSelector(state => state.category);
    const schema=yup.object().shape({
        title:yup.string().required("Title is required").min(2).max(200).trim(),
        description:yup.string().required("Description is required").min(10).trim(),
        category: yup.string().required("Category is required"),
        
      });
      const {register,handleSubmit,formState:{errors}}=useForm({
        resolver:yupResolver(schema),
        defaultValues: {
            title: props.post?.title || "",
            category: props.post?.category || "",
            description: props.post?.description || "",
          }
      });
    
      const onSubmit=(data)=>{ 
        dispatch(updatePost(props.post?._id,{title:data.title,description:data.description,category:data.category}))
        props.toggleEditForm();
        
      }
      useEffect(()=>{
        dispatch(getCategories());
      },[])
  return (
    <div className='w-full h-full bg-gray-800 opacity-90 flex  justify-center items-center fixed top-0'>
        <form className='w-2/3 h-4/6 p-2  my-2  bg-white relative rounded-md ' onSubmit={handleSubmit(onSubmit)}>
            <abbr title="close" className='absolute top-1 right-1 text-red-600 cursor-pointer  md:text-2xl'>
                <i className="fa-regular fa-circle-xmark" onClick={props.toggleEditForm}></i>
            </abbr>
                <div className=' my-2'>
                <label htmlFor="title" className=' font-medium'>Post Title : </label>
                <input type="text" name="title" id="title" placeholder='Post Title' className='border-2 border-gray-600 w-full my-2 pl-1 py-2' {...register("title",{ defaultValue: props.post.title })}/>
                <p className=' text-sm text-red-700'>{errors.title?.message}</p>
                </div>
                <div className=' my-2 flex flex-col'>
                <label htmlFor="category" className=' font-medium'>Category : </label>
                <select name="category" id="category"  className='border-2 border-gray-600 my-2 py-2  ' {...register("category", { defaultValue: props.post.category })}>
                <option value="" selected disabled>Select a category</option>
                  {categories.map(category => (
                  <option value={category?.title} key={category?._id}>{category?.title}</option>
            ))}
                </select>
                </div>
                <div className=' my-2 flex flex-col'>
                <label htmlFor="description" className=' font-medium'>Post Description : </label>
                <textarea name="description" placeholder='Description'  id='description' rows="5" className='border-2 border-gray-600 my-2 p-1 pl-2' {...register("description", { defaultValue: props.post.description })}></textarea>
                <p className=' text-sm text-red-700'>{errors.description?.message}</p>
                </div>
                <div className='  w-full flex flex-col '>
                <input type="submit" value="Update Post" className='font-medium my-4 p-2 w-full bg-green-400 text-white cursor-pointer rounded' />
                </div>
        </form>
      
    </div>
  )
}

export default UpdatePostsModel
