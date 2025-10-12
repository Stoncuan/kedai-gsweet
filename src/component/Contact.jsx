import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../assets/style/Contact.css'

import { Container, Row, Col, Card } from "react-bootstrap";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaInstagram,
  FaUtensils,
} from "react-icons/fa"; // Import icons dari react-icons (install: npm install react-icons)

function Contact() {
  const mapEmbedUrl =
    "https://maps.google.com/maps?q=Jl+Nusantara+V,+Wosi,+Manokwari&t=&z=15&ie=UTF8&iwloc=&output=embed";
  const customBgColor = "#E8988A";
  const customFontColor = "#FFFFFF";
  const mapHeaderBg = "#E8988A";

  return (
    <>
      <Container className="mt-5 mb-5" id="contact">
        <div className="contact-container">
          <h2 className="contact-header mb-4">
            <FaUtensils /> Kontak GSweet
          </h2>

          <Row className="align-items-stretch d-flex">
            <Col md={6} className="mb-4">
              <Card className="contact-card h-100">
                <h5>
                  <FaUtensils /> Hubungi GSweet
                </h5>
                <p
                  className="mb-4"
                  style={{ color: "#666", fontStyle: "italic" }}
                >
                  Maniskan Harimu bersama GSweet
                </p>
                <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                  <li className="contact-item">
                    <FaMapMarkerAlt /> <strong>Alamat: </strong> Jl Nusantara V,
                    Wosi, Manokwari
                  </li>
                  <li className="contact-item">
                    <FaPhoneAlt /> <strong>Telepon:</strong> 0812-3456-7890
                  </li>
                  <li className="contact-item">
                    <FaInstagram /> <strong>Instagram:</strong>
                    <a
                      href="https://www.instagram.com/gsweetpatisserie?igsh=MTdwZTFpOGFzcHRibA"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @gsweetpatisserie
                    </a>
                  </li>
                </ul>
              </Card>
            </Col>

            <Col md={6} className="mb-4">
              <Card className="map-card h-100 d-flex flex-column">
                <div className="map-header mb-0">
                  <FaMapMarkerAlt /> Lokasi Kedai GSweet
                </div>

                <div className="map-iframe-container">
                  <iframe
                    title="Lokasi GSweet Patisserie"
                    src={mapEmbedUrl}
                    className="map-iframe"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}

export default Contact;
