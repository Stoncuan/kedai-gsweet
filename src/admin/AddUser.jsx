import React, { useState } from 'react';
import { Container, Row, Col, Nav, Form, Button, Image } from 'react-bootstrap';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import '../assets/style/AddUser.css';
import axios from 'axios';

const AddUser = () => {
  // State untuk menyimpan data input
  const [formData, setFormData] = useState({
    nama_lengkap: '',
    username: '',
    no_tel: '',
    email: '',
    password: '',
  });

  // State untuk menangani pesan error/sukses
  const [message, setMessage] = useState('');

  // Fungsi untuk mengupdate state saat input berubah
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Fungsi untuk menangani pengiriman form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi form data
    const { nama_lengkap, username, no_tel, email, password } = formData;
    if (!nama_lengkap || !username || !no_tel || !email || !password) {
      setMessage('Data tidak lengkap!');
      return;
    }

    try {
      // Mengirim data ke server dengan axios
      const response = await axios.post('http://localhost:5000/users/addUser', formData);

      // Menangani respons sukses
      setMessage(response.data.message);
      // Reset form setelah berhasil
      setFormData({
        nama_lengkap: '',
        username: '',
        no_tel: '',
        email: '',
        password: '',
      });
    } catch (error) {
      // Menangani error jika ada masalah dengan server
      console.error('Error:', error);
      setMessage('Gagal menambahkan user');
    }
  };

  return (
    <div className="app-wrapper">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-top">
          <Image src="https://i.ibb.co/ZdSg5bx/gsweet-logo.png" roundedCircle className="sidebar-logo" />
          <div className="sidebar-admin-text">ADMIN</div>
        </div>

        <Nav className="sidebar-menu" defaultActiveKey="#manage-datalist">
          <Nav.Link href="#dashboard" className="sidebar-link">Dashboard</Nav.Link>
          <Nav.Link href="#manage-user" className="sidebar-link">Manage User</Nav.Link>
          <Nav.Link href="#manage-datalist" className="sidebar-link active">Manage Datalist Menu</Nav.Link>
        </Nav>

        <div className="sidebar-logout">
          <Button variant="link" className="logout-btn">
            Logout <FaSignOutAlt />
          </Button>
        </div>
      </div>

      {/* Content Area */}
      <div className="content-area">
        {/* Header */}
        <header className="content-header">
          <span className="page-title">Tambah Menu</span>
          <div className="user-info">
            <span>User</span>
            <FaUserCircle size={22} className="user-icon" />
          </div>
        </header>

        {/* Form */}
        <Container className="form-container">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                name="nama_lengkap"
                value={formData.nama_lengkap}
                onChange={handleChange}
                placeholder="Nama menu"
                className="input-field"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="input-field"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                name="no_tel"
                value={formData.no_tel}
                onChange={handleChange}
                placeholder="Nomor Telepon"
                className="input-field"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="input-field"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="input-field"
              />
            </Form.Group>

            <Row className="align-items-center">
              <Col xs={6} md={4} className="d-flex justify-content-start justify-content-md-end">
                <Button variant="danger" className="btn-confirm" type="submit">Konfirmasi</Button>
              </Col>
            </Row>
          </Form>

          {/* Display Message */}
          {message && <div className="alert alert-info mt-3">{message}</div>}
        </Container>

        {/* Footer */}
        <footer className="footer-bar">
          KEDAI GSWEET
        </footer>
      </div>
    </div>
  );
};

export default AddUser;
