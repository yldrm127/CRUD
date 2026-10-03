import "dotenv/config";
import express from "express";
import router from "./routes/user.routes.js";
import { connectDB } from "./config/dataBase.js";
import app from "./app.js"
await connectDB();    
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
app.use(express.json());
app.use("/api/users", router);