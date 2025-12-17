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
  Offcanvas,
} from "react-bootstrap";
import { PersonCircle, BoxArrowRight, List } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/style/AddMenu.css";

const AddMenu = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      setUsername("nona"); // ganti sesuai decode token bila perlu
    }
  }, [navigate]);

  const [namaMenu, setNamaMenu] = useState("");
  const [hargaMenu, setHargaMenu] = useState("");
  const [deskripsiMenu, setDeskripsiMenu] = useState("");
  const [gambarMenu, setGambarMenu] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setSidebarOpen(false); // tutup sidebar jika logout dari mobile
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!namaMenu || !hargaMenu) {
      toast.warning("Nama menu dan harga wajib diisi!");
      return;
    }

    const formData = new FormData();
    formData.append("namaMenu", namaMenu);
    formData.append("hargaMenu", hargaMenu);
    formData.append("deskripsiMenu", deskripsiMenu);
    if (gambarMenu) formData.append("gambarMenu", gambarMenu);

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/menu/addMenu", formData);
      toast.success("Menu berhasil ditambahkan 🎉");

      setTimeout(() => {
        navigate("/dashboard/manage-datalist");
      }, 1500);
    } catch (err) {
      toast.error("Gagal menambahkan menu ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      {/* SIDEBAR desktop */}
      {!isMobile && (
        <aside className="sidebar">
          <div className="sidebar-logo-section">
            <Image src="/logoooo.png" className="sidebar-logo" />
            <span className="sidebar-admin">ADMIN</span>
          </div>

          <Nav className="flex-column sidebar-links">
            <Nav.Link href="/dashboard" className="link-item">
              Dashboard
            </Nav.Link>
            <Nav.Link href="/dashboard/manage-user" className="link-item">
              Manage User
            </Nav.Link>
            <Nav.Link href="/dashboard/manage-datalist" className="link-item active-link">
              Manage Menu
            </Nav.Link>
          </Nav>

          <Nav.Link className="logout-link" onClick={handleLogout}>
            Logout <BoxArrowRight />
          </Nav.Link>
        </aside>
      )}

      {/* Offcanvas Sidebar mobile */}
      {isMobile && (
        <Offcanvas show={sidebarOpen} onHide={() => setSidebarOpen(false)} className="sidebar-offcanvas">
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
              <Nav.Link href="/dashboard" className="link-item" onClick={() => setSidebarOpen(false)}>
                Dashboard
              </Nav.Link>
              <Nav.Link href="/manage-user" className="link-item" onClick={() => setSidebarOpen(false)}>
                Manage User
              </Nav.Link>
              <Nav.Link href="/dashboard/manage-datalist" className="link-item active-link" onClick={() => setSidebarOpen(false)}>
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
        <Navbar className="top-navbar px-4">
          {isMobile && (
            <List
              size={28}
              className="hamburger-icon"
              onClick={() => setSidebarOpen(true)}
              aria-label="Toggle sidebar"
            />
          )}
          <Navbar.Text className="header-title">Tambah Menu</Navbar.Text>
          <Nav
            className="ms-auto align-items-center gap-2"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/dashboard/profile")}
          >
            <span className="fw-semibold">{username}</span>
            <PersonCircle size={24} />
          </Nav>
        </Navbar>

        <Container fluid className="d-flex justify-content-center align-items-start py-4">
          <Form className="form-add-menu" onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Nama Menu</Form.Label>
                  <Form.Control
                    type="text"
                    value={namaMenu}
                    onChange={(e) => setNamaMenu(e.target.value)}
                    placeholder="Masukkan nama menu"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Harga</Form.Label>
                  <Form.Control
                    type="number"
                    value={hargaMenu}
                    onChange={(e) => setHargaMenu(e.target.value)}
                    placeholder="Masukkan harga"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Deskripsi Menu</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={deskripsiMenu}
                onChange={(e) => setDeskripsiMenu(e.target.value)}
                placeholder="Deskripsi menu"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Gambar Menu</Form.Label>
              <Form.Control
                type="file"
                accept="image/png,image/jpeg"
                onChange={(e) => setGambarMenu(e.target.files[0])}
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button type="submit" variant="danger" disabled={loading}>
                {loading ? "Menyimpan..." : "Simpan Menu"}
              </Button>
            </div>
          </Form>
        </Container>

        <footer className="footer text-center py-2">KEDAI GSWEET</footer>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddMenu;
