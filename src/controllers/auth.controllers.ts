import{loginServices,registerService} from "../services/auth.services.js"
import type { Request, Response } from "express";
import { userSchema } from "../types/user.types.js";
import { AppError } from "../config/appError.js";
import { MESSAGE } from "../enums/message.enums.js";
export const loginController= async(req:Request,res:Response,)=>{
    const { email, password } = req.body;
    const login=await loginServices(email,password)
    return res.status(200).json({
        message: "Login successful",
        data: login
    });
}
export const registerController = async (
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

    const user = await registerService(req.body);
    return res.status(201).json(user);
};