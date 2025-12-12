import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import loginRouter from "./Routers/loginRouter.js";
import userRouter from "./Routers/userRouter.js";
import menuRouter from "./Routers/menuRouter.js";
import path from 'path';
// Get the current directory (__dirname equivalent in ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/login", loginRouter);
app.use("/users", userRouter);
app.use("/menu", menuRouter);


app.listen(5000, () => console.log("Server running on port 5000"));
// Menyajikan file statis (gambar) dari folder 'uploads/'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));