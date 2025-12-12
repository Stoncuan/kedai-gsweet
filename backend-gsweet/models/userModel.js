import db from "../config/db.js"; // Mengimpor koneksi database

// Mendapatkan semua user
export const getUser = (callback) => {
  db.query(
    "SELECT id, nama_lengkap, username, no_tel, email FROM tb_user",
    callback
  );
};

// Mendapatkan user berdasarkan ID
export const getUserById = (id, callback) => {
  db.query(
    "SELECT id, nama_lengkap, username, no_tel, email FROM tb_user WHERE id = ?",
    [id],
    callback
  );
};

// Menambahkan user baru
export const addUser = (data, callback) => {
  db.query("INSERT INTO tb_user SET ?", data, callback); // Menambahkan data user ke dalam database
};

// Memperbarui user berdasarkan ID
export const updateUser = (data, id, callback) => {
  db.query("UPDATE tb_user SET ? WHERE id = ?", [data, id], callback); // Memperbarui data user
};

// Menghapus user berdasarkan ID
export const deleteUser = (id, callback) => {
  db.query("DELETE FROM tb_user WHERE id = ?", [id], callback); // Menghapus user dari database
};
