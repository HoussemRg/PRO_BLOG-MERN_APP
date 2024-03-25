import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import { User, validateEmailUser, validateNewPasswordUser } from '../models/User.js';
import { VerificationTokenModel } from '../models/VerificationToken.js';
import crypto from 'crypto'
import sendEmail from '../utils/sendEmail.js'

/**---------------------------------
 * @desc reset password 
 * @route /api/password/reset-password-link
 * @resquest Post
 * @acess public
 ------------------------------------*/

const resetPassword=asyncHandler(async (req,res)=>{
    const {error} = validateEmailUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send("User is not found");
    let verifyToken=await VerificationTokenModel.findOne({
        userId:user._id
    })
    
    if(!verifyToken){
        verifyToken= new VerificationTokenModel({
            userId:user._id,
            token:crypto.randomBytes(32).toString("hex")
        })
        
        await verifyToken.save();
    }
    const link=`${process.env.CLIENT_DOMAIN}/reset-password/${user._id}/${verifyToken.token}` 

    const htmlTemplate=`
                <div className='w-full mx-auto'>
                <div>click on the link below to verify your email</div>
                <a href="${link}" className=' text-blue-500'>Verify</a>
                </div>
            `;
    await sendEmail(user.email,"Reset password",htmlTemplate)
            
    return res.status(201).send("we sent to you a password reset link,Please verify your email");
})

/**---------------------------------
 * @desc  get reset password link
 * @route /api/password/reset-password-link/:userId/:token
 * @resquest get
 * @acess public
 ------------------------------------*/

 const getResetPasswordLink=asyncHandler(async (req,res)=>{
    const user=await User.findById(req.params.userId);
    if(!user){
        return res.status(400).send({message:"invalid link"});
    }
    const verificationToken= await VerificationTokenModel.findOne({
        userId:user._id,
        token:req.params.token
    })
    
    if(!verificationToken){
        return res.status(400).send({message:"invalid link"});
    }
    
    return res.status(200).send({message:"valid url"});
 })

 /**---------------------------------
 * @desc   reset password 
 * @route /api/password/reset-password-link/:userId/:token
 * @resquest post
 * @acess public
 ------------------------------------*/
 const resetPasswordController=asyncHandler(async (req,res)=>{
    const {error} = validateNewPasswordUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findById(req.params.userId);
    if(!user) return res.status(400).send("Invalid link");
    const verificationToken= await VerificationTokenModel.findOne({
        userId:user._id,
        token:req.params.token
    })
    
    if(!verificationToken){
        return res.status(400).send("invalid link");
    }
    if(!user.isAccountVerified){
        user.isAccountVerified=true;
    }
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(req.body.password,salt);
    user.password=hashedPassword;
    await user.save();
    await VerificationTokenModel.findByIdAndDelete( verificationToken._id);
    return res.status(200).send({message:"password reset successfully,Please log in"});
 })

export {resetPassword,resetPasswordController,getResetPasswordLink}