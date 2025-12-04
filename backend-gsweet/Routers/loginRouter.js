import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUserByUsername } from "../models/userModel.js";


const router = express.Router();

router.post("/", (req, res) => {
  const { username, password } = req.body;

  getUserByUsername(username, async (err, results) => {
    if (results.length === 0)
      return res.status(400).json({ message: "Username tidak ditemukan!" });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Password salah!" });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login sukses!",
      token,
      user: {
        id: user.id,
        nama_lengkap: user.nama_lengkap,
        username: user.username,
        email: user.email,
        no_tel: user.no_tel,
      },
    });
  });
});

export default router;
