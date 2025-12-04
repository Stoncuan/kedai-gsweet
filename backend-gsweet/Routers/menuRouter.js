import express from "express";
import {
  getMenu,
  addMenu,
  updateMenu,
  deleteMenu,
  getMenuById,
} from "../models/menuModel.js";

import bcrypt from "bcrypt";
const router = express.Router();

router.get("/", (req, res) => {
  getMenu((err, results) => res.json(results));
});

router.get("/:id", (req, res) => {
  getMenuById(req.params.id, (err, results) => res.json(results));
});

router.post("/tambahMenu", async (req, res) => {
  const { ...data } = req.body;

  addMenu({ ...data }, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Menu berhasil ditambahkan!" });
  });
});

router.put("/editMenu/:id", (req, res) => {
  updateMenu(req.body, req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Menu berhasil diperbarui!" });
  });
});

router.delete("/deleteMenu/:id", (req, res) => {
  deleteMenu(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Menu berhasil dihapus!" });
  });
});

export default router;
