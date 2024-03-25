import React, { useEffect } from 'react'
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {useDispatch,useSelector} from 'react-redux'
import { createPost } from '../../redux/apiCalls/postApiCall'
import {useNavigate} from 'react-router-dom'
import { getCategories } from '../../redux/apiCalls/categoryApiCall'



const CreatePost = () => {
  const dispatch=useDispatch();
  const {isPostCreated,loading}=useSelector(state => state.post)
  const{categories}=useSelector(state => state.category);
  const schema=yup.object().shape({
    title:yup.string().required("Title is required").min(2).max(200).trim(),
    description:yup.string().required("Description is required").min(10).trim(),
    category: yup.string().required("Category is required"),
    file:yup.mixed().test("fileRequired", "Image is required", (value) => {
      return value && value.length > 0;
    })
  });
  const {register,handleSubmit,formState:{errors}}=useForm({
    resolver:yupResolver(schema)
  });

  const onSubmit=(data)=>{ 
    //console.log({title:data.title,description:data.description,category:data.category,image:data.file[0]});
    const formData=new FormData();
    formData.append("title",data.title);
    formData.append("description",data.description);
    formData.append("category",data.category);
    formData.append("image",data.file[0]);
    dispatch(createPost(formData));
  }
  const navigate=useNavigate();
  useEffect(()=>{
    if(isPostCreated){
      navigate('/')//si on n'a pas remet isPostCreated to false on ne peux pas aller a posts
    }
  },[isPostCreated,navigate])
  useEffect(()=>{
    dispatch(getCategories());
  },[])
  
  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='  text-2xl mt-4 font-bold'>Create New Post</h1>
      <form  className='flex flex-col w-11/12 md:w-1/3' onSubmit={handleSubmit(onSubmit)}>
        <div className=' my-2'>
          <label htmlFor="title" className=' font-medium'>Post Title : </label>
          <input type="text" name="title" id="title" placeholder='Post Title' className='border-2 border-gray-600 w-full my-2 pl-1 py-2' {...register("title")}/>
          <p className=' text-sm text-red-700'>{errors.title?.message}</p>
        </div>
        <div className=' my-2 flex flex-col'>
          <label htmlFor="category" className=' font-medium'>Category : </label>
          <select name="category" id="category" className='border-2 border-gray-600 my-2 py-2  ' {...register("category")}>
            <option value="" selected disabled>Select a category</option>
            {categories.map(category => (
              <option value={category?.title} key={category?._id}>{category?.title}</option>
            ))}
            
            
          </select>
        </div>
        <div className=' my-2 flex flex-col'>
          <label htmlFor="description" className=' font-medium'>Post Description : </label>
          <textarea name="description" placeholder='Description' id='description' rows="5" className='border-2 border-gray-600 my-2 p-1 pl-2' {...register("description")}></textarea>
          <p className=' text-sm text-red-700'>{errors.description?.message}</p>
        </div>
        <div className=' my-2 flex flex-col'>
          <label htmlFor="file" className=' font-medium'>Select Image : </label>
          <input type="file" name="file"  id="file" className='border border-gray-600 my-2' {...register("file")}  />
          <p className=' text-sm text-red-700'>{errors.file?.message}</p>
        </div>
        <div className=' my-2 flex flex-col'>
          <input type="submit" value={loading ? 'Loading' : "Create"} className='font-medium border-3 my-2 py-2 bg-green-400 text-white cursor-pointer rounded' />
        </div>
    
      </form>
    </div>
  )
}

export default CreatePost
