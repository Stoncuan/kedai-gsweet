import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import loginRouter from "./Routers/loginRouter.js";
import userRouter from "./Routers/userRouter.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/login", loginRouter);
app.use("/users", userRouter);

app.listen(5000, () => console.log("Server running on port 5000"));
