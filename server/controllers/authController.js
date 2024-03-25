import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import { User,validateRegisterUser,validateLoginUser } from '../models/User.js';
import { VerificationTokenModel } from '../models/VerificationToken.js';
import crypto from 'crypto'
import sendEmail from '../utils/sendEmail.js'






/**---------------------------------
 * @desc register / sign up new user 
 * @route /api/auth/register
 * @resquest Post
 * @acess public
 ------------------------------------*/


const registerUser = asyncHandler(async (req,res)=>{
    const {error} = validateRegisterUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({email:req.body.email});
    if(user) return res.status(400).send("user already exists");
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(req.body.password,salt);
    user = new User({
        username:req.body.username,
        email: req.body.email,
        password: hashedPassword
    })
    await user.save();
    //creating new verification token and send it to DB
    const verificationToken= new VerificationTokenModel({
        userId:user._id,
        token:crypto.randomBytes(32).toString("hex")
    })
    await verificationToken.save()
    //making the link
    console.log(user._id)
    const link=`${process.env.CLIENT_DOMAIN}/user/${user._id}/verify/${verificationToken.token}`  //a wrong id is sended in the url
    
    //putting the link in a html template
    const htmlTemplate=`
        <div className='w-full mx-auto'>
        <div>click on the link below to verify your email</div>
        <a href="${link}" className=' text-blue-500'>Verify your account</a>
        </div>
    `;
    //sending email to the user
    
    await sendEmail(user.email,"verify your email",htmlTemplate)
    
    return res.status(201).send("we sent to you an email,please verify your email address");
})


/**---------------------------------
 * @desc log in  user 
 * @route /api/auth/login
 * @resquest Post
 * @acess public
 ------------------------------------*/

 const loginUser=asyncHandler(async(req,res)=>{
    const {error} = validateLoginUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send("invalid user or password");
    const isPasswordMatch=await bcrypt.compare(req.body.password,user.password);
    if(!isPasswordMatch) return res.status(400).send("invalid user or password");
    // sending email (verify account if not verified because the user can register and then delete the email of verification so he cannot login or create new account)
    //we must send a new email of verification
    if(!user.isAccountVerified){
        let verifyToken=await VerificationTokenModel.findOne({
            userId:user._id
        })
        if(!verifyToken){
            verifyToken= new VerificationTokenModel({
                userId:user._id,
                token:crypto.randomBytes(32).toString("hex")
            })
            await verifyToken.save()
            
            //making the link
            const link=`${process.env.CLIENT_DOMAIN}/user/${user._id}/verify/${verifyToken.token}`  //a wrong id is sended in the url
            
            //putting the link in a html template
            const htmlTemplate=`
                <div className='w-full mx-auto'>
                <div>click on the link below to verify your email</div>
                <a href="${link}" className=' text-blue-500'>Verify</a>
                </div>
            `;
            //sending email to the user
            
            await sendEmail(user.email,"verify your email",htmlTemplate)
            
            return res.status(201).send("we sent to you an email,please verify your email address");
        }
        res.status(400).send("we sent to you an email,please verify your email address");
    }
    const token = user.generateAuthToken();
    res.status(200).send({
        id: user._id,
        isAdmin: user.isAdmin,
        profilePhoto : user.profilePhoto,
        token: token,
        username:user.username
    })
 });

 /**---------------------------------
 * @desc verify user account 
 * @route /api/auth/:userId/verify/:token
 * @resquest get
 * @acess public
 ------------------------------------*/
const verifyUserAccount=asyncHandler(async (req,res)=>{
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
    user.isAccountVerified=true;
    await user.save();
    const result=await VerificationTokenModel.findByIdAndDelete({ _id: verificationToken._id });
    
    res.status(200).send("Your account is verified")
})

 export {registerUser,loginUser,verifyUserAccount};