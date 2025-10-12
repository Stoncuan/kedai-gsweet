import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaInstagram, FaWhatsapp, FaTiktok, FaArrowUp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#FFE4E1",
        color: "#000",
        padding: "40px 0 20px",
      }}
    >
      <Container>
        <Row className="text-center text-md-start">
          <Col md={4} className="mb-4">
            <h4 className="fw-bold" style={{ color: "#E75480" }}>
              Kedai GSweet
            </h4>
            <p style={{ maxWidth: "300px" }}>
              Cita Rasa Manis, nikmati aneka kue dan minuman khas yang dibuat
              dengan bahan pilihan dan cinta
            </p>
          </Col>

          <Col md={4} className="mb-4">
            <h5
              className="fw-bold mb-3"
              style={{
                borderBottom: "2px solid #E75480",
                display: "inline-block",
                paddingBottom: "5px",
              }}
            >
              Quick Links
            </h5>
            <ul style={{ listStyle: "none", padding: 0, lineHeight: "2" }}>
              <li>
                <a
                  href="#home"
                  style={{ color: "#000", textDecoration: "none" }}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#menu"
                  style={{ color: "#000", textDecoration: "none" }}
                >
                  Menu
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  style={{ color: "#000", textDecoration: "none" }}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  style={{ color: "#000", textDecoration: "none" }}
                >
                  Contact
                </a>
              </li>
            </ul>
          </Col>

          <Col md={4} className="mb-4">
            <h5
              className="fw-bold mb-3"
              style={{
                borderBottom: "2px solid #E75480",
                display: "inline-block",
                paddingBottom: "5px",
              }}
            >
              Contact Us
            </h5>
            <p>📍 Jl. Nusantara V, Wosi, Manokwari</p>
            <p>☎ 0812-1504-8119</p>
            <p>🕒 Senin–Sabtu: 08.00–21.00 WIT</p>
          </Col>
        </Row>

        <hr style={{ borderColor: "rgba(0,0,0,0.2)" }} />

        <Row className="text-center mb-3">
          <Col>
            <a
              href="https://www.instagram.com/gsweetpatisserie?igsh=MTdwZTFpOGFzcHRibA"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#000", margin: "0 10px", fontSize: "1.5rem" }}
            >
              <FaInstagram />
            </a>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#000", margin: "0 10px", fontSize: "1.5rem" }}
            >
              <FaWhatsapp />
            </a>
          </Col>
        </Row>

        <Row className="text-center">
          <Col>
            <p className="mb-0">
              © 2025 <strong>Kedai GSweet</strong> — All Rights Reserved
            </p>
            <p>
              Designed by{" "}
              <span style={{ color: "#E75480", fontWeight: "bold" }}>
                Kelompok 2
              </span>
            </p>
          </Col>
        </Row>

        <a
          href="#top"
          style={{
            position: "fixed",
            right: "25px",
            bottom: "25px",
            backgroundColor: "#E75480",
            color: "white",
            borderRadius: "50%",
            padding: "10px 13px",
            textDecoration: "none",
            fontSize: "1.2rem",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          }}
        >
          <FaArrowUp />
        </a>
      </Container>
    </footer>
  );
};

export default Footer;
