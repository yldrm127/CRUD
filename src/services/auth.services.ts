import { AppError } from "../config/appError.js";
import {createUser,getUserByEmail} from "../repositories/user.repositories.js"
import type { userSchema } from "../types/user.types.js";
import bcrypt from "bcrypt"
import { z } from "zod";
export const registerService = async (user: z.infer<typeof userSchema>) => {
    const hashPassword= await bcrypt.hash(user.password, 10);
    const getUserEmail=await getUserByEmail(user.email)
    if(getUserEmail){
        throw new AppError("Email already exists",400)
    }
    const userData= await createUser({
        ...user,
        password:hashPassword
    })
     return {
        id: userData._id,
        name: userData.name,
        surname: userData.surname,
        email: userData.email,
        role: userData.role,
        isActive: userData.isActive
    };
};
export const loginServices=async(email:string,password:string)=>{
    const user=await getUserByEmail(email)
  if (!user) {
    throw new AppError("Invalid email or password", 401);
}
const isPasswordCorrect=await bcrypt.compare(password,user.password)
if (!isPasswordCorrect) {
    throw new AppError("Invalid email or password", 401);
}
}