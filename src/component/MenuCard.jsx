import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/style/MenuCard.css";

import axios from "axios";
import { API_URL } from "../data/url.js";

export default class MenuCard extends Component {
  constructor(props){
    super(props);

    this.state = {
      menus: []
    }
  }

  componentDidMount() {
    axios.get(API_URL + "products").then((res) => {
      const menus = res.data;
      this.setState({ menus});
    })
    .catch((error) => {
      console.log("Error", error);
    })
  }


  render() {
    const {menus} = this.state;

    

    return (
      <Container
        id="menu"
        fluid
        className="py-5"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        {" "}
        {/* Background container untuk kontras */}
        <h2 className="text-center mb-4 text-dark fw-bold">
          Daftar Menu GSweet
        </h2>
        <Row xs={1} md={2} lg={4} className="g-4">
          {" "}
          {/* Grid responsive: 1 kolom di mobile, 2 di tablet, 3 di desktop */}
          
          {menus.map((menu) => (
            <Col key={menu.id}>
              <Card
                className="h-100 shadow-sm menu-card" // Custom class untuk styling
                style={{
                  backgroundColor: "#E8988A", // Warna utama card
                  border: "none",
                  borderRadius: "15px", // Rounded corners untuk tampilan modern
                  overflow: "hidden",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease", // Hover effect
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 25px rgba(232, 152, 138, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 8px rgba(0, 0, 0, 0.1)";
                }}
              >
                {/* Gambar Menu */}
                <Card.Img
                  variant="top"
                  src={`/image/${menu.gambar}`}
                  alt={menu.nama}
                  style={{
                    height: "200px",
                    objectFit: "cover", // Gambar fit tanpa distorsi
                    width: "100%",
                  }}
                  
                  
                />

                {/* Body Card */}
                <Card.Body className="d-flex flex-column text-white">
                  <Card.Title
                    className="fw-bold mb-2 menuName"
                    style={{ color: "#FFFFFF", fontSize: "1.25rem" }}
                  >
                    {menu.nama}
                  </Card.Title>
                  <Card.Text
                    className="flex-grow-1"
                    style={{
                      color: "#FFFFFF",
                      opacity: 0.9,
                      lineHeight: "1.5",
                    }}
                  >
                    {menu.Deskripsi}
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-end mt-2">
                    <span className="fw-bold" style={{ fontSize: "1.1rem" }}>
                      RP. {menu.harga.toLocaleString('id-ID')}
                    </span>
                    <Button
                      variant="outline-light"
                      className="rounded-pill px-3"
                      size="sm"
                      onClick={() => alert(`Pesan ${menu.nama}`)} 
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
