import React from "react";
import { Container, Row, Col, Nav, Table, Button, Form } from "react-bootstrap";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import "../assets/style/ManageMenuDashboard.css";

const ManageMenuDashboard = () => {
  // Data dummy menu
  const menuData = [
    { id: 1, name: "Sateku", price: "25,000" },
    { id: 2, name: "Baso Aci", price: "23,000" },
    { id: 3, name: "Mie Ayam", price: "16,000" },
    { id: 4, name: "Putung Ayam", price: "20,000" },
    { id: 5, name: "Roti Bakar", price: "5,000" },
    { id: 6, name: "Kebab", price: "28,000" },
    { id: 7, name: "Brownies", price: "80,000" },
    { id: 8, name: "Matcha Latte", price: "30,000" },
    { id: 9, name: "Delagrosa Coffee", price: "10,000" },
  ];

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

        {/* Footer */}
        <footer className="footer">KEDAI GSWEET</footer>
      </div>
    </div>
  );
};

export default ManageMenuDashboard;
