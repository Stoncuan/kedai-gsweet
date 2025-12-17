import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav, Image, Offcanvas, Form, Button} from "react-bootstrap";
import { PersonCircle, BoxArrowRight, List } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/style/EditProfile.css";

const EditProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [form, setForm] = useState({
    nama_lengkap: "",
    username: "",
    no_tel: "",
    password: "",
  });
  const [userLogin, setUserLogin] = useState(null);

  // Handle resize untuk responsivitas
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Cek token dan ambil data user
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUserLogin(decoded);

      axios
        .get(`http://localhost:5000/users/${id}`)
        .then((res) => {
          setForm({
            nama_lengkap: res.data.nama_lengkap,
            username: res.data.username,
            no_tel: res.data.no_tel,
            password: "",
          });
        })
        .catch(() => toast.error("Gagal mengambil data user"));
    } catch {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form };
    if (!payload.password) delete payload.password;

    try {
      await axios.put(`http://localhost:5000/users/editUser/${id}`, payload);
      toast.success("Profile berhasil diperbarui");
      setTimeout(() => navigate("/dashboard/profile"), 1500);
    } catch {
      toast.error("Gagal update profile");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setSidebarOpen(false);
    navigate("/login");
  };

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
          backdrop={true}
          scroll={false}
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

      {/* MAIN CONTENT */}
      <div className="main-content">
        <Navbar className="top-navbar p-3">
          <Container fluid>
            {isMobile && (
              <List
                size={28}
                className="hamburger-icon"
                onClick={() => setSidebarOpen(true)}
                role="button"
                aria-label="Toggle sidebar"
                style={{ cursor: "pointer", color: "#ae0032" }}
              />
            )}
            <Navbar.Text className="header-title">Edit Profile</Navbar.Text>

            <Nav
              className="ms-auto align-items-center gap-2"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/dashboard/profile")}
            >
              <span className="fw-semibold">{userLogin?.username}</span>
              <PersonCircle size={22} />
            </Nav>
          </Container>
        </Navbar>

        <Container
          fluid
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "calc(100vh - 120px)" }}
        >
          <Form
            onSubmit={handleSubmit}
            style={{ maxWidth: 420, width: "100%" }}
            className="text-center"
          >
            <PersonCircle size={120} className="text-secondary mb-3" />

            <Form.Group className="mb-3">
              <Form.Control
                name="nama_lengkap"
                value={form.nama_lengkap}
                onChange={handleChange}
                placeholder="Nama Lengkap"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Username"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                name="no_tel"
                type="tel"
                value={form.no_tel}
                onChange={handleChange}
                placeholder="Nomor Telepon"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Control
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password (opsional)"
              />
            </Form.Group>

            <Button type="submit" variant="danger" className="w-100">
              Konfirmasi
            </Button>
          </Form>
        </Container>

        <ToastContainer position="top-right" autoClose={3000} />
        <footer className="footer text-center py-2">KEDAI GSWEET</footer>
      </div>
    </div>
  );
};

export default EditProfile;
