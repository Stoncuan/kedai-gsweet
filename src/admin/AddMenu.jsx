import React, { useState } from "react";
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
} from "react-bootstrap";
import { PersonCircle, BoxArrowRight } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/styles/admin/AddMenu.css";

const AddMenu = () => {
  const navigate = useNavigate();

  const [namaMenu, setNamaMenu] = useState("");
  const [hargaMenu, setHargaMenu] = useState("");
  const [deskripsiMenu, setDeskripsiMenu] = useState("");
  const [gambarMenu, setGambarMenu] = useState(null);
  const [loading, setLoading] = useState(false);

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
        navigate("/dashboard/manage-menu");
      }, 1500);
    } catch (err) {
      toast.error("Gagal menambahkan menu ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-logo-section">
          <Image
            src="https://i.ibb.co/ZdSg5bx/gsweet-logo.png"
            roundedCircle
            className="sidebar-logo"
          />
          <span className="sidebar-admin">ADMIN</span>
        </div>

        <Nav className="flex-column sidebar-links">
          <Nav.Link href="/dashboard" className="link-item">
            Dashboard
          </Nav.Link>
          <Nav.Link href="/manage-user" className="link-item">
            Manage User
          </Nav.Link>
          <Nav.Link className="link-item active-link">
            Tambah Menu
          </Nav.Link>
        </Nav>

        <Nav.Link className="logout-link">
          Logout <BoxArrowRight />
        </Nav.Link>
      </aside>

      {/* MAIN CONTENT */}
      <div className="main-content">
        {/* NAVBAR */}
        <Navbar className="top-navbar px-4">
          <Navbar.Text className="header-title">
            Tambah Menu
          </Navbar.Text>
          <Nav className="ms-auto align-items-center gap-2">
            <span>User</span>
            <PersonCircle size={22} />
          </Nav>
        </Navbar>

        {/* FORM CENTER */}
        <Container
          fluid
          className="d-flex justify-content-center align-items-start py-4"
        >
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

        {/* FOOTER */}
        <footer className="footer text-center py-2">
          KEDAI GSWEET
        </footer>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddMenu;
