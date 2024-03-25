import React, { useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../redux/apiCalls/authApiCall';
import LOGO from '../../images/logo.png'
const Header = () => {
    const navigate =useNavigate()
    const dispatch=useDispatch();
    const {user} = useSelector(state => state.auth);

    const [isVisible,setIsVisible]=useState(true);
    const [dropDown,setDropDown]=useState(false);

    const toggleMenu=()=>{
        setIsVisible(!isVisible);
    }
    const toggleDropDown=()=>{
        setDropDown(!dropDown);
    }
    const hideMenu=()=>{
        if (window.innerWidth <= 768) {
            setIsVisible(!isVisible);
          }
    }
    const logout=()=>{
        dispatch(logoutUser());
        toggleDropDown();
        navigate('/');
    }
    useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth >= 768 && !isVisible) {
            setIsVisible(true);
          }
        };

        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, [isVisible]);
  return (
    <div  className='bg-cyan-500 flex justify-between  items-center  w-full font-sans text-white z-50 relative    '>
        <div id="header-left" className='flex justify-between items-center md:w-1/5 w-full  p-2 m-4'>
            <Link to="/" className=' text-2xl font-bold md:flex md:justify-between md:items-center hidden cursor-pointer ' onClick={hideMenu}>
                <img className='h-16 w-16 rounded-lg ' src={LOGO} alt="logo" />
            </Link>
            <div className='md:hidden cursor-pointer text-2xl hover:text-cyan-800' onClick={toggleMenu}>
                <i className="fa-solid fa-list"></i>
            </div>
            <Link to="/" className=' text-2xl font-bold flex justify-between items-center md:hidden ' >
                <i className="fa-solid fa-photo-film"></i>
                <span className='underline text-2xl italic'>BLOGGY</span>
            </Link>
        </div>
        <div id="nav" className={` ${isVisible ? 'flex' : 'hidden'} md:flex-row flex-col absolute md:static left-0   top-16 w-full bg-cyan-500  cursor-pointer justify-around items-center font-medium  lg:text-xl  lg:mx-4 lg:max-w-3xl gap-8 lg:gap-2 `}>
            <Link to="/" className=' hover:text-cyan-800 flex gap-2 items-center ' onClick={hideMenu}>
                <i className="fa-solid fa-house"></i>
                <p>Home</p>
            </Link>
            <Link to="/posts" className='hover:text-cyan-800 flex gap-2 items-center ' onClick={hideMenu}>
            <i className="fa-regular fa-paste"></i>
            Posts
            </Link>
            {user && 
                <Link to="/posts/create-post" className='hover:text-cyan-800 flex gap-2 items-center ' onClick={hideMenu}>
                <i className="fa-solid fa-plus"></i>
                Create
                </Link>
            }
            {
                user?.isAdmin &&
                <Link to="/admin-dashboard" className='hover:text-cyan-800 flex gap-2 items-center ' onClick={hideMenu}>
                <i className="fa-solid fa-chalkboard-user"></i>
                Admin Dashboard
                </Link>
            }
            
            {
                user ? <div className='flex flex-col justify-center gap-5 items-center md:hidden'>
                            <div className='flex justify-center gap-3 items-center'>
                                <div className=''><img src={user?.profilePhoto.url} alt="profilePhoto" className='rounded-full w-9 h-7 ' /></div>
                                <div className='md:text-sm'>{user?.username}</div>
                            </div>
                            <div className='flex flex-col justify-around text-lg   w-48 rounded-sm border-t-0  items-center gap-3   text-gray-600 border-cyan-500 border-2 p-4'>
                            <Link to={`/profile/${user?._id}`} className='text-white hover:text-cyan-600'>Profile</Link>
                            <div className='hover:text-cyan-600 cursor-pointer text-white' onClick={logout}>Logout</div>
                            </div>
                            </div> 
                    :
                     <div id="header-right" className=' md:hidden flex justify-between  items-center md:gap-1 p-1'>
                        <Link to="/login" className='flex  items-center rounded-full bg-white text-cyan-500 shadow-xl cursor-pointer mx-2'>
                            <i className="fa-solid fa-right-to-bracket p-2"></i>
                            <p className=' pr-2'>Login</p>
                        </Link>
                        <Link to="/register" className='flex  items-center rounded-full bg-white text-cyan-500  shadow-xl cursor-pointer'>
                            <i className="fa-solid fa-user-plus p-2 "></i>
                            <p className=' pr-2'>Register</p>
                        </Link>
                    </div>
            }
            
        </div>
        
        {user ? <div className='md:flex md:justify-end md:gap-3 md:items-center hidden md:w-1/3 md:ml-5 md:mr-2'>
                    <div className='text-center'><img src={user?.profilePhoto.url} alt="profilePhoto" className='rounded-full h-8 w-10 ' /></div>
                    <div className='text-sm'>{user?.username}</div>
                    <div className='text-2xl cursor-pointer' onClick={toggleDropDown}><i class="fa-solid fa-caret-down"></i></div>
                    {dropDown && <div className='flex flex-col justify-around text-lg text-white  w-48 rounded-b-md right-0 border-t-0 bg-cyan-500  items-center gap-3 absolute top-20  border-cyan-500 border-2 p-4'>
                        <Link to={`/profile/${user?.id}`} className='hover:text-cyan-600' onClick={toggleDropDown}>Profile</Link>
                        <div onClick={logout} className='hover:text-cyan-600 cursor-pointer'>Logout</div>
                    </div>}
                </div>
             :
            <div id="header-right" className=' hidden md:flex md:justify-between  md:items-center md:mr-3 md:gap-1 p-1'>
            <Link to="/login" className='flex  items-center rounded-full bg-white text-cyan-500 shadow-xl cursor-pointer mx-2'>
                <i className="fa-solid fa-right-to-bracket p-1"></i>
                <p className=' pr-2  py-1'>Login</p>
            </Link>
            <Link to="/register" className='flex  items-center rounded-full bg-white text-cyan-500  shadow-xl cursor-pointer'>
                <i className="fa-solid fa-user-plus p-1 "></i>
                <p className=' pr-2  py-1'>Register</p>
            </Link>
        </div> 
         }
        
      
    </div>
  )
}

export default Header
