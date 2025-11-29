import React from "react";
import { Container, Row, Col, Image, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/style/About.css";

function About() {
  return (
    <Container id="about" fluid className="mt-5 px-4 aboutContainer">
      <div className="text-center mb-5 aboutDiv">
        <h2 className="mb-3 aboutH2">About Gsweet</h2>
        <h4 className="text-muted aboutH4">Maniskan Harimu Bersama Gsweet</h4>
      </div>

      <Row className="align-items-center mb-5">
        <Col md={6} className="mb-4 mb-md-0">
          <div className="aboutUmkm">
            <p>
              Kedai Gsweet adalah UMKM kuliner yang berfokus pada sajian manis
              dan minuman segar khas lokal. Didirikan oleh generasi muda
              kreatif, GSweet hadir untuk menciptakan cita rasa yang menggugah
              selera dengan harga terjangkau.
            </p>
            <p>
              Di era modern yang serba canggih dan digitalisasi saat ini, agar
              pelanggan dapat mendapat pengalaman yang menyenangkan dan mudah
              saat mengunjungi kedai kami, maka kami menyediakan informasi
              seputar produk, promo, dan acara menarik secara online.
            </p>

            <ListGroup variant="flush" className="mt-4 listGroup">
              <ListGroup.Item className="listGroupItem">
                <strong>Dari Dapur GSweet ke Hatimu</strong>
                <br />
                Setiap resep kami diracik dengan cinta, menghadirkan kehangatan
                dalam setiap gigitan.
              </ListGroup.Item>

              <ListGroup.Item className="listGroupItem">
                <strong>Inovasi Rasa Lokal</strong>
                <br />
                Menggabungkan tradisi kuliner Indonesia dengan sentuhan modern
                untuk pengalaman yang unik.
              </ListGroup.Item>
            </ListGroup>
          </div>
        </Col>

        <Col md={6}>
          <div style={{ position: "relative" }}>
            <Image
              src="/kedai.jpg"
              alt="Foto Kedai GSweet"
              fluid
              rounded
              className="imgAbout"
            />

            <div className="overlayDekoratif">🍭 Manis Alami</div>
          </div>
        </Col>
      </Row>

      <div className="text-center mt-5">
        <p className="aboutFooterP">
          Kunjungi kami dan rasakan kelezatan yang tak terlupakan!
        </p>
      </div>
    </Container>
  );
}

export default About;
