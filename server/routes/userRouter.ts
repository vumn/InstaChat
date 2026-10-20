import { Router } from "express";
import { getProfile, getUsers, searchUsers, updateProfile } from "../controllers/userController.js";
import updload from "../middlewares/upload.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/search", searchUsers);
userRouter.get("/profile", getProfile);
userRouter.put("/profile", updload.single("avatar"), updateProfile);

export default userRouter;