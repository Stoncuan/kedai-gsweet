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

const ManageMenuDashboard = () => {
  const [menuData, setMenuData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ===============================
  // FETCH DATA MENU
  // ===============================
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get("http://localhost:5000/menu");
        setMenuData(res.data);
      } catch (error) {
        console.error("Gagal mengambil data menu:", error);
        toast.error("Gagal mengambil data menu ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  // ===============================
  // DELETE MENU
  // ===============================
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus menu ini?")) return;

    try {
      await axios.delete(`http://localhost:5000/menu/deleteMenu/${id}`);

      setMenuData((prev) => prev.filter((item) => item.id !== id));

      toast.success("Menu berhasil dihapus ✅");
    } catch (error) {
      console.error("Gagal menghapus menu:", error);
      toast.error("Gagal menghapus menu ❌");
    }
  };

  // ===============================
  // FILTER DATA
  // ===============================
  const filteredItems = useMemo(() => {
    return menuData.filter(
      (item) =>
        item.nama_menu
          ?.toLowerCase()
          .includes(filterText.toLowerCase()) ||
        item.harga?.toString().includes(filterText)
    );
  }, [menuData, filterText]);

  // ===============================
  // KOLOM DATATABLE
  // ===============================
  const columns = [
    {
      name: "Nama Menu",
      selector: (row) => row.nama_menu,
      sortable: true,
    },
    {
      name: "Harga",
      selector: (row) => row.harga,
      sortable: true,
      right: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="action-icons">
          <BiFile className="icon detail" title="Detail" />
          <BiTrash
            className="icon delete"
            title="Hapus"
            onClick={() => handleDelete(row.id)}
            style={{ cursor: "pointer" }}
          />
          <BiPencil className="icon edit" title="Edit" />
        </div>
      ),
      ignoreRowClick: true,
    },
  ];

  // ===============================
  // STYLE DATATABLE
  // ===============================
  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#fbd6db",
      },
    },
    headCells: {
      style: {
        fontWeight: "700",
        color: "#ae0032",
      },
    },
    rows: {
      style: {
        backgroundColor: "#fff0f2",
      },
    },
    cells: {
      style: {
        color: "#ae0032",
      },
    },
  };

  return (
    <div className="page-wrapper">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-logo-section">
          <Image
            src="https://i.ibb.co/ZdSg5bx/gsweet-logo.png"
            roundedCircle
            className="sidebar-logo"
            alt="GSweet Logo"
          />
          <span className="sidebar-admin">ADMIN</span>
        </div>

        <Nav className="flex-column sidebar-links">
          <Nav.Link className="link-item">Dashboard</Nav.Link>
          <Nav.Link className="link-item">Manage User</Nav.Link>
          <Nav.Link className="link-item active-link">Manage Menu</Nav.Link>
        </Nav>

        <Nav.Link className="logout-link">
          Logout <BiLogOut />
        </Nav.Link>
      </aside>

      {/* MAIN CONTENT */}
      <div className="main-content">
        <Navbar className="top-navbar p-3">
          <Container fluid>
            <Navbar.Text className="header-title">Manage Menu</Navbar.Text>
            <Nav className="ms-auto align-items-center gap-2">
              <span>User</span>
              <BiUserCircle size={22} />
            </Nav>
          </Container>
        </Navbar>

        <Container fluid className="px-4 py-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Form.Control
              type="text"
              placeholder="Cari menu / harga..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              style={{ maxWidth: "250px" }}
            />

            <Button
              variant="danger"
              onClick={() => navigate("/dashboard/add-menu")}
            >
              Tambah Menu <BiPlus />
            </Button>
          </div>

          {loading ? (
            <p>Loading data menu...</p>
          ) : (
            <DataTable
              columns={columns}
              data={filteredItems}
              customStyles={customStyles}
              pagination
              highlightOnHover
              responsive
            />
          )}
        </Container>

        <footer className="footer text-center py-2">
          KEDAI GSWEET
        </footer>
      </div>

      {/* TOAST */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ManageMenuDashboard;
