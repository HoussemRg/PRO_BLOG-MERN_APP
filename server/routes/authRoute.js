import express from 'express';
import {registerUser,loginUser, verifyUserAccount} from '../controllers/authController.js';
const authRouter = express.Router();

// route for /api/auth/register
authRouter.post('/register',registerUser);

// route for /api/auth/login
authRouter.post('/login',loginUser);

// route for /api/auth/:userId/verify/:token
authRouter.get('/:userId/verify/:token',verifyUserAccount);


export default authRouter;