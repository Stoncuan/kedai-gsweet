import express from "express";
import {
  getMenu,
  addMenu,
  updateMenu,
  deleteMenu,
  getMenuById,
} from "../models/menuModel.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const router = express.Router();

// GET all menu items
router.get("/", (req, res) => {
  getMenu((err, results) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Error fetching menus", error: err });
    res.json(results);
  });
});

// Konfigurasi __dirname untuk ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Pastikan folder uploads ada dan path benar
const uploadDir = path.join(__dirname, "../uploads");
// Konfigurasi multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
// Filter file image
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);
    if (mimetype && extname) {
      cb(null, true);
    } else {
      cb(new Error("Only image files (jpg, jpeg, png) are allowed."));
    }
  },
});
router.post("/addMenu", upload.single("gambarMenu"), (req, res) => {
  console.log("===== ADD MENU =====");
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);

  const { namaMenu, hargaMenu, deskripsiMenu } = req.body;
  const gambarMenu = req.file ? req.file.filename : null;

  const data = {
    nama_menu: namaMenu,
    harga: hargaMenu,
    deskripsi: deskripsiMenu,
    gambar: gambarMenu,
  };

  addMenu(data, (err, result) => {
    if (err) {
      console.error("SQL ERROR:", err);
      return res.status(500).json({
        message: "Database error",
        error: err.sqlMessage || err,
      });
    }

    res.status(201).json({
      message: "Menu berhasil ditambahkan",
      id: result.insertId,
    });
  });
});

router.get("/getMenu/:id", (req, res) => {
  getMenuById(req.params.id, (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0)
      return res.status(404).json({ message: "Menu tidak ditemukan" });

    res.json(results[0]);
  });
});

router.put("/editMenu/:id", upload.single("gambarMenu"), (req, res) => {
  const { namaMenu, hargaMenu, deskripsiMenu } = req.body;
  const gambarBaru = req.file ? req.file.filename : null;

  getMenuById(req.params.id, (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0)
      return res.status(404).json({ message: "Menu tidak ditemukan" });

    const gambarLama = results[0].gambar;

    const data = {
      nama_menu: namaMenu,
      harga: hargaMenu,
      deskripsi: deskripsiMenu,
      gambar: gambarBaru || gambarLama,
    };

    updateMenu(data, req.params.id, (err) => {
      if (err) return res.status(500).json(err);

      // 🔥 hapus gambar lama jika upload baru
      if (gambarBaru && gambarLama) {
        const imagePath = path.join(__dirname, "../uploads", gambarLama);
        fs.unlink(imagePath, () => {});
      }

      res.json({ message: "Menu berhasil diperbarui" });
    });
  });
});

router.delete("/deleteMenu/:id", (req, res) => {
  const id = req.params.id;

  getMenuById(id, (err, results) => {
    if (err) return res.status(500).json({ message: "DB error", error: err });

    if (results.length === 0)
      return res.status(404).json({ message: "Menu tidak ditemukan" });

    const menu = results[0];
    const gambarMenu = menu.gambar; // sesuai DB kamu

    deleteMenu(id, (err) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Gagal hapus menu", error: err });

      if (gambarMenu) {
        const imagePath = path.join(__dirname, "../uploads", gambarMenu);
        console.log("Hapus gambar:", imagePath);

        fs.unlink(imagePath, (err) => {
          if (err) {
            if (err.code === "ENOENT") {
              console.warn("File gambar tidak ditemukan");
            } else {
              console.error("Gagal hapus gambar:", err);
            }
          } else {
            console.log("Gambar berhasil dihapus");
          }
        });
      }

      res.json({ message: "Menu & gambar berhasil dihapus" });
    });
  });
});

export default router;
