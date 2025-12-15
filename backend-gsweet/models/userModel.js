import db from "../config/db.js";

// =====================
// CRUD LAMA (tetAP)
// =====================

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
  db.query("INSERT INTO tb_user SET ?", data, callback);
};

// Memperbarui user berdasarkan ID
export const updateUser = (data, id, callback) => {
  db.query("UPDATE tb_user SET ? WHERE id = ?", [data, id], callback);
};

// Menghapus user berdasarkan ID
export const deleteUser = (id, callback) => {
  db.query("DELETE FROM tb_user WHERE id = ?", [id], callback);
};

// =====================
// FUNGSI UNTUK LOGIN
// =====================

// Cari user berdasarkan email (ASYNC)
export const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM tb_user WHERE email = ?",
      [email],
      (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      }
    );
  });
};

// (OPSIONAL) Tambah user async
export const createUser = (data) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO tb_user SET ?",
      data,
      (err, result) => {
        if (err) return reject(err);
        resolve(result.insertId);
      }
    );
  });
};
