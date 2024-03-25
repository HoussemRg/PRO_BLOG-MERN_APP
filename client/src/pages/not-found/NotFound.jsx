import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='w-11/12 flex flex-col gap-4 justify-center items-center'>
        <div className=' text-red-500 text-2xl mt-8'>404</div>
        <div className=' text-2xl '>Page Not Found</div>
        <Link to="/" className='p-2 bg-gray-800 text-white rounded-md cursor-pointer'>Return To Home Page</Link>
    </div>
  )
}

export default NotFound
