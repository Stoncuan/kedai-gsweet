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
} from "react-bootstrap";
import {
  BiUserCircle,
  BiLogOut,
  BiPlus,
  BiFile,
  BiTrash,
  BiPencil,
} from "react-icons/bi";
import { BoxArrowRight } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "../assets/style/ManageUser.css";

const ManageUserDashboard = () => {
  const [userData, setUserData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [showDetail, setShowDetail] = useState(false);
  const [detailUser, setDetailUser] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!token) {
    navigate("/login");
    return;
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users");
      setUserData(res.data);
    } catch {
      toast.error("Gagal mengambil data user");
    }
  };

  const handleDetail = (row) => {
    setDetailUser(row);
    setShowDetail(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin hapus user ini?")) return;
    await axios.delete(`http://localhost:5000/users/deleteUser/${id}`);
    toast.success("User dihapus");
    fetchUser();
  };

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
      {/* SIDEBAR */}
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

      {/* MAIN */}
      <div className="main-content">
        <Navbar className="top-navbar p-3">
          <Container fluid>
            <Navbar.Text className="header-title">Manage User</Navbar.Text>
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
          />
        </Container>

        <footer className="footer text-center py-2">KEDAI GSWEET</footer>
      </div>

      {/* DETAIL MODAL */}
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
