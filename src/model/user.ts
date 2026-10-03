import mongoose from "mongoose";
const userModel=new mongoose.Schema({
    name:{type:String,required:true},
    surname:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,default:"user"},
    isActive:{type:Boolean,default:true}
})
export default mongoose.model("User",userModel)