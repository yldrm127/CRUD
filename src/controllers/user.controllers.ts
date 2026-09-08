import {getAllUsersService,getUserByIdService,createUserService,updateUserService,deleteUserService} from "../services/user.services";

export const createUserController=async(req:any,res:any)=>{
    try{
        const user=await createUserService(req.body);
        res.status(201).json(user);
    }catch(error){
        res.status(500).json({message:error instanceof Error ? error.message : String(error)});
    }
}
export const getAllUsersController=async(req:any,res:any)=>{
    try{
        const users=await getAllUsersService();
        res.status(200).json(users);
    }catch(error){
        res.status(500).json({message:error instanceof Error ? error.message : String(error)});
    }
}
export const getUserByIdController=async(req:any,res:any)=>{
    try{
        const user=await getUserByIdService(req.params.id);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({message:error instanceof Error ? error.message : String(error)});
    }
}
export const updateUserController=async(req:any,res:any)=>{
    try{
        const updatedUser=await updateUserService(req.params.id,req.body);
        if(!updatedUser){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json(updatedUser);
    }catch(error){
        res.status(500).json({message:error instanceof Error ? error.message : String(error)});
    }
}
export const deleteUserController=async(req:any,res:any)=>{
    try{
        const deletedUser=await deleteUserService(req.params.id);
        if(!deletedUser){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json(deletedUser);
    }catch(error){
        res.status(500).json({message:error instanceof Error ? error.message : String(error)});
    }
}   