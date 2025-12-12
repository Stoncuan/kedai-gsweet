import React, { useState, useEffect } from "react";
import { Container, Row, Col, Nav, Table, Button, Form } from "react-bootstrap";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import axios from "axios"; // Mengimpor axios untuk API request
import "../assets/style/ManageMenuDashboard.css";

const ManageMenuDashboard = () => {
  const [menuData, setMenuData] = useState([]); // Menyimpan data menu yang diambil dari backend
  const [message, setMessage] = useState(""); // Menyimpan pesan error/sukses jika ada

  // Mengambil data menu ketika komponen dimuat
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get("http://localhost:5000/menu");
        setMenuData(response.data); // Menyimpan data menu yang diterima
      } catch (error) {
        console.error("Error fetching menu:", error);
        setMessage("Gagal memuat menu dari server");
      }
    };

    fetchMenu();
  }, []); // Hanya dijalankan sekali saat komponen dimuat

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <img
            src="https://i.ibb.co/ZdSg5bx/gsweet-logo.png"
            alt="GSweet Logo"
            className="sidebar-logo"
          />
          <span className="sidebar-title">ADMIN</span>
        </div>

        <Nav
          className="sidebar-nav flex-column"
          defaultActiveKey="#manage-datalist"
        >
          <Nav.Link href="#dashboard" className="nav-item">
            Dashboard
          </Nav.Link>
          <Nav.Link href="#manage-user" className="nav-item">
            Manage User
          </Nav.Link>
          <Nav.Link href="#manage-datalist" className="nav-item active">
            Manage Datalist Menu
          </Nav.Link>
        </Nav>

        <Button variant="link" className="logout-btn">
          Logout <FaSignOutAlt />
        </Button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="main-header">
          <span className="header-title">Manage Menu</span>
          <div className="header-right">
            <span className="user-label">User</span>
            <FaUserCircle size={24} className="user-icon" />
          </div>
        </header>

        {/* Content */}
        <Container fluid className="content-container">
          <Row>
            <Col className="d-flex justify-content-end align-items-center mb-3">
              <Button variant="danger" className="btn-tambah">
                <FaPlus /> Tambah menu
              </Button>
            </Col>
          </Row>

          <Row>
            <Col>
              {/* Tabel Menu */}
              <Table responsive bordered hover size="sm" className="menu-table">
                <thead className="table-header">
                  <tr>
                    <th>
                      <Form.Check type="checkbox" />
                    </th>
                    <th>Nama Menu</th>
                    <th>Harga</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Menampilkan data menu yang diambil dari backend */}
                  {menuData.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <Form.Check type="checkbox" />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td className="action-icons">
                        <FaTrash className="icon delete" title="Delete" />
                        <FaEdit className="icon edit" title="Edit" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>

        {/* Pesan Error/Sukses */}
        {message && <div className="alert alert-danger mt-3">{message}</div>}

        {/* Footer */}
        <footer className="footer">KEDAI GSWEET</footer>
      </div>
    </div>
  );
};

export default ManageMenuDashboard;
