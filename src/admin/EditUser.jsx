import React, { useEffect, useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  Image,
  Button,
  Offcanvas,
} from "react-bootstrap";
import { PersonCircle, BoxArrowRight, List } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/style/EditUser.css";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nama_lengkap: "",
    username: "",
    no_tel: "",
    email: "",
    password: "",
  });

  // Cek token dan resize listener
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [navigate]);

  // Ambil data user
  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${id}`)
      .then((res) => {
        const data = res.data;
        setForm({
          nama_lengkap: data.nama_lengkap || "",
          username: data.username || "",
          no_tel: data.no_tel || "",
          email: data.email || "",
          password: "",
        });
        setUsername(data.username || "");
      })
      .catch(() => toast.error("Gagal memuat data user"));
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setSidebarOpen(false);
    navigate("/login");
  };

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
      {/* Sidebar Desktop */}
      {!isMobile && (
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
      )}

      {/* Sidebar Offcanvas Mobile */}
      {isMobile && (
        <Offcanvas
          show={sidebarOpen}
          onHide={() => setSidebarOpen(false)}
          className="sidebar-offcanvas"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <div className="sidebar-logo-section">
                <Image src="/logoooo.png" className="sidebar-logo" />
                <span className="sidebar-admin">ADMIN</span>
              </div>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column sidebar-links">
              <Nav.Link
                href="/dashboard"
                className="link-item"
                onClick={() => setSidebarOpen(false)}
              >
                Dashboard
              </Nav.Link>
              <Nav.Link
                href="/dashboard/manage-user"
                className="link-item active-link"
                onClick={() => setSidebarOpen(false)}
              >
                Manage User
              </Nav.Link>
              <Nav.Link
                href="/dashboard/manage-datalist"
                className="link-item"
                onClick={() => setSidebarOpen(false)}
              >
                Manage Menu
              </Nav.Link>
            </Nav>

            <Nav.Link className="logout-link" onClick={handleLogout}>
              Logout <BoxArrowRight />
            </Nav.Link>
          </Offcanvas.Body>
        </Offcanvas>
      )}

      {/* Main Content */}
      <div className="main-content">
        <Navbar className="top-navbar p-3">
          {isMobile && (
            <List
              size={28}
              className="hamburger-icon"
              onClick={() => setSidebarOpen(true)}
              aria-label="Toggle menu"
              style={{ cursor: "pointer", color: "#ae0032" }}
            />
          )}
          <Navbar.Text className="header-title">Edit User</Navbar.Text>

          <Nav
            className="ms-auto align-items-center gap-2"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/dashboard/profile")}
          >
            <span className="fw-semibold">{username}</span>
            <PersonCircle size={24} />
          </Nav>
        </Navbar>

        <Container fluid className="px-4 py-4">
          <form onSubmit={handleSubmit}>
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6">
                <div className="card shadow-sm border-0">
                  <div className="card-body">
                    <h5 className="fw-bold text-danger mb-4">Form Edit User</h5>

                    <div className="mb-3">
                      <label htmlFor="namaLengkap" className="form-label">
                        Nama Lengkap
                      </label>
                      <input
                        id="namaLengkap"
                        className="form-control"
                        value={form.nama_lengkap}
                        onChange={(e) =>
                          setForm({ ...form, nama_lengkap: e.target.value })
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">
                        Username
                      </label>
                      <input
                        id="username"
                        className="form-control"
                        value={form.username}
                        onChange={(e) =>
                          setForm({ ...form, username: e.target.value })
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="noTelp" className="form-label">
                        No Telp
                      </label>
                      <input
                        id="noTelp"
                        className="form-control"
                        value={form.no_tel}
                        onChange={(e) =>
                          setForm({ ...form, no_tel: e.target.value })
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="form-control"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="passwordBaru" className="form-label">
                        Password Baru
                      </label>
                      <input
                        id="passwordBaru"
                        type="password"
                        className="form-control"
                        placeholder="Kosongkan jika tidak ingin mengganti"
                        onChange={(e) =>
                          setForm({ ...form, password: e.target.value })
                        }
                      />
                      <small className="text-muted">
                        Password lama akan diganti jika diisi
                      </small>
                    </div>

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
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Container>

        <footer className="footer text-center py-2">KEDAI GSWEET</footer>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default EditUser;
