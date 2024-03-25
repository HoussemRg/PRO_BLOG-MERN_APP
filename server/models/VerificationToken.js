import mongoose from "mongoose";


const verificationTokenSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    token:{
        type:String,
        required:true,
    }
});



const VerificationTokenModel = mongoose.model('VerificationToken',verificationTokenSchema);

export {VerificationTokenModel};