import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { getCategories } from '../../redux/apiCalls/categoryApiCall';

const Sidebar = () => {
  const dispatch=useDispatch();
  const{categories}=useSelector(state => state.category);
  useEffect(()=>{
    dispatch(getCategories());
  },[])
  return (
    <div className=' py-2 pt-0'>
      <div className=' text-center mb-5 text-xl font-bold font-mono  border-y-2 border-gray-400 py-2'>CATEGORIES</div>
      <ul className='flex flex-col justify-center items-center gap-2 md:gap-7'>
        {categories.map((category)=>(
            <Link to={`/posts/categories/${category.title}`}  key={category._id} className=' bg-cyan-500 w-2/3 flex justify-center items-center p-2 mt-2  hover:bg-orange-400 text-white rounded-md text-xl'>{category.title}</Link>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
