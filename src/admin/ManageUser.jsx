import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import {
  Container,
  Navbar,
  Nav,
  Button,
  Image,
  Form,
  Modal,
  Badge,
  Offcanvas,
} from "react-bootstrap";
import { BiPlus, BiFile, BiTrash, BiPencil } from "react-icons/bi";
import { PersonCircle, BoxArrowRight, List } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "../assets/style/ManageUser.css";

const ManageUserDashboard = () => {
  const [userData, setUserData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [showDetail, setShowDetail] = useState(false);
  const [detailUser, setDetailUser] = useState(null);
  const [username, setUsername] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setSidebarOpen(false);
    navigate("/login");
  };

  // Token check on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
  }, [navigate]);

  // Resize listener for isMobile updates
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch users
  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users");
      setUserData(res.data);
    } catch {
      toast.error("Gagal mengambil data user");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleDetail = (row) => {
    setDetailUser(row);
    setShowDetail(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin hapus user ini?")) return;
    try {
      await axios.delete(`http://localhost:5000/users/deleteUser/${id}`);
      toast.success("User dihapus");
      fetchUser();
    } catch {
      toast.error("Gagal menghapus user");
    }
  };

  // Filter user list based on filterText
  const filteredItems = useMemo(() => {
    return userData.filter(
      (u) =>
        u.nama_lengkap.toLowerCase().includes(filterText.toLowerCase()) ||
        u.no_tel.includes(filterText)
    );
  }, [userData, filterText]);

  const columns = [
    { name: "No", selector: (row, i) => i + 1, width: "70px" },
    { name: "Nama Lengkap", selector: (row) => row.nama_lengkap },
    { name: "No Telp", selector: (row) => row.no_tel },
    {
      name: "Action",
      cell: (row) => (
        <div className="menu-action-wrapper">
          <BiFile
            className="menu-action-icon detail"
            onClick={() => handleDetail(row)}
          />
          <BiTrash
            className="menu-action-icon menu-action-delete"
            onClick={() => handleDelete(row.id)}
          />
          <BiPencil
            className="menu-action-icon menu-action-edit"
            onClick={() => navigate(`/dashboard/edit-user/${row.id}`)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      {/* Sidebar desktop */}
      {!isMobile && (
        <aside className="sidebar">
          <div className="sidebar-logo-section">
            <Image src="/logoooo.png" className="sidebar-logo" />
            <span className="sidebar-admin">ADMIN</span>
          </div>

          <Nav className="flex-column sidebar-links">
            <Nav.Link href="/dashboard" className="link-item">
              Dashboard
            </Nav.Link>
            <Nav.Link
              href="/dashboard/manage-user"
              className="link-item active-link"
            >
              Manage User
            </Nav.Link>
            <Nav.Link href="/dashboard/manage-datalist" className="link-item">
              Manage Menu
            </Nav.Link>
          </Nav>

          <Nav.Link className="logout-link" onClick={handleLogout}>
            Logout <BoxArrowRight />
          </Nav.Link>
        </aside>
      )}

      {/* Sidebar Offcanvas mobile */}
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
          <Container fluid>
            {isMobile && (
              <List
                size={28}
                className="hamburger-icon"
                onClick={() => setSidebarOpen(true)}
                aria-label="Toggle menu"
                style={{ cursor: "pointer", color: "#ae0032" }}
              />
            )}
            <Navbar.Text className="header-title">Manage User</Navbar.Text>
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

        <Container fluid className="px-4 py-3">
          <div className="d-flex justify-content-between mb-3">
            <Form.Control
              placeholder="Cari nama / no tel..."
              style={{ maxWidth: 250 }}
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
            <Button
              variant="danger"
              onClick={() => navigate("/dashboard/add-user")}
            >
              Tambah User <BiPlus />
            </Button>
          </div>

          <DataTable
            columns={columns}
            data={filteredItems}
            pagination
            highlightOnHover
            responsive
            progressPending={userData.length === 0}
          />
        </Container>

        <footer className="footer text-center py-2">KEDAI GSWEET</footer>
      </div>

      {/* Detail Modal */}
      <Modal show={showDetail} onHide={() => setShowDetail(false)} centered>
        {detailUser && (
          <>
            <Modal.Header closeButton>
              <Modal.Title className="text-danger fw-bold">
                Detail User
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                <b>Nama:</b> {detailUser.nama_lengkap}
              </p>
              <p>
                <b>Username:</b> {detailUser.username}
              </p>
              <p>
                <b>No Tel:</b> {detailUser.no_tel}
              </p>
              <p>
                <b>Email:</b> {detailUser.email}
              </p>
              <Badge bg="secondary">ID #{detailUser.id}</Badge>
            </Modal.Body>
          </>
        )}
      </Modal>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ManageUserDashboard;
