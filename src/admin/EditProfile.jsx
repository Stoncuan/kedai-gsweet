import React, { useState } from "react";
import "../assets/style/EditProfile.css";
import {FaUser, FaPhone,FaLock, FaEnvelope, FaSignOutAlt,FaTachometerAlt,FaUsers,FaListAlt,} from "react-icons/fa";
import axios from "axios";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    nama_lengkap: "",
    username: "",
    no_tel: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.put("http://localhost:3000/api/profile", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    alert("Data berhasil disimpan: " + res.data.msg); // backend kirim msg, bukan message
  } catch (err) {
    console.error("Update error:", err.response?.data || err.message);
    alert("Gagal menyimpan data!");
  }
};

  return (
    <div className="editpage-container">
      <aside className="sidebar">
        <div className="sidebar-logo-header">
          <div className="logo-admin-wrapper">
            <img src="/logoooo.png" alt="logo" className="logo-img" />
            <div className="admin-text">ADMIN</div>
          </div>
        </div>

        <nav className="sidebar-menu">
          <a href="#" className="menu-dashboard">
            <div className="menu-icon" /> Dashboard
          </a>
          <a href="#" className="menu-item">
            <div className="menu-icon" /> Manage User
          </a>
          <a href="#" className="menu-item">
            <div className="menu-icon" /> Manage Datalist
          </a>
        </nav>

        <div className="sidebar-bottom">
          <a href="#" className="logout-btn">
            Logout <FaSignOutAlt className="logout-icon" />
          </a>
        </div>
      </aside>

      <div className="main-content">
        <header className="topbar">
          <div></div>
          <div className="topbar-user">
            <div className="user-btn-label">User</div>
            <div className="user-icon">
              <FaUser className="user-fa-icon" />
            </div>
          </div>
        </header>

        <main className="editprofile-main">
          <h2>Edit profile</h2>
          <div className="profile-avatar">
            <FaUser className="large-avatar-icon" />
          </div>

          <form className="editprofile-form" onSubmit={handleSubmit}>
            <div className="input-group pink-input">
              <FaUser className="icon" />
              <input type="text" name="nama_lengkap" placeholder="Nama lengkap" value={formData.nama_lengkap} onChange={handleChange}
              />
            </div>

            <div className="input-group pink-input">
              <FaEnvelope className="icon" />
              <input type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="input-group pink-input">
              <FaPhone className="icon" />
              <input
                type="text"
                name="no_tel"
                placeholder="Nomor Telepon"
                value={formData.no_tel}
                onChange={handleChange}
              />
            </div>

            <div className="input-group pink-input">
              <FaLock className="icon" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            

            <button type="submit" className="btn-confirm">
              Konfirmasi
            </button>
            
          </form>
        </main>

        <footer className="main-footer">KEDAI GSWEET</footer>
      </div>
    </div>
  );
}