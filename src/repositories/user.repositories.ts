import userSchema from "../model/user.js";
import type { userTypes } from "../types/user.types.js";
export const createUser=async(user: userTypes)=>{
    try{
        const newUser=await userSchema.create(user);
        return newUser;
    }catch(error){
        throw error;    
    }
} 
export const getAllUsers=async()=>{
    try{
        const users=await userSchema.find({isActive:true});
        return users;
    }catch(error){
        throw error;    
    }
} 
export const getuserById=async(id:string)=>{
    try{
        const user=await userSchema.findById(id).where({isActive:true});
        return user;
    }catch(error){
        throw error;
    }
}
export const updateUser=async(id:string,user:userTypes)=>{
    try{
        const updatedUser=await userSchema.findByIdAndUpdate(id,user,{new:true});
        return updatedUser;
    }catch(error){
        throw error;
    }
}
export const deleteUser=async(id:string)=>{
    try{
        const deletedUser=await userSchema.findByIdAndUpdate(id,{isActive:false},{new:true});
        return deletedUser;
    }catch(error){
        throw error;
    }
}
