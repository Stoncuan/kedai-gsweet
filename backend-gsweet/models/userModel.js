const db = require("../config/db");

// Ambil user berdasarkan ID
exports.getUserById = (id, callback) => {
  db.query(
    "SELECT id, nama_lengkap, username, no_tel, email, password FROM tb_user WHERE id = ?",
    [id],
    callback
  );
};

// Update user berdasarkan ID
exports.updateUser = (id, data, callback) => {
  const { nama_lengkap, username, no_tel, email, password } = data;
  const fields = [];
  const values = [];

  if (nama_lengkap) {
    fields.push("nama_lengkap = ?");
    values.push(nama_lengkap);
  }
  if (username) {
    fields.push("username = ?");
    values.push(username);
  }
  if (no_tel) {
    fields.push("no_tel = ?");
    values.push(no_tel);
  }
  if (email) {
    fields.push("email = ?");
    values.push(email);
  }
  if (password) {
    fields.push("password = ?");
    values.push(password);
  }

  values.push(id);
  const sql = `UPDATE tb_user SET ${fields.join(", ")} WHERE id = ?`;
  db.query(sql, values, callback);
};

// Cari user berdasarkan email
exports.findUserByEmail = (email) => {
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

// Buat user baru
exports.createUser = (nama_lengkap, username, no_tel, email, password) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO tb_user (nama_lengkap, username, no_tel, email, password) VALUES (?, ?, ?, ?, ?)",
      [nama_lengkap, username, no_tel, email, password],
      (err, results) => {
        if (err) return reject(err);
        resolve(results);
      }
    );
  });
};
