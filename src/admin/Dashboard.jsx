import React from 'react';
import { Container, Row, Col, Nav, Button } from 'react-bootstrap';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import '../assets/style/Dasboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-wrapper">

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

        <Nav className="sidebar-nav" defaultActiveKey="#dashboard" variant="pills" >
          <Nav.Link href="#dashboard" className="nav-item active">
            Dashboard
          </Nav.Link>
          <Nav.Link href="#manage-user" className="nav-item">
            Manage User
          </Nav.Link>
          <Nav.Link href="#manage-datalist" className="nav-item">
            Manage Datalist Menu
          </Nav.Link>
        </Nav>

        <Button variant="link" className="logout-btn">
          Logout <FaSignOutAlt />
        </Button>
      </div>

      {/* Main content area */}
      <div className="main-area">
        {/* Header */}
        <header className="main-header">
          <span className="user-label">User</span>
          <FaUserCircle size={24} className="user-icon" />
        </header>

        {/* Content */}
        <Container fluid className="content-container">
          <Row className="justify-content-center align-items-center h-100">
            <Col xs={12} md={6} lg={4}>
              <div className="welcome-card">
                Selamat Datang Admin User!
              </div>
            </Col>
          </Row>
        </Container>

        {/* Footer */}
        <footer className="footer">
          KEDAI GSWEET
        </footer>
      </div>

    </div>
  );
};

export default AdminDashboard;
