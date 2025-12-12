import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url'; // For converting meta URL to file path
import { getMenu, addMenu, updateMenu, deleteMenu, getMenuById } from "../models/menuModel.js";

const router = express.Router();

// Get the current directory (__dirname equivalent in ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Make sure the 'uploads' folder exists
const uploadDir = path.join(__dirname, "../uploads");

// Multer configuration to store images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Store the images in the 'uploads' folder
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Generate a unique file name using timestamp
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Optional: Limit file size to 5MB
  fileFilter: function (req, file, cb) {
    const fileTypes = /jpeg|jpg|png/;  // Only allow certain file types
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files (jpg, jpeg, png) are allowed."));
    }
  },
});

// GET all menu items
router.get("/", (req, res) => {
  getMenu((err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching menus", error: err });
    res.json(results);
  });
});

// POST to add a new menu item
router.post("/tambahMenu", upload.single("gambarMenu"), async (req, res) => {
  const { namaMenu, hargaMenu, deskripsiMenu } = req.body;

  // Get the filename of the uploaded image
  const gambarMenu = req.file ? req.file.filename : null;

  if (!namaMenu || !hargaMenu || !deskripsiMenu || !gambarMenu) {
    return res.status(400).json({ message: "Data tidak lengkap!" });
  }

  // Create the menu data object
  const menuData = { namaMenu, hargaMenu, deskripsiMenu, gambarMenu };

  // Add the menu data to the database
  addMenu(menuData, (err) => {
    if (err) {
      return res.status(500).json({ message: "Error adding menu", error: err });
    }
    res.json({ message: "Menu berhasil ditambahkan!" });
  });
});

// PUT to update an existing menu item
router.put("/editMenu/:id", upload.single("gambarMenu"), (req, res) => {
  const { namaMenu, hargaMenu, deskripsiMenu } = req.body;
  const gambarMenu = req.file ? req.file.filename : null;

  const menuData = { namaMenu, hargaMenu, deskripsiMenu, gambarMenu };

  updateMenu(menuData, req.params.id, (err) => {
    if (err) return res.status(500).json({ message: "Error updating menu", error: err });
    res.json({ message: "Menu berhasil diperbarui!" });
  });
});

// DELETE a menu item
router.delete("/deleteMenu/:id", (req, res) => {
  deleteMenu(req.params.id, (err) => {
    if (err) return res.status(500).json({ message: "Error deleting menu", error: err });
    res.json({ message: "Menu berhasil dihapus!" });
  });
});

export default router;
