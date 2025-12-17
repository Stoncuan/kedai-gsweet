import React, { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/style/EditMenu.css";

const EditMenu = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // cek token sesi
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      setUsername("nona"); // ganti dengan decode token cocok
    }
  }, [navigate]);

  // resize listener untuk update isMobile
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ambil data menu lama
  const [namaMenu, setNamaMenu] = useState("");
  const [hargaMenu, setHargaMenu] = useState("");
  const [deskripsiMenu, setDeskripsiMenu] = useState("");
  const [gambarMenu, setGambarMenu] = useState(null);
  const [gambarLama, setGambarLama] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/menu/getMenu/${id}`)
      .then((res) => {
        const data = res.data;
        setNamaMenu(data.nama_menu);
        setHargaMenu(data.harga);
        setDeskripsiMenu(data.deskripsi);
        setGambarLama(data.gambar);
      })
      .catch(() => toast.error("Gagal memuat data menu"));
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setSidebarOpen(false);
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("namaMenu", namaMenu);
    formData.append("hargaMenu", hargaMenu);
    formData.append("deskripsiMenu", deskripsiMenu);
    if (gambarMenu) formData.append("gambarMenu", gambarMenu);

    try {
      setLoading(true);
      await axios.put(`http://localhost:5000/menu/editMenu/${id}`, formData);
      toast.success("Menu berhasil diperbarui 🎉");

      setTimeout(() => {
        navigate("/dashboard/manage-datalist");
      }, 1500);
    } catch {
      toast.error("Gagal update menu ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      {/* Sidebar desktop */}
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
            <Nav.Link href="/manage-user" className="link-item">
              Manage User
            </Nav.Link>
            <Nav.Link
              href="/dashboard/manage-datalist"
              className="link-item active-link"
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
          backdrop="static"
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
                href="/manage-user"
                className="link-item"
                onClick={() => setSidebarOpen(false)}
              >
                Manage User
              </Nav.Link>
              <Nav.Link
                href="/dashboard/manage-datalist"
                className="link-item active-link"
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

      {/* Main content */}
      <div className="main-content">
        <Navbar className="top-navbar px-4">
          {isMobile && (
            <List
              size={28}
              className="hamburger-icon"
              onClick={() => setSidebarOpen(true)}
              style={{ cursor: "pointer", color: "#ae0032" }}
              aria-label="Toggle menu"
            />
          )}
          <Navbar.Text className="header-title">Edit Menu</Navbar.Text>

          <Nav
            className="ms-auto align-items-center gap-2"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/dashboard/profile")}
          >
            <span className="fw-semibold">{username}</span>
            <PersonCircle size={24} />
          </Nav>
        </Navbar>

        <Container fluid className="d-flex justify-content-center py-4">
          <Form className="form-add-menu" onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Nama Menu</Form.Label>
                <Form.Control
                  value={namaMenu}
                  onChange={(e) => setNamaMenu(e.target.value)}
                />
              </Col>

              <Col md={6}>
                <Form.Label>Harga</Form.Label>
                <Form.Control
                  type="number"
                  value={hargaMenu}
                  onChange={(e) => setHargaMenu(e.target.value)}
                />
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={deskripsiMenu}
                onChange={(e) => setDeskripsiMenu(e.target.value)}
              />
            </Form.Group>

            {gambarLama && (
              <div className="mb-3">
                <Form.Label>Gambar Saat Ini</Form.Label>
                <Image
                  src={`http://localhost:5000/uploads/${gambarLama}`}
                  thumbnail
                  width={150}
                  alt="Preview gambar lama"
                />
              </div>
            )}

            <Form.Group className="mb-4">
              <Form.Label>Ganti Gambar (opsional)</Form.Label>
              <Form.Control
                type="file"
                accept="image/png,image/jpeg"
                onChange={(e) => setGambarMenu(e.target.files[0])}
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button type="submit" variant="danger" disabled={loading}>
                {loading ? "Menyimpan..." : "Update Menu"}
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

export default EditMenu;
