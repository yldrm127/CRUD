import express from "express";
import router from "./routes/user.routes.ts";
const app = express();
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
app.use(express.json());
app.use("/api/users", router);