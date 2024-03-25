import mongoose from "mongoose";
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import passwordComplexity from 'joi-password-complexity'

const userSchema = new mongoose.Schema({
    username:{
        type :String,
        required:true,
        minlength:2,
        maxlength:100,
        trim:true
    },
    email:{
        type :String,
        required:true,
        minlength:5,
        maxlength:100,
        unique:true
    },
    password:{
        type :String,
        required:true,
        minlength:5,
        unique:true
    },
    profilePhoto: {
        type:Object,
        default: {
            url:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            publicId:null
        }
    },
    bio:{
        type: String
    },
    isAdmin:{
        type : Boolean,
        default : false
    },
    isAccountVerified:{
        type : Boolean,
        default : false
    }
},{timestamps:true,toJSON:{virtuals : true},toObject:{virtuals:true}},  // to allow the virtual method
);

//populate posts that belong to this user when he/she get his/her profile
// the virtual methode takes 2 params 
userSchema.virtual('posts',{   //add post field to the user schema( when it needs not all times = when the user check his profile account)
    ref:"Post",  // adding what
    foreignField:"user",  // a link between the two models (user must be in the post schema)
    localField:"_id"  // represents the user = gives all the posts with this user id
})

//generate token
userSchema.methods.generateAuthToken=function(){
    return jwt.sign({id:this._id, isAdmin:this.isAdmin},process.env.JWT_SECRET);
}

//validate register user
const validateRegisterUser= (obj)=>{
    const schema = Joi.object({
        username:Joi.string().required().min(2).max(100).trim(),
        email:Joi.string().required().min(5).max(100).email(),
        password:passwordComplexity().required(),
        });
        return schema.validate(obj);
}

//validate login user
const validateLoginUser= (obj)=>{
    const schema = Joi.object({
        email:Joi.string().required().min(5).max(100).email(),
        password:passwordComplexity().required(),
        });
        return schema.validate(obj);
}
//validate update user
const validateUpdateUserUser= (obj)=>{
    const schema = Joi.object({
        username:Joi.string().trim().min(2).max(100),
        password:passwordComplexity(),
        bio:Joi.string()
        });
        return schema.validate(obj);
}

//validate email 
const validateEmailUser= (obj)=>{
    const schema = Joi.object({
        email:Joi.string().required().min(5).max(100).email(),
        });
        return schema.validate(obj);
}
//validate New Password 
const validateNewPasswordUser= (obj)=>{
    const schema = Joi.object({
        password:passwordComplexity().required(),
        });
        return schema.validate(obj);
}
const User= mongoose.models.User || mongoose.model("User",userSchema);

export {User,validateRegisterUser,validateLoginUser,validateUpdateUserUser,validateNewPasswordUser,validateEmailUser};

