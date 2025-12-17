import React, { useState, useEffect, useMemo } from "react";
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
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/style/ManageMenuDashboard.css";
import { BoxArrowRight, PersonCircle} from "react-bootstrap-icons";

const ManageMenuDashboard = () => {
  const [menuData, setMenuData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // cek apa user punya token atau tidak
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }

  const [showDetail, setShowDetail] = useState(false);
  const [detailMenu, setDetailMenu] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/menu")
      .then((res) => setMenuData(res.data))
      .catch(() => toast.error("Gagal mengambil data menu"))
      .finally(() => setLoading(false));
  }, []);

  const handleDetail = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/menu/getMenu/${id}`);
      setDetailMenu(res.data);
      setShowDetail(true);
    } catch {
      toast.error("Gagal memuat detail menu");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus menu ini?")) return;

    try {
      await axios.delete(`http://localhost:5000/menu/deleteMenu/${id}`);
      setMenuData((prev) => prev.filter((item) => item.id !== id));
      toast.success("Menu berhasil dihapus ✅");
    } catch {
      toast.error("Gagal menghapus menu ❌");
    }
  };

  const filteredItems = useMemo(() => {
    return menuData.filter(
      (item) =>
        item.nama_menu?.toLowerCase().includes(filterText.toLowerCase()) ||
        item.harga?.toString().includes(filterText)
    );
  }, [menuData, filterText]);

  const columns = [
    {
      name: "No",
      selector: (row, index) => index + 1,
      width: "70px",
    },
    {
      name: "Nama Menu",
      selector: (row) => row.nama_menu,
      sortable: true,
    },
    {
      name: "Harga",
      selector: (row) => `Rp ${row.harga}`,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="menu-action-wrapper">
          <BiFile
            className="menu-action-icon detail"
            title="Detail"
            onClick={() => handleDetail(row.id)}
          />

          <BiTrash
            className="menu-action-icon menu-action-delete"
            title="Hapus"
            onClick={() => handleDelete(row.id)}
          />

          <BiPencil
            className="menu-action-icon menu-action-edit"
            title="Edit"
            onClick={() => navigate(`/dashboard/edit-menu/${row.id}`)}
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
          <Nav.Link className="link-item" href="/dashboard/manage-user">
            Manage User
          </Nav.Link>
          <Nav.Link className="link-item active-link">Manage Menu</Nav.Link>
        </Nav>

        <Nav.Link className="logout-link" onClick={handleLogout}>
          Logout <BoxArrowRight />
        </Nav.Link>
      </aside>

      {/* MAIN */}
      <div className="main-content">
        <Navbar className="top-navbar p-3">
          <Container fluid>
            <Navbar.Text className="header-title">Manage Menu</Navbar.Text>
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
              placeholder="Cari menu / harga..."
              style={{ maxWidth: 250 }}
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />

            <Button
              variant="danger"
              onClick={() => navigate("/dashboard/add-menu")}
            >
              Tambah Menu <BiPlus />
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

      {/* ================= MODAL DETAIL ================= */}
      <Modal
        show={showDetail}
        onHide={() => setShowDetail(false)}
        centered
        size="lg"
      >
        {detailMenu && (
          <>
            <Modal.Header closeButton>
              <Modal.Title className="text-danger fw-bold">
                Detail Menu
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <div className="text-center mb-3">
                <Image
                  src={`http://localhost:5000/uploads/${detailMenu.gambar}`}
                  rounded
                  fluid
                  style={{ maxHeight: 250 }}
                />
              </div>

              <h4 className="fw-bold text-danger">{detailMenu.nama_menu}</h4>

              <Badge bg="danger" className="mb-3">
                {new Intl.NumberFormat("id-ID", {
                  astyle: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(detailMenu.harga)}
              </Badge>

              <p className="mt-2">{detailMenu.deskripsi}</p>
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="outline-secondary"
                onClick={() => setShowDetail(false)}
              >
                Tutup
              </Button>

              <Button
                variant="danger"
                onClick={() => {
                  setShowDetail(false);
                  navigate(`/dashboard/edit-menu/${detailMenu.id}`);
                }}
              >
                Edit Menu
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ManageMenuDashboard;