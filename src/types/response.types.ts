import { z } from "zod";
export interface ApiResponse<T> {
    message: string;
    error?: string|z.ZodIssue[]|null;
    data: T|null;
}   