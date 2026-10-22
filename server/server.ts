import "dotenv/config";
import express, {NextFunction, Request, Response} from 'express';
import cors from "cors";
import connectDB from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import storyRouter from "./routes/storyRoutes.js";
import http from 'http';
import { initSocketServer } from "./socket/socketManager.js";

const app = express();

// connect to mongodb
await connectDB();

// middleware
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send("Server is live");
});

app.use("/api/users", userRouter);
app.use("/api/messages", messageRouter);
app.use("/api/stories", storyRouter);

// error handle
app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error(error);
    res.status(500).json({
        success: false,
        message: error?.message || "Something went wrong"
    });
})

// HTTP server and attach websocket
const server = http.createServer(app);
initSocketServer(server);

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})