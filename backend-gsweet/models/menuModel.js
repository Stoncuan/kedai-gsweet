import db from "../config/db.js";

export const getMenu = callback => {
  db.query("SELECT * FROM tb_menu", callback);
};

export const getMenuById = (id, callback) => {
  db.query("SELECT * FROM tb_menu WHERE id = ?", [id], callback);
};


export const addMenu = (data, callback) => {
  db.query("INSERT INTO tb_menu SET ?", data, callback);
};

export const updateMenu = (data, id, callback) => {
  db.query("UPDATE tb_menu SET ? WHERE id = ?", [data, id], callback);
};

export const deleteMenu = (id, callback) => {
  db.query("DELETE FROM tb_menu WHERE id = ?", [id], callback);
};