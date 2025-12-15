import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Navbar,
  Nav,
  Image,
} from "react-bootstrap";
import { PersonCircle, BoxArrowRight } from "react-bootstrap-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/style/AddMenu.css";

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
    if (gambarMenu) {
      formData.append("gambarMenu", gambarMenu);
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:5000/menu/addMenu", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Menu berhasil ditambahkan 🎉");

      // Redirect ke Manage Menu setelah 1.5 detik
      setTimeout(() => {
        navigate("/dashboard/manage-datalist");
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error("Gagal menambahkan menu ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar expand="lg" className="custom-navbar px-3">
        <Container fluid>
          <Navbar.Brand className="d-flex align-items-center gap-2 p-0">
            <Image
              src="/gsweet-logo.png"
              roundedCircle
              className="logo"
              alt="GSweet Logo"
            />
            <span className="admin-text">ADMIN</span>
          </Navbar.Brand>
          <Nav className="ms-auto align-items-center gap-2 user-section">
            <span className="user-text">User</span>
            <PersonCircle className="user-icon" />
          </Nav>
        </Container>
      </Navbar>

      <Container fluid className="vh-100 d-flex p-0">
        <Row className="flex-grow-1 m-0">
          {/* Sidebar */}
          <Col md={2} sm={3} xs={12} className="sidebar p-3 d-flex flex-column">
            <Nav className="flex-column">
              <Nav.Link href="/dashboard" className="nav-link-custom">
                Dashboard
              </Nav.Link>
              <Nav.Link href="/manage-user" className="nav-link-custom">
                Manage User
              </Nav.Link>
              <Button
                variant="outline-danger"
                className="mt-2 rounded-pill btn-manage"
                href="/dashboard/manage-menu"
              >
                Manage Datalist Menu
              </Button>
              <Nav.Link
                href="/logout"
                className="mt-auto logout-link d-flex align-items-center gap-1"
              >
                <BoxArrowRight /> Logout
              </Nav.Link>
            </Nav>
          </Col>

          {/* Main Content */}
          <Col md={10} sm={9} xs={12} className="main-content p-4">
            <h5 className="mb-4 title">Tambah Menu</h5>

            <Form className="form-add-menu mx-auto" onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Nama menu"
                  value={namaMenu}
                  onChange={(e) => setNamaMenu(e.target.value)}
                  className="input-custom"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  placeholder="Harga menu"
                  value={hargaMenu}
                  onChange={(e) => setHargaMenu(e.target.value)}
                  className="input-custom"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  placeholder="Deskripsi menu"
                  rows={3}
                  value={deskripsiMenu}
                  onChange={(e) => setDeskripsiMenu(e.target.value)}
                  className="input-custom"
                />
              </Form.Group>

              <Row className="align-items-center justify-content-between">
                <Col xs={12} sm={6} md={4}>
                  <Form.Label className="upload-label">
                    Pilih Gambar
                  </Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={(e) => setGambarMenu(e.target.files[0])}
                    className="input-file-custom"
                  />
                </Col>

                <Col xs={12} sm="auto" className="text-sm-end">
                  <Button
                    variant="danger"
                    type="submit"
                    className="btn-submit"
                    disabled={loading}
                  >
                    {loading ? "Menyimpan..." : "Konfirmasi"}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="footer text-center text-danger py-2">
        KEDAI GSWEET
      </footer>

      {/* Toast */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default AddMenu;
