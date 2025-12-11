import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/style/ManageUser.css";
import { FiUser } from "react-icons/fi";
import { FaSignOutAlt } from "react-icons/fa";
import { FiInfo, FiEdit, FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Fetch user list
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Fetch user error:", err));
  }, [token]);

  // Delete user
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setUsers((prev) => prev.filter((u) => u.id !== id));
      })
      .catch((err) => console.error("Delete error:", err));
  };

  return (
    <div className="container-manageuser">
      {/* SIDEBAR */}
      <div className="sidebar">
        <div className="sidebar-logo">
          <img src="/logoooo.png" alt="logo" className="logo-img" />
          <span className="admin-text">ADMIN</span>
        </div>

        <div className="sidebar-menu">
          <p className="menu-title">Dashboard</p>
          <button className="menu-item active">Manage User</button>
          <button className="menu-item">Manage Datalist Menu</button>
        </div>

        <div className="logout-section">
          <span className="logout-text">Logout</span>
          <FaSignOutAlt className="logout-icon" />
        </div>
      </div>

      {/* MAIN AREA */}
      <div className="main-content">
        {/* TOPBAR */}
        <div className="topbar">
          <div className="topbar-right">
            <span className="topbar-username">User</span>
            <div className="topbar-icon">
              <FiUser size={22} />
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="content-box">
          <h2 className="title-manage">Manage User</h2>

          <button
            className="tambah-user-btn"
            onClick={() => navigate("/dashboard/add-user")}
          >
            Tambah user
          </button>

          {/* TABLE */}
          <table className="user-table">
            <thead>
              <tr>
                <th className="th-username">Username ↕</th>
                <th className="th-action">Action ↕</th>
              </tr>
            </thead>

            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <input type="checkbox" className="checkbox" />
                      <span className="username-text">{user.username}</span>
                    </td>
                    <td className="action-icons">
                      <FiInfo className="icon info" />
                      <FiEdit className="icon edit" />
                      <FiTrash
                        className="icon delete"
                        onClick={() => handleDelete(user.id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">Tidak ada user.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="footer">
          <span>KEDAI GSWEET</span>
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
