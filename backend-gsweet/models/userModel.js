import db from "../config/db.js";

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

// update password saja
export const updateUserPassword = (password, id, callback) => {
  db.query(
    "UPDATE tb_user SET password = ? WHERE id = ?",
    [password, id],
    callback
  );
};

// =====================
// FUNGSI UNTUK LOGIN
// =====================

// cari user by username
export const findUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM tb_user WHERE username = ?",
      [username],
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
    db.query("INSERT INTO tb_user SET ?", data, (err, result) => {
      if (err) return reject(err);
      resolve(result.insertId);
    });
  });
};
