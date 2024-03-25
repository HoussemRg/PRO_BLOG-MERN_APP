import React from 'react'
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {useDispatch} from 'react-redux'
import { createCategories } from '../../redux/apiCalls/categoryApiCall'

const AddCategoryForm = () => {
  const dispatch=useDispatch();
    const schema=yup.object().shape({
        category:yup.string().required("Category is required").min(2).max(200).trim(),
      });
      const {register,handleSubmit,formState:{errors},reset }=useForm({
        resolver:yupResolver(schema),
       
      });
    
      const onSubmit=(data)=>{ 
        dispatch(createCategories({title:data.category}));
        reset();
      }
  return (
    <div className='border-2 border-gray-500 p-3 rounded-md shadow-2xl w-full md:w-6/12 my-10'>
      <h1 className='text-xl mb-4 font-bold'>Add New Category</h1>
      <form className='flex flex-col items-start gap-3 justify-start' onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="category" className=' text-sm text-gray-700'>Category Title</label>
        <input type="text" id="category" name="category" placeholder=' Add category' className='border border-gray-500 rounded-md shadow-2xl w-full py-2 pl-2' {...register("category")} />
        <p className=' text-sm text-red-700'>{errors.category?.message}</p>
        <div className='w-full text-center'><input type="submit" value="Add Category" className='p-2 bg-green-600 text-white cursor-pointer rounded-md' /></div>
      </form>
    </div>
  )
}

export default AddCategoryForm
