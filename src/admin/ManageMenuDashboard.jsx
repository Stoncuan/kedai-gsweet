import React, { useEffect, useState, useMemo } from "react";
import {
  Container,
  Navbar,
  Nav,
  Button,
  Image,
  Offcanvas,
  Form,
  Modal,
  Badge,
} from "react-bootstrap";
import { BiPlus, BiFile, BiTrash, BiPencil } from "react-icons/bi";
import { BoxArrowRight, PersonCircle, List } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";
import "../assets/style/ManageMenuDashboard.css";

const ManageMenuDashboard = () => {
  const [menuData, setMenuData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setSidebarOpen(false);
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const decoded = jwtDecode(token);
      setUsername(decoded.username); // SESUAI ISI TOKEN
    } catch (error) {
      console.error("Token tidak valid");
      navigate("/login");
    }
  }, [navigate]);

  // Resize handler for isMobile
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch menu data
  useEffect(() => {
    axios
      .get("http://localhost:5000/menu")
      .then((res) => setMenuData(res.data))
      .catch(() => toast.error("Gagal mengambil data menu"))
      .finally(() => setLoading(false));
  }, []);

  // Table columns
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
      selector: (row) => "Rp " + Number(row.harga).toLocaleString("id-ID"),
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

  // Filtered list based on filter text
  const filteredItems = useMemo(
    () =>
      menuData.filter(
        (item) =>
          item.nama_menu?.toLowerCase().includes(filterText.toLowerCase()) ||
          item.harga?.toString().includes(filterText)
      ),
    [menuData, filterText]
  );

  // Detail modal states and handlers
  const [showDetail, setShowDetail] = useState(false);
  const [detailMenu, setDetailMenu] = useState(null);

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
            <Nav.Link href="/dashboard/manage-user" className="link-item">
              Manage User
            </Nav.Link>
            <Nav.Link href="/dashboard/manage-datalist" className="link-item active-link">Manage Menu</Nav.Link>
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
                className="link-item"
                onClick={() => setSidebarOpen(false)}
              >
                Manage User
              </Nav.Link>
              <Nav.Link
                className="link-item active-link"
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

      {/* Main content */}
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
            <Navbar.Text className="header-title">Manage Menu</Navbar.Text>
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
            progressPending={loading}
          />
        </Container>

        <footer className="footer text-center py-2">KEDAI GSWEET</footer>
      </div>

      {/* Modal Detail */}
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
                  currency: "IDR",
                  style: "currency",
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
