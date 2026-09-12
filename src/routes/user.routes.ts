import { createUserController, deleteUserController, getAllUsersController, getUserByIdController, updateUserController } from "../controllers/user.controllers.js";
import express from "express";
const router =express.Router();
router.post("/", async (req, res) => {
    await createUserController(req, res);
});
router.get("/", async (req, res) => {
    await getAllUsersController(req, res);
});
router.get("/:id", async (req, res) => {
    await getUserByIdController(req, res);
});
router.put("/:id", async (req, res) => {
    await updateUserController(req, res);
});
router.delete("/:id", async (req, res) => {
    await deleteUserController(req, res);
});
export default router;

