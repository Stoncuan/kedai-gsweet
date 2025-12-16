import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import authRouter from "./Routers/authRouter.js";
import userRouter from "./Routers/userRouter.js";
import menuRouter from "./Routers/menuRouter.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serving static files untuk uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routing API
app.use("/login", authRouter);
app.use("/users", userRouter);
app.use("/menu", menuRouter);

app.listen(5000, () => console.log("Server running on port 5000"));
