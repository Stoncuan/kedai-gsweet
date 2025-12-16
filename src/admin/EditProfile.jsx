import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav, Image, Button, Form } from "react-bootstrap";
import { PersonCircle, BoxArrowRight } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/style/ManageMenuDashboard.css";

const EditUserProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }

  const [form, setForm] = useState({
    nama_lengkap: "",
    username: "",
    no_tel: "",
    password: "",
  });

  const [userLogin, setUserLogin] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    try {
      const decoded = jwtDecode(token);
      setUserLogin(decoded);

      axios
        .get(`http://localhost:5000/users/${id}`)
        .then((res) => {
          setForm({
            nama_lengkap: res.data.nama_lengkap,
            username: res.data.username,
            no_tel: res.data.no_tel,
            password: "",
          });
        })
        .catch((err) => {
          console.error(err);
          toast.error("Gagal mengambil data user");
        });
    } catch (error) {
      console.error(error);
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...form };
    if (!payload.password) delete payload.password;

    try {
      await axios.put(`http://localhost:5000/users/editUser/${id}`, payload);
      toast.success("Profile berhasil diperbarui");
      setTimeout(() => {
        navigate("/dashboard/profile");
      }, 1500);
    } catch (err) {
      console.error(err);
      toast.error("Gagal update profile");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="page-wrapper">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div
          className="sidebar-logo-section"
          onClick={() => navigate("/dashboard/profile")}
          style={{ cursor: "pointer" }}
        >
          <Image src="/logoooo.png" className="sidebar-logo" />
          <span className="sidebar-admin">ADMIN</span>
        </div>

        <Nav className="flex-column sidebar-links">
          <Nav.Link
            className="link-item"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </Nav.Link>
          <Nav.Link
            className="link-item"
            onClick={() => navigate("/dashboard/manage-user")}
          >
            Manage User
          </Nav.Link>
          <Nav.Link
            className="link-item"
            onClick={() => navigate("/dashboard/manage-datalist")}
          >
            Manage Menu
          </Nav.Link>
        </Nav>

        <Nav.Link className="logout-link" onClick={handleLogout}>
          Logout <BoxArrowRight />
        </Nav.Link>
      </aside>

      {/* MAIN */}
      <div className="main-content">
        <Navbar className="top-navbar p-3">
          <Container fluid>
            <Navbar.Text className="header-title">Edit Profile</Navbar.Text>

            <Nav className="ms-auto align-items-center gap-2">
              <span>{userLogin?.username}</span>
              <PersonCircle size={22} />
            </Nav>
          </Container>
        </Navbar>

        <Container
          fluid
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "calc(100vh - 120px)" }}
        >
          <Form
            onSubmit={handleSubmit}
            style={{ maxWidth: 420, width: "100%" }}
            className="text-center"
          >
            <PersonCircle size={120} className="text-secondary mb-3" />

            <Form.Group className="mb-3">
              <Form.Control
                name="nama_lengkap"
                value={form.nama_lengkap}
                onChange={handleChange}
                placeholder="Nama Lengkap"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Username"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                name="no_tel"
                type="tel"
                value={form.no_tel}
                onChange={handleChange}
                placeholder="Nomor Telepon"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Control
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password (opsional)"
              />
            </Form.Group>

            <Button type="submit" variant="danger" className="w-100">
              Konfirmasi
            </Button>
          </Form>
        </Container>

        {/* Toast Container */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <footer className="footer text-center py-2">KEDAI GSWEET</footer>
      </div>
    </div>
  );
};

export default EditUserProfile;
