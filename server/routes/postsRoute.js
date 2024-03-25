import express from 'express';
import { createPost, deletePost, getNumberOfPosts, getPosts, getSinglePost, toggleLike, updatePost, updatePostImage } from '../controllers/postController.js';
import { verifyToken, verifyTokenAndAuthorization } from '../middlewares/verifyToken.js';
import { uploadPhoto } from '../middlewares/photoUpload.js';
import { validateId } from '../middlewares/verifyId.js';




const postsRouter = express.Router();

// route for /api/posts
postsRouter.post('/',verifyToken,uploadPhoto.single("image"),createPost);

// route for /api/posts
postsRouter.get('/',getPosts);

// route for /api/posts/count
postsRouter.get('/count',getNumberOfPosts);

// route for /api/posts/:id
postsRouter.get('/:id',validateId,getSinglePost);
// route for /api/posts/:id
postsRouter.delete('/:id',validateId,verifyToken,deletePost);

// route for /api/posts/:id
postsRouter.put('/:id',validateId,verifyToken,updatePost);

// route for /api/posts/upload-post-image/:id
postsRouter.put('/upload-post-image/:id',validateId,verifyToken,uploadPhoto.single("image"),updatePostImage);

// route for /api/posts/like/:id
postsRouter.put('/like/:id',validateId,verifyToken,toggleLike);


export default postsRouter;