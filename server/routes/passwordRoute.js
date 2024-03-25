import express from 'express';
import {resetPassword,getResetPasswordLink, resetPasswordController} from '../controllers/passwordController.js';

const passwordRouter = express.Router();

// route for /api/password/reset-password-link
passwordRouter.post('/reset-password-link',resetPassword);

// route for /api/password/reset-password-link/:userId/:token
passwordRouter.get('/reset-password-link/:userId/:token',getResetPasswordLink);

// route for /api/password/reset-password-link/:userId/:token
passwordRouter.post('/reset-password-link/:userId/:token',resetPasswordController);


export default passwordRouter;