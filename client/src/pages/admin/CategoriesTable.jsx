import React, { useEffect } from 'react'
import AdminSideBar from './AdminSideBar'
import Swal from 'sweetalert2';
import {useDispatch,useSelector} from 'react-redux'
import { deleteCategories,getCategories } from '../../redux/apiCalls/categoryApiCall'

const CategoriesTable = () => {
  const dispatch=useDispatch();
  const {categories}=useSelector(state=> state.category);
  useEffect(()=>{
    dispatch(getCategories())
  },[categories])
    const deleteCategoriesHandler=(categoryId)=>{
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
            dispatch(deleteCategories(categoryId))
          }
        });
    }
  return (
    <div className='md:grid  md:grid-cols-12 flex flex-col items-center w-full my-4'>
        <div className=' md:col-span-2 md:flex md:justify-start h-full'><AdminSideBar /></div>
        <div className=' md:col-span-10 flex flex-col justify-center items-center md:w-full '>
            <h1 className=' text-2xl text-gray-700 my-10 ml-7 underline font-sans font-bold'>Categories</h1>
            <table className='md:w-11/12 sm:w-full  border'>
              <thead className=' bg-gray-900 text-white'>
                <tr>
                  <th className='text-center'>Count</th>
                  <th className='text-center'>Categoy</th>
                  <th className='text-center'>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category,index)=>(
                  <tr key={category?._id} className='text-center border border-black'>
                    <td className=' font-semibold text-center border border-black'>{index+1}</td>
                    <td className=' border border-black'>
                      <div className='flex flex-col justify-center items-center'>
                        <b>{category?.title}</b>
                      </div>
                    </td>
                    <td className=' flex  py-3	 justify-center items-center'>
                      
                      <div className='p-1 text-xs md:text-base text-wrap text-center  cursor-pointer bg-red-500 hover:bg-red-700 text-white rounded-lg border-none' onClick={()=>deleteCategoriesHandler(category?._id)}>Delete category</div>
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>
  )
}

export default CategoriesTable
