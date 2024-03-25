import express from 'express';
import { verifyTokenAndAdmin } from '../middlewares/verifyToken.js';
import { createCategory, deleteCategory, getAllCategories } from '../controllers/categoryController.js';
import { validateId } from '../middlewares/verifyId.js';


const categoryRouter=express.Router();

// route for /api/categories
categoryRouter.post('/',verifyTokenAndAdmin,createCategory);

// route for /api/categories
categoryRouter.get('/',getAllCategories);

// route for /api/categories/:id
categoryRouter.delete('/:id',validateId,verifyTokenAndAdmin,deleteCategory);

export default categoryRouter;