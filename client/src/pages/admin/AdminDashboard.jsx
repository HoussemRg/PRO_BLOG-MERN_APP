import React from 'react'
import AdminMain from './AdminMain'
import AdminSideBar from './AdminSideBar'

const AdminDashboard = () => {
  return (
    
      <div className='md:grid  md:grid-cols-12 flex flex-col items-center h-full'>
        <div className=' md:col-span-2 md:flex md:justify-start h-full'><AdminSideBar /></div>
        <div className=' md:col-span-10 h-full'><AdminMain /></div>
      
      </div>
   
  )
}

export default AdminDashboard
