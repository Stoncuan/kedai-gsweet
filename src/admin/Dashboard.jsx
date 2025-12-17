import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav, Image, Offcanvas } from "react-bootstrap";
import { PersonCircle, BoxArrowRight, List } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import "../assets/style/Dasboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  // Handle window resize untuk update isMobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
      if (window.innerWidth >= 992) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Ambil user dari token
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

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="page-wrapper">
      {/* Sidebar Desktop (hidden on mobile) */}
      {!isMobile && (
        <aside className="sidebar">
          <div className="sidebar-logo-section">
            <Image src="/logoooo.png" className="sidebar-logo" />
            <span className="sidebar-admin">ADMIN</span>
          </div>

          <Nav className="flex-column sidebar-links">
            <Nav.Link className="link-item active-link">Dashboard</Nav.Link>
            <Nav.Link className="link-item" onClick={() => navigate("/dashboard/manage-user")}>
              Manage User
            </Nav.Link>
            <Nav.Link className="link-item" onClick={() => navigate("/dashboard/manage-datalist")}>
              Manage Menu
            </Nav.Link>
          </Nav>

          <Nav.Link className="logout-link" onClick={handleLogout}>
            Logout <BoxArrowRight />
          </Nav.Link>
        </aside>
      )}

      {/* Offcanvas Sidebar Mobile */}
      {isMobile && (
        <Offcanvas show={sidebarOpen} onHide={toggleSidebar} className="sidebar-offcanvas">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <div className="sidebar-logo-section">
                <Image src="/logoooo.png" className="sidebar-logo" />
                <span className="sidebar-admin">ADMIN</span>
              </div>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column sidebar-links">
              <Nav.Link className="link-item active-link" onClick={toggleSidebar}>
                Dashboard
              </Nav.Link>
              <Nav.Link
                className="link-item"
                onClick={() => {
                  navigate("/dashboard/manage-user");
                  toggleSidebar();
                }}
              >
                Manage User
              </Nav.Link>
              <Nav.Link
                className="link-item"
                onClick={() => {
                  navigate("/dashboard/manage-datalist");
                  toggleSidebar();
                }}
              >
                Manage Menu
              </Nav.Link>
            </Nav>

            <Nav.Link className="logout-link" onClick={() => { handleLogout(); toggleSidebar(); }}>
              Logout <BoxArrowRight />
            </Nav.Link>
          </Offcanvas.Body>
        </Offcanvas>
      )}

      {/* Main content */}
      <div className="main-content">
        {/* Navbar */}
        <Navbar className="top-navbar p-3">
          <Container fluid>
            {isMobile && (
              <List
                size={28}
                className="hamburger-icon"
                onClick={toggleSidebar}
                style={{ cursor: "pointer", color: "#ae0032" }}
                aria-label="Menu"
              />
            )}
            <Navbar.Text className="header-title">Dashboard</Navbar.Text>

            {/* User Profile */}
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

        {/* Center Content */}
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

        {/* Footer */}
        <footer className="footer text-center py-2">KEDAI GSWEET</footer>
      </div>
    </div>
  );
};

export default Dashboard;