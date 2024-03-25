import React, { useEffect,useState } from 'react'
import PostsList from '../../Components/Posts/PostsList'
import Sidebar from '../../Components/Posts/Sidebar.jsx';
import Pagination from '../../Components/pagination/Pagination.jsx';
import { getPosts,getPostsCount } from '../../redux/apiCalls/postApiCall.js';
import {useDispatch,useSelector} from 'react-redux'


const Posts = () => {
  const POST_PER_PAGE=3;
  const dispatch=useDispatch();
  const {postsCount,posts}=useSelector(state => state.post);
  const [currentPage,setCurrentPage]=useState(1)
  const pages=Math.ceil(postsCount / POST_PER_PAGE);
  useEffect(()=>{
    dispatch(getPosts(currentPage));
    window.scrollTo(0,0);
  },[currentPage])

  useEffect(()=>{
    dispatch(getPostsCount());
    
  },[])
  //because we want it to run one time only not each time the current page is changed
  return (
    <div className='flex flex-col justify-center items-center w-11/12 mx-auto  '>
      <div className='md:grid md:grid-cols-12 md:w-3/4 flex flex-col justify-center mt-10'>
            <div className=' md:col-span-9'><PostsList  posts={posts} /></div>
            <div className=' md:col-span-3'><Sidebar /></div>
        </div>
        <Pagination pages={pages} setCurrentPage={setCurrentPage} currentPage={currentPage} />
    </div>
  )
}

export default Posts
