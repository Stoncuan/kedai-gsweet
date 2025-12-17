import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Navbar,
  Nav,
  Button,
  Image,
  Form,
  Row,
  Col,
  Card,
  Offcanvas,
} from "react-bootstrap";
import { PersonCircle, BoxArrowRight, List } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/style/AddUser.css";

const AddUser = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Handle resize to update isMobile state
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

  // Check token and set username
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      setUsername("nona"); // Bisa diubah sesuai decode token
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setSidebarOpen(false); // tutup sidebar saat logout di mobile
    navigate("/login");
  };

  const [form, setForm] = useState({
    nama_lengkap: "",
    username: "",
    no_tel: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.nama_lengkap ||
      !form.username ||
      !form.no_tel ||
      !form.email ||
      !form.password
    ) {
      toast.error("Semua field wajib diisi ❌");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/users/addUser", form);
      toast.success("User berhasil ditambahkan ✅");

      setTimeout(() => {
        navigate("/dashboard/manage-user");
      }, 1500);
    } catch {
      toast.error("Gagal menambahkan user ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      {/* Sidebar Desktop */}
      {!isMobile && (
        <aside className="sidebar">
          <div className="sidebar-logo-section">
            <Image width={90} src="/logoooo.png" roundedCircle className="sidebar-logo" />
            <span className="sidebar-admin">ADMIN</span>
          </div>

          <Nav className="flex-column sidebar-links">
            <Nav.Link className="link-item" href="/dashboard">
              Dashboard
            </Nav.Link>
            <Nav.Link className="link-item active-link" href="/dashboard/manage-user">
              Manage User
            </Nav.Link>
            <Nav.Link className="link-item" href="/dashboard/manage-datalist">
              Manage Menu
            </Nav.Link>
          </Nav>

          <Nav.Link className="logout-link" onClick={handleLogout}>
            Logout <BoxArrowRight />
          </Nav.Link>
        </aside>
      )}

      {/* Mobile sidebar using Offcanvas */}
      {isMobile && (
        <Offcanvas show={sidebarOpen} onHide={() => setSidebarOpen(false)} className="sidebar-offcanvas">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <div className="sidebar-logo-section">
                <Image width={80} src="/logoooo.png" roundedCircle />
                <span className="sidebar-admin">ADMIN</span>
              </div>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column sidebar-links">
              <Nav.Link href="/dashboard" className="link-item" onClick={() => setSidebarOpen(false)}>
                Dashboard
              </Nav.Link>
              <Nav.Link href="/dashboard/manage-user" className="link-item active-link" onClick={() => setSidebarOpen(false)}>
                Manage User
              </Nav.Link>
              <Nav.Link href="/dashboard/manage-datalist" className="link-item" onClick={() => setSidebarOpen(false)}>
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
                role="button"
                aria-label="Toggle menu"
              />
            )}
            <Navbar.Text className="header-title">Tambah User</Navbar.Text>

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

        <Container fluid className="px-4 py-4">
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <h5 className="fw-bold text-danger mb-4">Form Tambah User</h5>

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nama Lengkap</Form.Label>
                      <Form.Control
                        value={form.nama_lengkap}
                        onChange={(e) =>
                          setForm({ ...form, nama_lengkap: e.target.value })
                        }
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        value={form.username}
                        onChange={(e) =>
                          setForm({ ...form, username: e.target.value })
                        }
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>No Telp</Form.Label>
                      <Form.Control
                        value={form.no_tel}
                        onChange={(e) =>
                          setForm({ ...form, no_tel: e.target.value })
                        }
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Masukkan password"
                        value={form.password}
                        onChange={(e) =>
                          setForm({ ...form, password: e.target.value })
                        }
                      />
                    </Form.Group>

                    <div className="d-flex justify-content-end gap-2">
                      <Button
                        variant="secondary"
                        onClick={() => navigate("/dashboard/manage-user")}
                      >
                        Batal
                      </Button>

                      <Button type="submit" variant="danger" disabled={loading}>
                        {loading ? "Menyimpan..." : "Tambah User"}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        <footer className="footer text-center py-2">KEDAI GSWEET</footer>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddUser;