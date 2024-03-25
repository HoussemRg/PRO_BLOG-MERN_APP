import AsyncHandler from "express-async-handler";
import {Comment,validateCreateComment,validateUpdateComment} from '../models/Comments.js'
import { User } from "../models/User.js";


/**---------------------------------
 * @desc create comment
 * @route /api/comment
 * @resquest post
 * @acess only logged in
 ------------------------------------*/

 const createComments = AsyncHandler(async (req,res)=>{
    const {error}=validateCreateComment(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const profile = await User.findById(req.user.id);
    const comment=await Comment.create({
        postId:req.body.postId,
        user:req.user.id,
        text:req.body.text,
        username:profile.username
    });
    return res.status(201).send(comment);
 })

 /**---------------------------------
 * @desc get all comments
 * @route /api/comments
 * @resquest get
 * @acess only admin
 ------------------------------------*/

 const getAllComments = AsyncHandler(async (req,res)=>{
    const comments = await Comment.find().populate("user");
    return res.status(200).send(comments);
 })

  /**---------------------------------
 * @desc delete comment
 * @route /api/comments/:id
 * @resquest delete
 * @acess only admin or comment owner himself
 ------------------------------------*/

 const deleteComments = AsyncHandler(async (req,res)=>{
    const comment=await Comment.findById(req.params.id);
    if(!comment) return res.status(404).send("comment not found");
    if(req.user.id===comment.user.toString() || req.user.isAdmin){
        await Comment.findByIdAndDelete(req.params.id);
        return res.status(200).send(`comment deleted successfully`);
    }else{
        return res.status(400).send("access denied, you can not remove this comment");
    }
 })

 /**---------------------------------
 * @desc update comment
 * @route /api/comment/:id
 * @resquest put
 * @acess only owner of comment
 ------------------------------------*/

 const updateComments = AsyncHandler(async (req,res)=>{
    const {error}=validateUpdateComment(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const comment=await Comment.findById(req.params.id);
    if(!comment) return res.status(404).send("comment not found");
    if(req.user.id===comment.user.toString()){
        const newComment=await Comment.findByIdAndUpdate(req.params.id,{
            $set:{
                text:req.body.text,
            }
        },{new:true});
        return res.status(200).send(newComment);
    }else{
        return res.status(403).send(`access denied : you can not update this comment`);
    }
 })


 export {createComments,getAllComments,deleteComments,updateComments};