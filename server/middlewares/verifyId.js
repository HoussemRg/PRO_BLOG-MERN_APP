import mongoose from "mongoose";

export const  validateId = (req,res,next)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send("invalid id");
    next();
}