import type { z } from "zod";
import { userSchema }from "../types/user.types.js";
import userModel from "../model/user.js";
import { AppError } from "../config/appError.js";
export const createUser=async(user: z.infer<typeof userSchema>)=>{
  
        const newUser=await userModel.create({
            ...user,
            role: user.role ?? "user",
            isActive: user.isActive ?? true,
        });
        return newUser;
 
} 
export const getAllUsers=async()=>{
    try{
        const users=await userModel.find({isActive:true});
        return users;
    }catch(error){
        throw new AppError("Error fetching users",500);    
    }
} 
export const getuserById=async(id:string)=>{
    try{
        const user=await userModel.findById(id).where({isActive:true});
        return user;
    }catch(error){
        throw new AppError("Error fetching user",500);
    }
}
export const updateUser=async(id:string,user:z.infer<typeof userSchema>)=>{
    try{
        const updatedUser=await userModel.findByIdAndUpdate(id,user,{new:true});
        return updatedUser;
    }catch(error){
        throw new AppError("Error updating user",500);
    }
}
export const deleteUser=async(id:string)=>{
    try{
        const deletedUser=await userModel.findByIdAndUpdate(id,{isActive:false},{new:true});
        return deletedUser;
    }catch(error){
        throw new AppError("Error deleting user",500);
    }
}
export const getUserByEmail=async(email:string)=>{
   
        const user=await userModel.findOne({email:email})
        return user
    
}
