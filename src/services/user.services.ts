import { createUser, getAllUsers, getuserById, updateUser, deleteUser } from "../repositories/user.repositories.js";
import type { userSchema} from "../types/user.types.ts";
import { z } from "zod";
import bcrypt from "bcrypt"
export const createUserService = async (user: z.infer<typeof userSchema>) => {
    const hashPassword= await bcrypt.hash(user.password, 10);
    const userData= await createUser({
        ...user,
        password:hashPassword
    })
    return userData;
};

export const getAllUsersService = async () => {
    return await getAllUsers();
};

export const getUserByIdService = async (id: string) => {
    return await getuserById(id);
};

export const updateUserService = async (id: string, user: z.infer<typeof userSchema>    ) => {
    return await updateUser(id, user);
};

export const deleteUserService = async (id: string) => {
    return await deleteUser(id);
};