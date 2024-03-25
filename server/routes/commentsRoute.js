import express from 'express';
import {verifyToken, verifyTokenAndAdmin} from '../middlewares/verifyToken.js';
import { createComments, deleteComments, getAllComments, updateComments } from '../controllers/commentsController.js';
import { validateId } from '../middlewares/verifyId.js';
const commentsRouter=express.Router();

// route for /api/comments
commentsRouter.post('/',verifyToken,createComments);

// route for /api/comments
commentsRouter.get('/',verifyTokenAndAdmin,getAllComments);

// route for /api/comments/:id
commentsRouter.put('/:id',validateId,verifyToken,updateComments);

// route for /api/comments/:id
commentsRouter.delete('/:id',validateId,verifyToken,deleteComments);

export default commentsRouter;