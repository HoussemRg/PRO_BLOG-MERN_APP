import AsyncHandler from "express-async-handler";
import { Category,validateCreateCategory } from "../models/Category.js";

/**---------------------------------
 * @desc create new category
 * @route /api/categories
 * @resquest post
 * @acess private only for admin 
 ------------------------------------*/

 const createCategory = AsyncHandler(async (req,res)=>{
    const {error}=validateCreateCategory(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const category=await Category.create({
        user:req.user.id,
        title:req.body.title,
    });
    return res.status(201).send(category);
 })

 /**---------------------------------
 * @desc get all categories
 * @route /api/categories
 * @resquest get
 * @acess public 
 ------------------------------------*/

 const getAllCategories = AsyncHandler(async (req,res)=>{
    const categories=await Category.find();
    res.status(200).send(categories);
 })

 /**---------------------------------
 * @desc delete  category
 * @route /api/categories/:id
 * @resquest delete
 * @acess private only for admin
 ------------------------------------*/

 const deleteCategory = AsyncHandler(async (req,res)=>{
    const category=await Category.findById(req.params.id);
    if(!category) return res.status(404).send("category not found");
    await Category.findByIdAndDelete(req.params.id);
    return res.status(200).send(category);
 })


 export {createCategory,getAllCategories,deleteCategory};