import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/style/MenuCard.css";
import axios from "axios";

export default class MenuCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      loading: true,
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5000/menu`)
      .then((res) => {
        this.setState({
          menus: res.data,
          loading: false,
        });
      })
      .catch((error) => {
        console.error("Gagal mengambil menu:", error);
        this.setState({ loading: false });
      });
  }

  render() {
    const { menus, loading } = this.state;

    if (loading) {
      return (
        <Container className="py-5 text-center">
          <h5>Loading menu...</h5>
        </Container>
      );
    }

    return (
      <Container
        id="menu"
        fluid
        className="py-5"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <h2 className="text-center mb-4 text-dark fw-bold">
          Daftar Menu GSweet
        </h2>

        <Row xs={1} md={2} lg={4} className="g-4">
          {menus.map((menu) => (
            <Col key={menu.id}>
              <Card
                className="h-100 shadow-sm menu-card"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 25px rgba(232, 152, 138, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 8px rgba(51, 51, 51, 0.1)";
                }}
              >
                <Card.Img
                  variant="top"
                  src={`http://localhost:5000/uploads/${menu.gambar}`} // 🔥 dari backend
                  alt={menu.nama}
                  className="imgMenu"
                />

                <Card.Body className="d-flex flex-column text-white">
                  <Card.Title className="fw-bold mb-2 menuName">
                    {menu.nama_menu}
                  </Card.Title>

                  <Card.Text className="flex-grow-1 cardText">
                    {menu.deskripsi}
                  </Card.Text>

                  <div className="d-flex justify-content-between align-items-end mt-2">
                    <span className="fw-bold" style={{ fontSize: "1.1rem" }}>
                      Rp {Number(menu.harga).toLocaleString("id-ID")}
                    </span>

                    <Button
                      variant="outline-light"
                      className="rounded-pill px-3"
                      size="sm"
                      onClick={() => {
                        const phoneNumber = "6281234567890";
                        const message = `Halo Admin GSweet, saya ingin memesan:\n\nNama Menu: ${
                          menu.nama_menu
                        }\nHarga: Rp ${menu.harga.toLocaleString("id-ID")}`;
                        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                          message
                        )}`;
                        window.open(url, "_blank");
                      }}
                    >
                      Pesan
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}
