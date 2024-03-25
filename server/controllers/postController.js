import fs from 'fs';
import path from 'path';
import  {cloudinaryRemoveImage, cloudinaryUploadImage} from '../utils/cloudinary.js';
import asyncHandler from 'express-async-handler';
import { validateCreatePost,Post, validateUpdatePost } from '../models/Post.js';
import {Comment} from '../models/Comments.js'


/**---------------------------------
 * @desc create post
 * @route /api/posts
 * @resquest post
 * @acess for only logged in
 ------------------------------------*/
const createPost = asyncHandler(async (req,res)=>{
    if(!req.file) return res.status(400).send("no image provided");
    const {error}= validateCreatePost(req.body)
    if(error) return res.status(400).send(error.details[0].message);
    const imagePath=path.join("C:/Users/ASUS/Desktop/houssem/MERN/mern_social_media_app/server/middlewares",`../images/${req.file.filename}`);
    const result = await cloudinaryUploadImage(imagePath);
    const post= await Post.create({
        title:req.body.title,
        description:req.body.description,
        category:req.body.category,
        user:req.user.id,
        image:{
            url:result.secure_url,
            publicId:result.public_id
        }
    })
    res.status(201).send(post);

    
    fs.unlinkSync(imagePath);
})

/**---------------------------------
 * @desc GET all posts
 * @route /api/posts
 * @resquest get
 * @acess public
 ------------------------------------*/

const getPosts = asyncHandler(async (req,res)=>{
    const POST_PER_PAGE=3;
    const {pageNumber,category}=req.query;
    let posts;
    //on va filtrer si on veux tous les posts ou on passe une category ou selon la page et chaque page contient 3 posts
    if(pageNumber){
        posts=await Post.find().skip((pageNumber-1)*POST_PER_PAGE).limit(POST_PER_PAGE).sort({createdAt : -1}).populate("user",["-password"]);;
    }else if(category){
        posts=await Post.find({category}).sort({createdAt : -1}).populate("user",["-password"]);
    }else{
        posts=await Post.find().sort({createdAt : -1}).populate("user",["-password"]);
    }
    res.status(200).send(posts);
})

/**---------------------------------
 * @desc GET single post
 * @route /api/posts/:id
 * @resquest get
 * @acess public
 ------------------------------------*/

 const getSinglePost = asyncHandler(async (req,res)=>{
    const post= await Post.findById(req.params.id).populate("user",["-password"]).populate("comments");

    if(!post) return res.status(404).send("post not found");
    res.status(200).send(post);
})

/**---------------------------------
 * @desc GET number of posts
 * @route /api/posts/count
 * @resquest get
 * @acess public
 ------------------------------------*/

 const getNumberOfPosts = asyncHandler(async (req,res)=>{
    const nbPosts= await Post.countDocuments();
    res.status(201).send({nbPosts:nbPosts});
})

/**---------------------------------
 * @desc DELETE delete post
 * @route /api/posts/:id
 * @resquest delete
 * @acess for only admin or user himself
 ------------------------------------*/

 const deletePost = asyncHandler(async (req,res)=>{
    const post=await Post.findById(req.params.id);
    if (!post) return res.status(404).send("post not found");
    if(req.user.isAdmin || req.user.id===post.user.toString()){ // the user is ObjetId in database or we can use user.id
        await cloudinaryRemoveImage(post.image.publicId);
        await Post.findByIdAndDelete(req.params.id);
        await Comment.deleteMany({postId:post._id});
        return res.status(200).send({postId:post._id,message:"Post deleted successfully"});
    }else{
        return res.status(403).send("not allowed");
    }
    
})


/**---------------------------------
 * @desc UPDATE post
 * @route /api/posts/:id
 * @resquest update
 * @acess private for only  user himself
 ------------------------------------*/
const updatePost=asyncHandler(async(req,res)=>{
    const {error}=validateUpdatePost(req.body);
    if(error) res.status(400).send(error.details[0].message);
    const post=await Post.findById(req.params.id);
    if(!post) return res.status(404).send("post is not found");
    if(req.user.id===post.user.toString()){
        /*if(req.file){
            await cloudinaryRemoveImage(post.image.publicId);
            const imagePath=path.join("C:/Users/ASUS/Desktop/houssem/MERN/mern_social_media_app/server/middlewares",`../images/${req.file.filename}`);
            await cloudinaryUploadImage(imagePath);
        }*/
        const newPost=await Post.findByIdAndUpdate(req.params.id,{
            $set:{
                title:req.body.title,
                description:req.body.description,
                category:req.body.category,
                }
            },
        {new:true}).populate("user",["-password"]).populate("comments");
        res.status(200).send(newPost);
    }else{
        res.status(403).send(`not allowed`);
    }
})

/**---------------------------------
 * @desc UPDATE post image
 * @route /api/posts/upload-post-image/:id
 * @resquest update
 * @acess private for only user himself
 ------------------------------------*/
 const updatePostImage=asyncHandler(async(req,res)=>{
    const post=await Post.findById(req.params.id);
    if(!post) return res.status(404).send("post is not found");
    
    if(req.user.id===post.user.toString()){
        if(req.file){
            await cloudinaryRemoveImage(post.image.publicId);
            const imagePath=path.join("C:/Users/ASUS/Desktop/houssem/MERN/mern_social_media_app/server/middlewares",`../images/${req.file.filename}`);
            
            const newPostImage=await cloudinaryUploadImage(imagePath);
            
            const updatedPost=await Post.findByIdAndUpdate(req.params.id,{
                $set:{
                    image:{
                        url:newPostImage.secure_url,
                        publicId:newPostImage.public_id
                    }
                }
            },{new:true});
            
            res.status(200).send(`post image is updated successfully`);
            fs.unlinkSync(imagePath);
        }else{
            res.status(400).send(`no image given`);
        }
        
    }else{
        res.status(403).send(`not allowed`);
    }
})

/**---------------------------------
 * @desc toggle like 
 * @route /api/posts/like/:id
 * @resquest update
 * @acess private (only logged in)
 ------------------------------------*/
const toggleLike=asyncHandler(async (req,res)=>{
    const loggedInUser=req.user.id;
    const postId=req.params.id;
    let post = await Post.findById(postId);
    if(!post) return res.status(404).send("post is not found");
    const isPostAlreadyLiked=post.likes.indexOf(loggedInUser);//check the likes array
    if(isPostAlreadyLiked !== -1){
        post = await Post.findByIdAndUpdate(postId,{
            $pull:{likes:loggedInUser}   //method of mongoose to remove an item from an array (in our case the id of the user )
        },{new:true});
    }else{
        post = await Post.findByIdAndUpdate(postId,{
            $push:{likes:loggedInUser}   //method of mongoose to add an item to an array (in our case the id of the user )
        },{new:true});
    }
    return res.status(200).send(post);
})

export {createPost,getPosts,getSinglePost,getNumberOfPosts,deletePost,updatePost,updatePostImage,toggleLike}