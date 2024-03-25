import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AddCategoryForm from './AddCategoryForm'
import {useDispatch,useSelector} from 'react-redux'
import { getCategories } from '../../redux/apiCalls/categoryApiCall'
import { getUsersCount } from '../../redux/apiCalls/profileApiCall'
import { getPostsCount } from '../../redux/apiCalls/postApiCall'
import { getAllComments } from '../../redux/apiCalls/commentApiCall'

const AdminMain = () => {
    const dispatch=useDispatch();
    const {categories}=useSelector(state=> state.category);
    const {usersCount}=useSelector(state=> state.profile);
    const {postsCount}=useSelector(state=> state.post);
    const {comments}=useSelector(state=> state.comment);

    useEffect(()=>{
        dispatch(getCategories());
        dispatch(getUsersCount());
        dispatch(getPostsCount());
        dispatch(getAllComments());
    },[])
  return (
    <div className='my-4  md:border-l-2 md:border-gray-600'>
        <div className='flex flex-col md:flex-row md:justify-around gap-8 md:w-11/12 md:mx-auto text-gray-500'>
            <div className='border-2 rounded-md shadow-xl px-2 py-3 border-gray-500 flex flex-col justify-start gap-3 w-5/6 mx-auto'>
                <div className='text-lg'>Users</div>
                <div className='text-lg text-red-500'>{usersCount}</div>
                <div className='flex justify-between items-stretch gap-2'>
                    <div className='bg-green-500 text-white rounded-md p-1 md:text-base text-xs'><Link to="/admin-dashboard/users-table" >See all users</Link></div>
                    <div className='px-2 py-1 rounded-md bg-gray-500 text-white text-center flex flex-col justify-center items-center   '><i className="fa-regular fa-user"></i></div>
                </div>
            </div>
            <div className='border-2 px-2 rounded-md shadow-xl py-3 border-gray-500 flex flex-col justify-start gap-3 w-5/6 mx-auto'>
                <div className='text-lg'>Posts</div>
                <div className='text-lg text-red-500'>{postsCount}</div>
                <div className='flex justify-between items-stretch gap-2'>
                    <div className='bg-green-500 text-white rounded-md p-1 md:text-base text-xs'><Link to="/admin-dashboard/posts-table" >See all posts</Link></div>
                    <div className='px-2 py-1 rounded-md bg-gray-500 text-white text-center flex flex-col justify-center items-center   '><i className="fa-brands fa-flipboard "></i></div>
                </div>
            </div>
            <div className=' border-2 px-2 rounded-md shadow-xl py-3 border-gray-500 flex flex-col justify-start gap-3 w-5/6 mx-auto'>
                <div className='text-lg'>Categories</div>
                <div className='text-lg text-red-500'>{categories?.length}</div>
                <div className='flex justify-between items-stretch gap-2'>
                    <div className='bg-green-500 text-white rounded-md p-1 md:text-base text-xs'><Link to="/admin-dashboard/categories-table" >See all categories</Link></div>
                    <div className='px-2 py-1 rounded-md bg-gray-500 text-white text-center flex flex-col justify-center items-center   '><i className="fa-solid fa-layer-group "></i></div>
                </div>
            </div>
            <div className='border-2 px-2 rounded-md shadow-xl py-3 border-gray-500 flex flex-col justify-start gap-3 w-5/6 mx-auto'>
                <div className='text-lg'>Comments</div>
                <div className='text-lg text-red-500'>{comments.length}</div>
                <div className='flex justify-between items-stretch gap-2'>
                    <div className='bg-green-500 text-white rounded-md p-1 md:text-base text-xs'><Link to="/admin-dashboard/comments-table" >See all comments</Link></div>
                    <div className='px-2 py-1 rounded-md bg-gray-500 text-white text-center flex flex-col justify-center items-center   '><i className="fa-solid fa-comments "></i></div>
                </div>
            </div>
            
        </div>
        <div className='md:w-11/12 md:mx-auto md:border-2 md:my-4 md:mt-20 md:border-gray-500'></div>
        <div>
        <div className='w-full flex justify-center'>
            <AddCategoryForm />
        </div>
      </div>
    </div>
  )
}

export default AdminMain
