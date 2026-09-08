import userSchema from "../model/user.ts";
import { userTypes } from "../types/user.types.ts";
export const createUser=async(user:typeof userTypes)=>{
    try{
        const newUser=await userSchema.create(user);
        return newUser;
    }catch(error){
        throw error;    
    }
} 
export const getAllUsers=async()=>{
    try{
        const users=await userSchema.find();
        return users;
    }catch(error){
        throw error;    
    }
} 
export const getuserById=async(id:string)=>{
    try{
        const user=await userSchema.findById(id);
        return user;
    }catch(error){
        throw error;
    }
}