import db from "../config/db.js";

export const getUsers = callback => {
  db.query("SELECT * FROM users", callback);
};

export const getUserByUsername = (email, callback) => {
  db.query("SELECT * FROM users WHERE email = ?", [email], callback);
};

export const addUser = (data, callback) => {
  db.query("INSERT INTO users SET ?", data, callback);
};

export const updateUser = (data, id, callback) => {
  db.query("UPDATE users SET ? WHERE id = ?", [data, id], callback);
};

export const deleteUser = (id, callback) => {
  db.query("DELETE FROM users WHERE id = ?", [id], callback);
};
