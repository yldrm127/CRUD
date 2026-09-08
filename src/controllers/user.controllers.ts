import {getAllUsersService,getUserByIdService,createUserService,updateUserService,deleteUserService} from "../services/user.services";
import {Response,Request} from "express";
import type {ApiResponse} from "../types/response.types";
import type {userTypes} from "../types/user.types";
import {MESSAGE} from "../enums/message.enums";
export const createUserController=async(req:Request,res:Response)=>{
    try{
        const user=await createUserService(req.body);
        res.status(201).json(user);
    }catch(error){
        const response: ApiResponse<userTypes> = {
            message: MESSAGE.ERROR_CREATING_USER,
            data:null
        }
        res.status(500).json(response);
    }
}
export const getAllUsersController=async(req:Request,res:Response)=>{
    try{
        const users=await getAllUsersService();
        res.status(200).json(users);
    }catch(error){
        const response: ApiResponse<userTypes> = {
            message: MESSAGE.ERROR_GETTING_USERS,
            data:null
        }
        res.status(500).json(response);
    }
}
export const getUserByIdController=async(req:Request,res:Response)=>{
    try{
        const user=await getUserByIdService(String(req.params.id));
        if(!user){
            const response: ApiResponse<userTypes> = {
                message: MESSAGE.USER_NOT_FOUND,
                data:null
            }
            return res.status(404).json(response);
        }
        res.status(200).json(user);
    }catch(error){
        const response: ApiResponse<userTypes> = {
            message: MESSAGE.SERVER_ERROR,
            data:null
        }
        res.status(500).json(response);
    }
}
export const updateUserController=async(req:Request,res:Response)=>{
    try{
        const updatedUser=await updateUserService(String(req.params.id),req.body);
        if(!updatedUser){
            const response: ApiResponse<userTypes> = {
                message: MESSAGE.USER_NOT_FOUND,
                data:null
            }
            return res.status(404).json(response);
        }
        res.status(200).json(updatedUser);
    }catch(error){
        const response: ApiResponse<userTypes> = {
            message: MESSAGE.SERVER_ERROR,
            data:null
        }
        res.status(500).json(response);
    }
}
export const deleteUserController=async(req:Request,res:Response)=>{
    try{
        const deletedUser=await deleteUserService(String(req.params.id));
        if(!deletedUser){
            const response: ApiResponse<userTypes> = {
                message: MESSAGE.USER_NOT_FOUND,
                data:null
            }
            return res.status(404).json(response);
        }
        res.status(200).json(deletedUser);
    }catch(error){
        const response: ApiResponse<userTypes> = {
            message: MESSAGE.SERVER_ERROR,
            data:null
        }
        res.status(500).json(response);
    }
}   