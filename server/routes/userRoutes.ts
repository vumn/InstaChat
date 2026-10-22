import { Router } from "express";
import { getProfile, getUsers, searchUsers, updateProfile } from "../controllers/userController.js";
import updload from "../middlewares/upload.js";
import { authMiddleware } from "../middlewares/auth.js";

const userRouter = Router();

userRouter.use(authMiddleware);

userRouter.get("/", getUsers);
userRouter.get("/search", searchUsers);
userRouter.get("/profile",  getProfile);
userRouter.put("/profile", updload.single("avatar"), updateProfile);

export default userRouter;