import express from "express";
import {
  getUser,
  addUser,
  updateUser,
  deleteUser,
  getUserById,
} from "../models/userModel.js";  // Mengimpor fungsi dari model user

import bcrypt from "bcrypt";  // Menggunakan bcrypt untuk hashing password

const router = express.Router();

// Get all users
router.get("/", (req, res) => {
  getUser((err, results) => {
    if (err) return res.status(500).json({ msg: "Error fetching users", error: err });
    res.json(results);
  });
});

// Get user by ID
router.get("/:id", (req, res) => {
  getUserById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ msg: "Error fetching user", error: err });
    res.json(results);
  });
});

// Add a new user
router.post("/addUser", async (req, res) => {
  const { nama_lengkap, username, no_tel, email, password } = req.body;

  // Validasi input
  if (!nama_lengkap || !username || !no_tel || !email || !password) {
    return res.status(400).json({ msg: "Data tidak lengkap!" });
  }

  try {
    // Hash password sebelum menyimpannya
    const hashedPassword = await bcrypt.hash(password, 10);

    // Menyimpan user baru
    addUser({ nama_lengkap, username, no_tel, email, password: hashedPassword }, (err) => {
      if (err) return res.status(500).json({ msg: "Error adding user", error: err });
      res.json({ message: "User berhasil ditambahkan!" });
    });
  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
});

// Update user by ID
router.put("/editUser/:id", (req, res) => {
  updateUser(req.body, req.params.id, (err) => {
    if (err) return res.status(500).json({ msg: "Error updating user", error: err });
    res.json({ message: "User berhasil diperbarui!" });
  });
});

// Delete user by ID
router.delete("/deleteUser/:id", (req, res) => {
  deleteUser(req.params.id, (err) => {
    if (err) return res.status(500).json({ msg: "Error deleting user", error: err });
    res.json({ message: "User berhasil dihapus!" });
  });
});

export default router;
