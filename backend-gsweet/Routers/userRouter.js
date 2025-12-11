const express = require("express");
const router = express.Router();
const { getUserById, updateUser } = require("../models/modelUser");
const verifyToken = require("../middlewares/verifyToken");
const bcrypt = require("bcryptjs");
const db = require("../config/db");

router.get("/profile", verifyToken, (req, res) => {
  getUserById(req.user.id, (err, results) => {
    if (err) return res.status(500).json({ msg: "DB error" });
    res.json(results[0]);
  });
});

//edit
router.put("/profile", verifyToken, async (req, res) => {
  const data = { ...req.body };
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  updateUser(req.user.id, data, (err) => {
    if (err) return res.status(500).json({ msg: "Update gagal" });
    res.json({ msg: "Profil berhasil diperbarui" });
  });
});

router.get("/users", verifyToken, (req, res) => {
  db.query(
    "SELECT id, nama_lengkap, username, no_tel, email FROM tb_user",
    (err, results) => {
      if (err) {
        console.error("DB error:", err);
        return res.status(500).json({ msg: "DB error", error: err });
      }
      res.json(results);
    }
  );
});

//tambah user
router.post("/users", verifyToken, async (req, res) => {
  const { nama_lengkap, username, no_tel, email, password } = req.body;
  console.log("Data diterima:", req.body);

  if (!nama_lengkap || !username || !no_tel || !email || !password) {
    return res.status(400).json({ msg: "Data tidak lengkap" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
      "INSERT INTO tb_user (nama_lengkap, username, no_tel, email, password) VALUES (?, ?, ?, ?, ?)",
      [nama_lengkap, username, no_tel, email, hashedPassword],
      (err, result) => {
        if (err) {
          console.error("DB error:", err);
          return res.status(500).json({ msg: "DB error", error: err });
        }
        res.json({
          id: result.insertId,
          nama_lengkap,
          username,
          no_tel,
          email,
        });
      }
    );
  } catch (error) {
    console.error("Hash error:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// DELETE user
router.delete("/users/:id", verifyToken, (req, res) => {
  db.query("DELETE FROM tb_user WHERE id = ?", [req.params.id], (err) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ msg: "DB error", error: err });
    }
    res.json({ msg: "User berhasil dihapus" });
  });
});

module.exports = router;
