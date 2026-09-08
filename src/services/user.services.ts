import { createUser, getAllUsers, getuserById ,updateUser,deleteUser} from "../repositories/user.repositories";
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
export const updateUserService=async(id:string,user:typeof userTypes)=>{
    return await updateUser(id,user);
}
export const deleteUserService=async(id:string)=>{
    return await deleteUser(id);
}