import React, { useEffect, useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  Image,
  Offcanvas,
  Button,
} from "react-bootstrap";
import {
  PersonCircle,
  BoxArrowRight,
  List,
  Envelope,
  Telephone,
  PencilSquare,
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "../assets/style/Profile.css";


const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Token check
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      axios
        .get(`http://localhost:5000/users/${decoded.id}`)
        .then((res) => setUser(res.data))
        .catch(() => {
          localStorage.removeItem("token");
          navigate("/login");
        });
    } catch {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setSidebarOpen(false);
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="page-wrapper">
      {/* Sidebar desktop */}
      {!isMobile && (
        <aside className="sidebar">
          <div
            className="sidebar-logo-section"
            onClick={() => navigate("/dashboard/profile")}
            style={{ cursor: "pointer" }}
          >
            <Image src="/logoooo.png" className="sidebar-logo" />
            <span className="sidebar-admin">ADMIN</span>
          </div>

          <Nav className="flex-column sidebar-links">
            <Nav.Link
              className="link-item"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </Nav.Link>
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
      )}

      {/* Sidebar Offcanvas mobile */}
      {isMobile && (
        <Offcanvas
          show={sidebarOpen}
          onHide={() => setSidebarOpen(false)}
          className="sidebar-offcanvas"
        >
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
              <Nav.Link
                href="/dashboard"
                className="link-item"
                onClick={() => setSidebarOpen(false)}
              >
                Dashboard
              </Nav.Link>
              <Nav.Link
                href="/dashboard/manage-user"
                className="link-item"
                onClick={() => setSidebarOpen(false)}
              >
                Manage User
              </Nav.Link>
              <Nav.Link
                href="/dashboard/manage-datalist"
                className="link-item"
                onClick={() => setSidebarOpen(false)}
              >
                Manage Menu
              </Nav.Link>
            </Nav>

            <Nav.Link className="logout-link" onClick={handleLogout}>
              Logout <BoxArrowRight />
            </Nav.Link>
          </Offcanvas.Body>
        </Offcanvas>
      )}

      {/* Main Content */}
      <div className="main-content">
        <Navbar className="top-navbar p-3">
          <Container fluid>
            {isMobile && (
              <List
                size={28}
                className="hamburger-icon"
                onClick={() => setSidebarOpen(true)}
                aria-label="Toggle sidebar menu"
                style={{ cursor: "pointer", color: "#ae0032" }}
              />
            )}
            <Navbar.Text className="header-title">User Profile</Navbar.Text>

            <Nav className="ms-auto align-items-center gap-2">
              <span>{user.username}</span>
              <PersonCircle size={22} />
            </Nav>
          </Container>
        </Navbar>

        <Container
          fluid
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "calc(100vh - 120px)" }}
        >
          <div className="text-center" style={{ maxWidth: 420 }}>
            <PersonCircle size={140} className="text-secondary mb-3" />

            <h5 className="fw-bold">{user.nama_lengkap}</h5>

            <p>
              <Envelope /> {user.email}
            </p>

            <p>
              <Telephone /> {user.no_tel}
            </p>

            <Button
              variant="outline-danger"
              onClick={() => navigate(`/dashboard/edit-profile/${user.id}`)}
            >
              Edit Profile <PencilSquare />
            </Button>
          </div>
        </Container>

        <footer className="footer text-center py-2">KEDAI GSWEET</footer>
      </div>
    </div>
  );
};

export default Profile;
