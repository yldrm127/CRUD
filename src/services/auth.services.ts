import { AppError } from "../config/appError.js";
import {createUser,getUserByEmail} from "../repositories/user.repositories.js"
import type { userSchema } from "../types/user.types.js";
import bcrypt from "bcrypt"
import { z } from "zod";
import jwt from "jsonwebtoken";

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
     const accessSecret = process.env.JWT_ACCESS_SECRET;
    const refreshSecret = process.env.JWT_REFRESH_SECRET;

    if (!accessSecret || !refreshSecret) {
        throw new Error("JWT secrets are not configured");
    }

    const payload = {
        userId: userData._id.toString(),
        role: userData.role
    };

    const accessToken = jwt.sign(
        payload,
        accessSecret,
        { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
        payload,
        refreshSecret,
        { expiresIn: "7d" }
    );

     return {
        user: {
      
            name: userData.name,
            surname: userData.surname,
            email: userData.email,
            role: userData.role,
            isActive: userData.isActive
        },
        accessToken,
        refreshToken
    };
};

export const loginServices = async (
    email: string,
    password: string
) => {
    const user = await getUserByEmail(email);

    if (!user || !user.password) {
        throw new AppError("Invalid email or password", 401);
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordCorrect) {
        throw new AppError("Invalid email or password", 401);
    }

    const accessSecret = process.env.JWT_ACCESS_SECRET;
    const refreshSecret = process.env.JWT_REFRESH_SECRET;

    if (!accessSecret || !refreshSecret) {
        throw new Error("JWT secrets are not configured");
    }

    const payload = {
        userId: user.id.toString(),
        role: user.role
    };

    const accessToken = jwt.sign(
        payload,
        accessSecret,
        { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
        payload,
        refreshSecret,
        { expiresIn: "7d" }
    );

    return {
        user: {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            role: user.role,
            isActive: user.isActive
        },
        accessToken,
        refreshToken
    };
};