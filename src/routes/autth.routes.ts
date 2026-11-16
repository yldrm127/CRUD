import express from "express"
import {loginController,registerController} from "../controllers/auth.controllers.js"
import { authMiddleware } from "../middleware/auth.middleware.js"
const router=express.Router()

router.post("/login", authMiddleware,async(req,res)=>{
  await loginController(req,res)
})
router.post("/register",async(req,res)=>{
 await registerController(req,res)
})
export default router