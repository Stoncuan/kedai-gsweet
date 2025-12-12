import React, { useState } from "react";
import { Container, Row, Col, Nav, Form, Button, Image } from "react-bootstrap";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import axios from "axios"; // Import axios for making HTTP requests
import "../assets/style/AddMenu.css";

const AddMenu = () => {
  // State untuk form inputs
  const [namaMenu, setNamaMenu] = useState("");
  const [hargaMenu, setHargaMenu] = useState("");
  const [deskripsiMenu, setDeskripsiMenu] = useState("");
  const [gambarMenu, setGambarMenu] = useState(null);

  // Handle form input changes
  const handleNamaMenuChange = (e) => setNamaMenu(e.target.value);
  const handleHargaMenuChange = (e) => setHargaMenu(e.target.value);
  const handleDeskripsiMenuChange = (e) => setDeskripsiMenu(e.target.value);
  const handleGambarMenuChange = (e) => setGambarMenu(e.target.files[0]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the form data
    const formData = new FormData();
    formData.append("namaMenu", namaMenu);
    formData.append("hargaMenu", hargaMenu);
    formData.append("deskripsiMenu", deskripsiMenu);
    formData.append("gambarMenu", gambarMenu);

    try {
      // Send POST request to the backend
      const response = await axios.post(
        "http://localhost:5000/menu/tambahMenu",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the correct content type for form data
          },
        }
      );
      alert(response.data.message); // Show success message
      // Reset the form
      setNamaMenu("");
      setHargaMenu("");
      setDeskripsiMenu("");
      setGambarMenu(null);
    } catch (error) {
      alert(
        "Error: " +
          (error.response ? error.response.data.message : error.message)
      ); // Handle error
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <Image
            src="https://i.ibb.co/ZdSg5bx/gsweet-logo.png"
            roundedCircle
            className="sidebar-logo"
          />
          <span className="sidebar-title">ADMIN</span>
        </div>

        <Nav className="sidebar-nav" defaultActiveKey="#manage-datalist">
          <Nav.Link href="#" className="nav-link-disabled">
            Dashboard
          </Nav.Link>
          <Nav.Link href="#" className="nav-link-disabled">
            Manage User
          </Nav.Link>
          <Nav.Link href="#manage-datalist" className="nav-link active">
            Manage Datalist Menu
          </Nav.Link>
        </Nav>

        <Button variant="link" className="logout-btn">
          Logout <FaSignOutAlt />
        </Button>
      </div>

      {/* Main content */}
      <div className="main-content">
        <header className="header-bar">
          <div className="header-user">
            <span>User</span>
            <FaUserCircle size={22} />
          </div>
        </header>

        <Container className="form-container">
          <h5 className="form-title">Tambah menu</h5>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="namaMenu" className="form-group-custom">
              <Form.Control
                type="text"
                placeholder="Nama menu"
                className="form-input"
                value={namaMenu}
                onChange={handleNamaMenuChange}
              />
            </Form.Group>
            <Form.Group controlId="hargaMenu" className="form-group-custom">
              <Form.Control
                type="text"
                placeholder="Harga menu"
                className="form-input"
                value={hargaMenu}
                onChange={handleHargaMenuChange}
              />
            </Form.Group>
            <Form.Group controlId="deskripsiMenu" className="form-group-custom">
              <Form.Control
                as="textarea"
                placeholder="Deskripsi menu"
                rows={3}
                className="form-input"
                value={deskripsiMenu}
                onChange={handleDeskripsiMenuChange}
              />
            </Form.Group>
            <Row className="form-row">
              <Col xs={6}>
                <Form.Group
                  controlId="gambarMenu"
                  className="form-group-custom file-group"
                >
                  <Form.Control
                    type="file"
                    className="form-input file-input"
                    onChange={handleGambarMenuChange}
                  />
                </Form.Group>
              </Col>
              <Col
                xs={6}
                className="d-flex justify-content-end align-items-center"
              >
                <Button
                  variant="danger"
                  className="btn-konfirmasi"
                  type="submit"
                >
                  Konfirmasi
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>

        <footer className="footer-bar">KEDAI GSWEET</footer>
      </div>
    </div>
  );
};

export default AddMenu;
