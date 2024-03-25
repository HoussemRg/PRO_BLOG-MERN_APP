import React from 'react'
import { Link } from 'react-router-dom'

const AdminSideBar = () => {
  return (
    <div className='w-full flex flex-col items-center justify-start gap-7 h-full text-gray-500 border-gray-400 md:border-r-2  py-7'>
        <Link to="/admin-dashboard/" className='text-xl mb-5' ><i className="fa-solid fa-chalkboard"></i>Dashboard</Link>
        <Link to="/admin-dashboard/users-table" ><i className="fa-solid fa-users mx-2"></i>Users</Link>
        <Link to="/admin-dashboard/posts-table" ><i className="fa-brands fa-flipboard mx-2"></i>Posts</Link>
        <Link to="/admin-dashboard/categories-table" ><i className="fa-solid fa-layer-group mx-2"></i>Categories</Link>
        <Link to="/admin-dashboard/comments-table" ><i className="fa-solid fa-comments mx-2"></i>Comments</Link>
      
    </div>
  )
}

export default AdminSideBar
