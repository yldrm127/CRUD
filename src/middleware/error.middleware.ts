import type { Request, Response, NextFunction } from "express";
import {AppError} from "../config/appError.js"; 
export const errorMiddleware = (
    error: AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(error);
    if(error instanceof AppError){
        console.error(error.message);
        return res.status(error.statuscode).json({
            error: error.message,
            data: null
        });
    }
    return res.status(500).json({
        error: "Unknown error occurred",
        data: null
    });
};