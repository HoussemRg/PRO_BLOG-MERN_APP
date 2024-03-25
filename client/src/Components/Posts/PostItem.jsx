import React from 'react'
import { Link } from 'react-router-dom'

const PostItem = ({post,username,userId}) => {
//the post item component exist in different other components like home page or post page so the link to the profile page is dynamic
//because if we are in the home page we must display all posts so we bring it from posts from store and each post contains the user and his credantials
//but in the profile we need only posts of that user and the profile contains only thr user id so that's why we bring manually the username and the user id
const profileLink= userId ? `/profile/${userId}` : `/profile/${post?.user?._id}`

  return (
    <div className=' bg-white m-3 p-5 mt-0 pt-0 mb-8 rounded-lg border-2 border-gray-400 shadow-2xl '>
      <div className='flex justify-center items-center mb-3 mt-5'>
        <img src={post?.image.url} alt="" className=' md:w-1/2 md:h-96  rounded-lg ' />
      </div>
      <div className=' mt-6 flex justify-between  '>
        <div>
            <span className=' text-green-600 text-xl font-semibold '>Author : </span>
            <Link to={profileLink} className='text-lg'>{username ? username: post?.user?.username}</Link>
        </div>
        <div className=' text-base text-green-600 font-semibold'>{new Date(post.createdAt).toDateString()}</div>
      </div>
      <div className='border-b-4 w-full h-1 mt-2 border-gray-400'></div>
      <div>
        <div className='flex justify-between items-center mt-2 '>
            <div className='font-bold text-xl'>{post?.title}</div>
            <Link to={`/posts/categories/${post?.category}`} className='p-2 rounded-full bg-orange-500 text-white'>{post?.category}</Link>
        </div>
        <div className='mt-3 mb-6 text-blue-900'>{post?.description}
            
        </div>
        <Link to={`/posts/details/${post?._id}`} className=' text-lg text-blue-600 cursor-pointer visited:text-purple-800' >Read more ...</Link>
      </div>

    </div>
  )
}

export default PostItem
