import {getAllUsersService,getUserByIdService,createUserService,updateUserService,deleteUserService} from "../services/user.services.js";
import type { Response, Request } from "express";
import {userSchema} from "../types/user.types.js";
import {MESSAGE} from "../enums/message.enums.js";
import { AppError } from "../config/appError.js";
export const createUserController = async (
    req: Request,
    res: Response
) => {

    const isValid = userSchema.safeParse(req.body);

    if (!isValid.success) {
        throw new AppError(
            MESSAGE.VALIDATION_ERROR,
            400
        );
    }

    const user = await createUserService(req.body);
    return res.status(201).json(user);
};
export const getAllUsersController=async(req:Request,res:Response)=>{
        const users=await getAllUsersService();
        res.status(200).json(users);
}
export const getUserByIdController=async(req:Request,res:Response)=>{
        const user=await getUserByIdService(String(req.params.id));
        if(!user){
            throw new AppError(MESSAGE.USER_NOT_FOUND,404);
        }
        res.status(200).json(user);
    
       
}
export const updateUserController=async(req:Request,res:Response)=>{
    const isValid= userSchema.safeParse(req.body);
        if(!isValid.success){
            throw new AppError(MESSAGE.VALIDATION_ERROR,400);
        }
    
        const updatedUser=await updateUserService(String(req.params.id),req.body);
        if(!updatedUser){
            throw new AppError(MESSAGE.USER_NOT_FOUND,404);
        }
        res.status(200).json(updatedUser);   
}
export const deleteUserController=async(req:Request,res:Response)=>{
   
        const deletedUser=await deleteUserService(String(req.params.id));
        if(!deletedUser){
            throw new AppError(MESSAGE.USER_NOT_FOUND,404);
        }
        res.status(200).json(deletedUser);
}   