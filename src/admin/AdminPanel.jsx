import React, { useState } from "react";
import "../assets/style/AdminPanel.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
const navigate = useNavigate();
const token = localStorage.getItem("token");

const [nama_lengkap, setNama_lengkap] = useState("");
const [username, setUsername] = useState("");
const [no_tel, setNo_tel] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleSubmit = (e) => {
e.preventDefault(); 


if (!nama_lengkap || !username || !no_tel || !email || !password) {
  alert("Semua field harus diisi!");
  return;
}

axios.post( "http://localhost:3000/api/users",
    { nama_lengkap, username, no_tel, email, password },
    { headers: { Authorization: `Bearer ${token}` } }
  )
  .then(() => {
    setNama_lengkap("");
    setUsername("");
    setNo_tel("");
    setEmail("");
    setPassword("");

    // pindah ke halaman manage-user
    navigate("/dashboard/manage-user");
  })
  .catch((err) => {
    console.error(err.response?.data || err);
    alert("Gagal tambah user!");
  });

};

return ( <div className="admin-container"> <aside className="sidebar"> <div className="sidebar-header"> <img src="/logoooo.png" alt="logo" className="logo" /> <span className="admin-text">ADMIN</span> </div>

    <div className="logout-section">
      <span className="logout-text">Logout</span>
    </div>
  </aside>

  <main className="main-content">
    <header className="topbar">
      <span className="topbar-title">User</span>
    </header>

    <div className="form-container">
      <h2 className="form-title">Tambah user</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="input-box"
          placeholder="Nama lengkap"
          value={nama_lengkap}
          onChange={(e) => setNama_lengkap(e.target.value)}
        />

        <input
          className="input-box"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="input-box"
          placeholder="Nomor Telepon"
          value={no_tel}
          onChange={(e) => setNo_tel(e.target.value)}
        />

        <input
          className="input-box"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input-box"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="confirm-button" type="submit">
          Konfirmasi
        </button>
      </form>
    </div>

    <footer className="footer">KEDAI GSWEET</footer>
  </main>
</div>

);
}
