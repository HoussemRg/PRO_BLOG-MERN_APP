import React from 'react';
import PostsList from '../../Components/Posts/PostsList';
import Sidebar from '../../Components/Posts/Sidebar.jsx';
import { Link } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import { useEffect } from 'react';
import { getPosts } from '../../redux/apiCalls/postApiCall.js';


const Home = () => {
    const dispatch=useDispatch();
    const {posts}=useSelector(state => state.post);
    useEffect(()=>{
        dispatch(getPosts(1));
    },[])
  return (
    <div className='  bg-slate-100'>
        <div className="bg-home h-72 relative z-10 bg-cover bg-no-repeat">
            <div className=' text-neutral-700 flex  justify-center items-center h-full'>
                <span className=' rounded-lg shadow-xl bg-white p-3 font-mono text-3xl font-bold'> WELCOME TO BLOGGY</span>
            </div>
        </div>
        <div className=' text-3xl underline m-4 my-10 w-full'>
            Latest Posts
        </div>
        <div className='md:grid md:grid-cols-12 flex flex-col justify-center'>
            <div className=' md:col-span-9'><PostsList  posts={posts} /></div>
            <div className=' md:col-span-3'><Sidebar /></div>
        </div>
        
        <div>
            <Link to="/posts" className=' bg-green-600 text-xl flex justify-center items-center hover:bg-green-500 text-white p-3 m-4'>See All Posts</Link>
        </div>
    </div>
  )
}

export default Home
