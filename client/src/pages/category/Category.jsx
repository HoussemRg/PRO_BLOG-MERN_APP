import React, { useEffect } from 'react'
import { useParams,Link } from 'react-router-dom'
import PostsList from '../../Components/Posts/PostsList';
import { getPostsPerCategory } from '../../redux/apiCalls/postApiCall.js';
import {useDispatch,useSelector} from 'react-redux'
const Category = () => {
  const dispatch=useDispatch();
  const {postsPerCategory}=useSelector(state => state.post);
    const {category}=useParams();
    useEffect(()=>{
      dispatch(getPostsPerCategory(category))
        window.scrollTo(0,0);
      },[category]);
  return (
    <>
      {postsPerCategory.length===0 ? 
        <div className='w-full my-11 flex flex-col justify-center items-center'>
          <div>No posts sorted by <span className=' text-red-600'>{category}</span></div>
          <Link className=' text-blue-600' to="/posts"> Go to posts page</Link>
        </div> 
        
      : 
        <div className='w-full flex flex-col justify-center items-center'>
          
          <div className='my-10 text-2xl font-semibold'>Posts sorted by {category}</div>
          <div className=' w-2/3 '>
          <PostsList posts={postsPerCategory} />
          </div>
      </div>
      }
  </>
    
  )
}

export default Category
