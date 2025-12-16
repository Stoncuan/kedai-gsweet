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
  Card,
} from "react-bootstrap";
import { PersonCircle, BoxArrowRight } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/style/EditUser.css";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nama_lengkap: "",
    username: "",
    no_tel: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${id}`)
      .then((res) => {
        const data = res.data; // 🔥 BUKAN res.data[0]

        setForm({
          nama_lengkap: data.nama_lengkap || "",
          username: data.username || "",
          no_tel: data.no_tel || "",
          email: data.email || "",
          password: "",
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Gagal memuat data user");
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(`http://localhost:5000/users/editUser/${id}`, form);
      toast.success("User berhasil diperbarui ✅");
      setTimeout(() => {
        navigate("/dashboard/manage-user");
      }, 1500);
    } catch {
      toast.error("Gagal update user ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      {/* ================= SIDEBAR ================= */}
      <aside className="sidebar">
        <div className="sidebar-logo-section">
          <Image src="/logoooo.png" className="sidebar-logo" />
          <span className="sidebar-admin">ADMIN</span>
        </div>

        <Nav className="flex-column sidebar-links">
          <Nav.Link className="link-item" href="/dashboard">
            Dashboard
          </Nav.Link>
          <Nav.Link
            className="link-item active-link"
            href="/dashboard/manage-user"
          >
            Manage User
          </Nav.Link>
          <Nav.Link className="link-item" href="/dashboard/manage-datalist">
            Manage Menu
          </Nav.Link>
        </Nav>

        <Nav.Link className="logout-link" onClick={handleLogout}>
          Logout <BoxArrowRight />
        </Nav.Link>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <div className="main-content">
        <Navbar className="top-navbar p-3">
          <Container fluid>
            <Navbar.Text className="header-title">Edit User</Navbar.Text>
            {/* USER PROFILE */}
            <Nav
              className="ms-auto align-items-center gap-2"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/dashboard/profile")}
            >
              <span className="fw-semibold">{username}</span>
              <PersonCircle size={24} />
            </Nav>
          </Container>
        </Navbar>

        <Container fluid className="px-4 py-4">
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <h5 className="fw-bold text-danger mb-4">Form Edit User</h5>

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nama Lengkap</Form.Label>
                      <Form.Control
                        value={form.nama_lengkap}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            nama_lengkap: e.target.value,
                          })
                        }
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        value={form.username}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            username: e.target.value,
                          })
                        }
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>No Telp</Form.Label>
                      <Form.Control
                        value={form.no_tel}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            no_tel: e.target.value,
                          })
                        }
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            email: e.target.value,
                          })
                        }
                      />
                    </Form.Group>

                    {/* 🔐 PASSWORD BARU */}
                    <Form.Group className="mb-4">
                      <Form.Label>Password Baru</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Kosongkan jika tidak ingin mengganti"
                        onChange={(e) =>
                          setForm({
                            ...form,
                            password: e.target.value,
                          })
                        }
                      />
                      <small className="text-muted">
                        Password lama akan diganti jika diisi
                      </small>
                    </Form.Group>

                    <div className="d-flex justify-content-end gap-2">
                      <Button
                        variant="secondary"
                        onClick={() => navigate("/dashboard/manage-user")}
                      >
                        Batal
                      </Button>

                      <Button type="submit" variant="danger" disabled={loading}>
                        {loading ? "Menyimpan..." : "Update User"}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        <footer className="footer text-center py-2">KEDAI GSWEET</footer>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default EditUser;
