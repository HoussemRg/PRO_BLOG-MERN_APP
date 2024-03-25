import React from 'react';
import './index.css';
import Header from './Components/header/Header';
import {BrowserRouter as Router,Routes,Route, Navigate} from 'react-router-dom'
import Home from './pages/home/Home';
import Posts from './pages/posts-page/Posts';
import CreatePost from './pages/create-post/CreatePost';
import AdminDashboard from './pages/admin/AdminDashboard';
import Login from './pages/Form/Login';
import Register from './pages/Form/Register';
import Footer from './Components/footer/Footer';
import PostDetails from './pages/postDetails/PostDetails';
import Category from './pages/category/Category';
import Profile from './pages/profile/Profile';
import UsersTable from './pages/admin/UsersTable';
import PostsTable from './pages/admin/PostsTable';
import CategoriesTable from './pages/admin/CategoriesTable';
import CommentsTable from './pages/admin/CommentsTable';
import ForgotPassword from './pages/Form/ForgotPassword';
import ResetPassword from './pages/Form/ResetPassword';
import NotFound from './pages/not-found/NotFound';
import { ToastContainer } from "react-toastify";
import {useSelector} from 'react-redux'
import VerifyEmail from './pages/verify-email/VerifyEmail';


const App= () =>{
    const {user}=useSelector(state=>state.auth);
    return(
      <div className="flex flex-col min-h-screen bg-slate-100">
      <Router>
        <ToastContainer theme="colored" position="top-center" />
        <Header />
        <div className="flex-1 h-full">
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='posts'>
              <Route index element={<Posts />} />
              <Route path='create-post' element={user ? <CreatePost /> : <Navigate to="/" />} />
              <Route path='details/:id' element={<PostDetails />} />
              <Route path='categories/:category' element={<Category />} />
            </Route>
            <Route path='admin-dashboard'>
              <Route index element={user?.isAdmin ? <AdminDashboard /> : <Navigate to="/" />} />
              <Route path='users-table' element={user?.isAdmin ? <UsersTable /> : <Navigate to="/" />} />
              <Route path='posts-table' element={user?.isAdmin ? <PostsTable /> : <Navigate to="/" />} />
              <Route path='categories-table' element={user?.isAdmin ? <CategoriesTable /> : <Navigate to="/" />} />
              <Route path='comments-table' element={user?.isAdmin ? <CommentsTable /> : <Navigate to="/" />} />
            </Route>
            <Route path='/profile/:id' element={<Profile />} />
            <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path='/register' element={!user ? <Register /> : <Navigate to="/" />} />
            <Route path='/user/:userId/verify/:token' element={!user ? <VerifyEmail /> : <Navigate to="/" />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password/:userId/:token' element={<ResetPassword />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div >
        <div className='w-full'><Footer /></div>
      </Router>
    </div>
        
        
          
        
    );
}

export default App;