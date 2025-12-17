import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav, Image, Button } from "react-bootstrap";
import {
  PersonCircle,
  PencilSquare,
  BoxArrowRight,
  Envelope,
  Telephone,
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "../assets/style/Profile.css";

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // cek apa user punya token atau tidak
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);

      axios
        .get(`http://localhost:5000/users/${decoded.id}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => {
          localStorage.removeItem("token");
          navigate("/login");
        });
    } catch (err) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="page-wrapper">
      {/* SIDEBAR */}
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

      {/* MAIN */}
      <div className="main-content">
        <Navbar className="top-navbar p-3">
          <Container fluid>
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

export default UserProfile;