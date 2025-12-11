import React from "react";
import { Container, Row, Col, Nav, Form, Button, Image } from "react-bootstrap";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import "../assets/style/AddMenu.css";

const AddMenu = () => {
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
          <Form>
            <Form.Group controlId="namaMenu" className="form-group-custom">
              <Form.Control
                type="text"
                placeholder="Nama menu"
                className="form-input"
              />
            </Form.Group>
            <Form.Group controlId="hargaMenu" className="form-group-custom">
              <Form.Control
                type="text"
                placeholder="Harga menu"
                className="form-input"
              />
            </Form.Group>
            <Form.Group controlId="deskripsiMenu" className="form-group-custom">
              <Form.Control
                as="textarea"
                placeholder="Deskripsi menu"
                rows={3}
                className="form-input"
              />
            </Form.Group>
            <Row className="form-row">
              <Col xs={6}>
                <Form.Group
                  controlId="gambarMenu"
                  className="form-group-custom file-group"
                >
                  <Form.Control type="file" className="form-input file-input" />
                </Form.Group>
              </Col>
              <Col
                xs={6}
                className="d-flex justify-content-end align-items-center"
              >
                <Button variant="danger" className="btn-konfirmasi">
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
