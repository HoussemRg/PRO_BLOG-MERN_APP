import express from 'express';
import {getAllUsers, getUserProfile, updateUserprofile,getNumberOfUsers, uploadProfilePhoto,deleteUserProfile} from '../controllers/usersController.js';
import { uploadPhoto } from '../middlewares/photoUpload.js';
import { validateId } from '../middlewares/verifyId.js';
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization, verifyTokenAndOnlyUser } from '../middlewares/verifyToken.js';



const usersRouter = express.Router();

// route for /api/users/profile
usersRouter.get('/profile',verifyTokenAndAdmin,getAllUsers);

// route for /api/users/profile/id
usersRouter.get('/profile/:id',validateId, getUserProfile);

// route for /api/users/profile/id
usersRouter.put('/profile/:id',validateId,verifyTokenAndOnlyUser,updateUserprofile);

// route for /api/users/api/users/count
usersRouter.get('/count',verifyTokenAndAdmin,getNumberOfUsers);

// route for /api/users/api/users/profile/upload-profile-photo
usersRouter.post('/profile/upload-profile-photo',verifyToken,uploadPhoto.single("image"),uploadProfilePhoto);  // only one image

// route for /api/users/profile/id
usersRouter.delete('/profile/:id',verifyTokenAndAuthorization,deleteUserProfile);

export default  usersRouter;