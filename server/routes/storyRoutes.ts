import { Router } from "express";
import updload from "../middlewares/upload.js";
import { createStory, getStories } from "../controllers/storyController.js";
import { authMiddleware } from "../middlewares/auth.js";

const storyRouter = Router();

storyRouter.use(authMiddleware);

storyRouter.post("/", updload.single("file"), createStory);
storyRouter.get("/", getStories);

export default storyRouter;