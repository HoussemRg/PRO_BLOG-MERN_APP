import asyncHandler from 'express-async-handler';
import  {User, validateUpdateUserUser}  from '../models/User.js';
import bcrypt from 'bcrypt';
import path from 'path'
import fs from 'fs'
import { cloudinaryRemoveImage, cloudinaryUploadImage,cloudinaryRemoveManyImages } from '../utils/cloudinary.js';
import  {Comment}  from '../models/Comments.js';
import  {Post}  from '../models/Post.js';


/**---------------------------------
 * @desc list of users
 * @route /api/users/profile
 * @resquest get
 * @acess private for admin
 ------------------------------------*/

 const getAllUsers = asyncHandler( async (req,res)=>{
   
    const users= await User.find().select('-password').populate("posts");
    res.status(200).send(users);
 })

/**---------------------------------
 * @desc user profile
 * @route /api/user/profile/:id
 * @resquest get
 * @acess public
 ------------------------------------*/
//si on fait une requete avec un id invalid (n'est pas ObjectId) il va donner un erreur donc on peut le controler avec un middleware 
 const getUserProfile = asyncHandler( async (req,res)=>{   
   const user= await User.findById(req.params.id).select('-password').populate("posts");
   if(!user) return res.status(404).send("user not found");
   res.status(200).send(user);
})


/**---------------------------------
 * @desc update user profile
 * @route /api/users/profile/:id
 * @resquest put
 * @acess private for user with this id
 ------------------------------------*/

 const updateUserprofile = asyncHandler( async (req,res)=>{
   const {error} = validateUpdateUserUser(req.body);
   if(error) return res.status(400).send(error.details[0].message);
   //if the user want to change password
   let newUserDetails={}
   if (req.body.username) newUserDetails.username = req.body.username;
   if (req.body.bio) newUserDetails.bio = req.body.bio;
   if(req.body.password){
      const salt = await bcrypt.genSalt(10);
      newUserDetails.password = await bcrypt.hash(req.body.password, salt);
   }
   
   const newUser = await User.findByIdAndUpdate(req.params.id, {
      //if he wan't to change one of them it will be ignored cause we removed the require() from the validate function
      $set: newUserDetails
    }, { new: true }).select("-password").populate("posts");//new :true to return the new object and bring his posts
   res.status(200).send(newUser);

})

/**---------------------------------
 * @desc get Number of docs
 * @route /api/users/count
 * @resquest get
 * @acess private for admin
 ------------------------------------*/

 const getNumberOfUsers = asyncHandler( async (req,res)=>{
   const nbUsers= await User.countDocuments();
   res.status(200).send({count:nbUsers});
})


/**---------------------------------
 * @desc upload profile photo
 * @route /api/users/profile/upload-profile-photo
 * @resquest put
 * @acess private for logged in
 ------------------------------------*/
 const __filename = new URL(import.meta.url).pathname;
 const __dirname = path.dirname(__filename);
 const uploadProfilePhoto = asyncHandler( async (req,res)=>{
   // 1-validation
   if(!req.file){
      return res.status(400).send("no file provided");
   }
   // 2- get the path of the image
   const imagePath = path.join("C:/Users/ASUS/Desktop/houssem/MERN/mern_social_media_app/server/middlewares",`../images/${req.file.filename}`);
   
   // 3- upload image to cloudinary
   //const result = await cloudinaryUploadImage(req.file.path)
   const result = await cloudinaryUploadImage(imagePath)
   //console.log(result);
   //console.log(req.user);
   // 4- get user from DB
   const user= await User.findById(req.user.id);  // le user est arrivé de la middleware verifyToken qui contient id,isAdmin
   //console.log(user);
   // 5- delete the old profilePhoto if exists
   if(user.profilePhoto.publicId!==null){
      cloudinaryRemoveImage(user.profilePhoto.publicId);
   }
   // 6- change the profilePhoto
   user.profilePhoto = {
      url : result.secure_url,
      publicId : result.public_id
   };

   //console.log(user);
   await user.save();
    
   
   // 7- remove image from the server 
   fs.unlinkSync(imagePath);
   

   // 8- send response to the user
   return res.status(200).send({message:"profile photo uploaded seccessfully",
                                profilePhoto : {url:result.secure_url,publicId:result.public_id}
                              });
    
   
   
})

/**---------------------------------
 * @desc Delete user profile
 * @route /api/users/profile/:id
 * @resquest Delete
 * @acess private for admin or user himself
 ------------------------------------*/
 const deleteUserProfile= asyncHandler(async (req,res)=>{
   const user= await User.findById(req.params.id);
   if (!user) return res.status(404).send("User is not found");
   //get all posts from db that concern this user
   const posts=await Post.find({user:user._id});
   //get  public id of each post in an array to remove them 
   const publicIds=posts?.map((post)=> post.image.publicId); 
   if(user.profilePhoto.publicId!==null){
      await cloudinaryRemoveImage(user.profilePhoto.publicId);
   }
   
   if(publicIds?.length>0){
      await cloudinaryRemoveManyImages(publicIds);
   }
   await Post.deleteMany({user:user._id});
   await Comment.deleteMany({user:user._id});
   await User.findByIdAndDelete(req.params.id);
   return res.status(200).send(`${user.username} is deleted successfully`)
 })

export {getAllUsers,getUserProfile,updateUserprofile,getNumberOfUsers,uploadProfilePhoto,deleteUserProfile};

