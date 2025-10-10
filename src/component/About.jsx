import React from 'react';
import { Container, Row, Col, Image, ListGroup } from 'react-bootstrap';

function About() {
  return (
    <Container fluid className="mt-5 px-4">
      <h2 className="text-center mb-2">About GSweet</h2>
      <h4 className="text-center mb-4 text-muted">Maniskan Harimu Bersama GSweet</h4>

      <Row className="align-items-center mb-5">
        <Col md={6}>
          <p>
            Kedai GSweet adalah UMKM kuliner yang berfokus pada sajian manis dan minuman segar khas lokal. Didirikan oleh generasi muda kreatif, GSweet hadir untuk menciptakan cita rasa yang menggugah selera dengan harga terjangkau.
          </p>
          <p>
            Di era modern yang serba canggih dan digitalisasi saat ini, agar pelanggan dapat mendapat pengalaman yang menyenangkan dan mudah saat mengunjungi kedai kami, maka kami menyediakan informasi seputar produk, promo, dan acara menarik secara online.
          </p>

          <ListGroup variant="flush" className="mt-4">
            <ListGroup.Item>
              <strong>Dari Dapur GSweet ke Hatimu</strong><br />
              Setiap resep kami diracik dengan cinta, menghadirkan kehangatan dalam setiap gigitan.
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={6}>
          <Image
            src="/kedai.jpg"
            alt="Foto Kedai GSweet"
            fluid
            rounded
            style={{
              maxHeight: '500px',
              width: '100%',
              objectFit: 'cover',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default About;