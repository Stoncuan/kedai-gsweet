import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav, Image } from "react-bootstrap";
import { PersonCircle, BoxArrowRight } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../assets/style/Dasboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  // ===============================
  // AMBIL USER DARI TOKEN
  // ===============================
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUsername(decoded.username);
    } catch (error) {
      console.error("Token invalid");
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="page-wrapper">
      {/* ================= SIDEBAR ================= */}
      <aside className="sidebar">
        <div className="sidebar-logo-section">
         <Image
           src="/logoooo.png"
            className="sidebar-logo"
          />
          <span className="sidebar-admin">ADMIN</span>
        </div>

        <Nav className="flex-column sidebar-links">
          <Nav.Link className="link-item active-link">Dashboard</Nav.Link>
          <Nav.Link
            className="link-item"
            onClick={() => navigate("/dashboard/manage-user")}
          >
            Manage User
          </Nav.Link>
          <Nav.Link
            className="link-item"
            onClick={() => navigate("/dashboard/manage-datalist")}
          >
            Manage Menu
          </Nav.Link>
        </Nav>

        <Nav.Link className="logout-link" onClick={handleLogout}>
          Logout <BoxArrowRight />
        </Nav.Link>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <div className="main-content">
        {/* NAVBAR */}
        <Navbar className="top-navbar p-3">
          <Container fluid>
            <Navbar.Text className="header-title">Dashboard</Navbar.Text>

            {/* USER PROFILE */}
            <Nav
              className="ms-auto align-items-center gap-2"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/dashboard/profile")}
            >
              <span className="fw-semibold">{username}</span>
              <PersonCircle size={24} />
            </Nav>
          </Container>
        </Navbar>

        {/* ===== CENTER CONTENT ===== */}
        <Container
          fluid
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "calc(100vh - 120px)" }}
        >
          <div className="text-center">
            <h1 className="fw-bold text-danger mb-2">
              Selamat Datang, {username} 👋
            </h1>
            <p className="text-muted">
              Silakan kelola data aplikasi melalui menu di samping
            </p>
          </div>
        </Container>

        {/* FOOTER */}
        <footer className="footer text-center py-2">KEDAI GSWEET</footer>
      </div>
    </div>
  );
};

export default Dashboard;
