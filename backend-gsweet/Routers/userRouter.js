import express from "express";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../models/userModel.js";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../model/userModel.js";
import bcrypt from "bcrypt";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// GET semua user
router.get("/", verifyToken, (req, res) => {
  getUsers((err, results) => res.json(results));
});

// POST tambah user (password otomatis hash)
router.post("/", verifyToken, async (req, res) => {
  const { password, ...data } = req.body;
  const hashPass = await bcrypt.hash(password, 10);

  addUser({ ...data, password: hashPass }, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "User berhasil ditambahkan!" });
  });
});

// PUT update user
router.put("/:id", verifyToken, (req, res) => {
  updateUser(req.body, req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "User berhasil diperbarui!" });
  });
});

// DELETE user
router.delete("/:id", verifyToken, (req, res) => {
  deleteUser(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "User berhasil dihapus!" });
  });
});

export default router;
