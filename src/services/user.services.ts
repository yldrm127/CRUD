import { createUser, getAllUsers, getuserById } from "../repositories/user.repositories";
import { userTypes } from "../types/user.types.ts";
export const createUserService=async(user:typeof userTypes)=>{
    return await createUser(user);
}

export const getAllUsersService=async()=>{
    return await getAllUsers();
}

export const getUserByIdService=async(id:string)=>{
    return await getuserById(id);
}