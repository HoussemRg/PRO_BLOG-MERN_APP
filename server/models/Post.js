import mongoose, { Mongoose } from "mongoose";
import Joi from "joi";


const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:2,
        maxlength:200,
        trim:true
    },
    description:{
        type:String,
        required:true,
        minlength:10,
        trim:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    category:{
        type:String,
        trim:true,
        required:true
    },
    image:{
        type:Object,
        default:{
            url:"",
            publicId:null
        }
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ]
},{timestamps:true,toJSON:{virtuals : true},toObject:{virtuals:true}});

postSchema.virtual('comments',{   
    ref:"Comment", 
    foreignField:"postId",  
    localField:"_id"  
})


const Post= mongoose.model("Post",postSchema);

const validateCreatePost= (obj)=>{
    const schema=Joi.object({
        title:Joi.string().required().min(2).max(200).trim(),
        description: Joi.string().required().min(10).trim(),
        category:Joi.string().required().trim(),
    })
    return schema.validate(obj);
}
const validateUpdatePost= (obj)=>{
    const schema=Joi.object({
        title:Joi.string().min(2).max(200).trim(),
        description: Joi.string().min(10).trim(),
        category:Joi.string().trim(),
    })
    return schema.validate(obj);
}

export {Post,validateCreatePost,validateUpdatePost};