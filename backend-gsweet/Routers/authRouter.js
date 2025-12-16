import express from "express";
import bcrypt from "bcryptjs";
import { findUserByUsername } from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ msg: "Username dan password wajib diisi" });

  try {
    const user = await findUserByUsername(username);
    if (!user) return res.status(400).json({ msg: "Username tidak ditemukan" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Password salah" });

    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user.id,
        nama_lengkap: user.nama_lengkap,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
