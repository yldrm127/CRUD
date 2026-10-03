import type { RequestHandler } from "express";
import { error } from "node:console";
export const asyncHandler=(fn:RequestHandler):RequestHandler=>{
  return (req,res,next)=>{
    Promise.resolve(fn(req,res,next)).catch(next)
  }
} 