import mongoose from "mongoose";
import Joi from "joi";


const commentsSchema= new mongoose.Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    text:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    }
},{timestamps:true});

const Comment= mongoose.model('Comment',commentsSchema);

const validateCreateComment=(obj)=>{
    const schema = Joi.object({
        postId:Joi.string().required(),
        text:Joi.string().trim().required()
    });
    return schema.validate(obj);
}

const validateUpdateComment=(obj)=>{
    const schema = Joi.object({
        text:Joi.string().trim().required()
    });
    return schema.validate(obj);
}

export {Comment,validateCreateComment,validateUpdateComment};