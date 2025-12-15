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
} from "react-bootstrap";
import { PersonCircle, BoxArrowRight } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/style/EditMenu.css";

const EditMenu = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [namaMenu, setNamaMenu] = useState("");
  const [hargaMenu, setHargaMenu] = useState("");
  const [deskripsiMenu, setDeskripsiMenu] = useState("");
  const [gambarMenu, setGambarMenu] = useState(null);
  const [gambarLama, setGambarLama] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Ambil data menu lama
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
      .catch(() => {
        toast.error("Gagal memuat data menu");
      });
  }, [id]);

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
               <Nav.Link className="link-item active-link" href="/dashboard/manage-datalist">
                 Manage Menu
               </Nav.Link>
             </Nav>
     
             <Nav.Link className="logout-link">
               Logout <BoxArrowRight />
             </Nav.Link>
           </aside>

      <div className="main-content">
        <Navbar className="top-navbar px-4">
          <Navbar.Text className="header-title">Edit Menu</Navbar.Text>
          <Nav className="ms-auto align-items-center gap-2">
            <span>User</span>
            <PersonCircle size={22} />
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

            {/* PREVIEW GAMBAR LAMA */}
            {gambarLama && (
              <div className="mb-3">
                <Form.Label>Gambar Saat Ini</Form.Label>
                <Image
                  src={`http://localhost:5000/uploads/${gambarLama}`}
                  thumbnail
                  width={150}
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
              <Button type="submit" variant="warning" disabled={loading}>
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
