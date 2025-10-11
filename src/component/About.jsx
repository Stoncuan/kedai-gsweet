import React from 'react';
import { Container, Row, Col, Image, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function About() {
  return (
    <Container fluid className="mt-5 px-4" style={{ backgroundColor: '#FFD4D4', minHeight: '100vh', padding: '2rem 0' }}>
      <div className="text-center mb-5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '2rem', borderRadius: '15px', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
        <h2 className="mb-3" style={{ color: '#D2691E', fontWeight: 'bold', textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}>About Gsweet</h2>
        <h4 className="text-muted" style={{ color: '#8B4513', fontStyle: 'italic' }}>Maniskan Harimu Bersama Gsweet</h4>
      </div>

      <Row className="align-items-center mb-5">
        <Col md={6} className="mb-4 mb-md-0">
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '1.5rem', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            <p className="lead" style={{ color: '#8B4513', lineHeight: '1.6' }}>
              Kedai Gsweet adalah UMKM kuliner yang berfokus pada sajian manis dan minuman segar khas lokal. Didirikan oleh generasi muda kreatif, GSweet hadir untuk menciptakan cita rasa yang menggugah selera dengan harga terjangkau.
            </p>
            <p style={{ color: '#8B4513', lineHeight: '1.6' }}>
              Di era modern yang serba canggih dan digitalisasi saat ini, agar pelanggan dapat mendapat pengalaman yang menyenangkan dan mudah saat mengunjungi kedai kami, maka kami menyediakan informasi seputar produk, promo, dan acara menarik secara online.
            </p>

            <ListGroup variant="flush" className="mt-4" style={{ borderRadius: '10px', overflow: 'hidden' }}>
              <ListGroup.Item style={{ backgroundColor: '#FFF8DC', border: '1px solid #FFD4D4', color: '#8B4513' }}>
                <strong>Dari Dapur GSweet ke Hatimu</strong><br />
                Setiap resep kami diracik dengan cinta, menghadirkan kehangatan dalam setiap gigitan.
              </ListGroup.Item>
              {/* Tambahkan item list tambahan untuk membuatnya lebih menarik */}
              <ListGroup.Item style={{ backgroundColor: '#FFF8DC', border: '1px solid #FFD4D4', color: '#8B4513' }}>
                <strong>Inovasi Rasa Lokal</strong><br />
                Menggabungkan tradisi kuliner Indonesia dengan sentuhan modern untuk pengalaman yang unik.
              </ListGroup.Item>
            </ListGroup>
          </div>
        </Col>

        <Col md={6}>
          <div style={{ position: 'relative' }}>
            <Image
              src="/kedai.jpg"
              alt="Foto Kedai GSweet"
              fluid
              rounded
              style={{
                maxHeight: '500px',
                width: '100%',
                objectFit: 'cover',
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                borderRadius: '15px',
                border: '3px solid #FFD4D4'
              }}
            />
            {/* Overlay dekoratif untuk menambah daya tarik */}
            <div style={{
              position: 'absolute',
              top: '-10px',
              right: '-10px',
              backgroundColor: '#FFD4D4',
              padding: '0.5rem 1rem',
              borderRadius: '50px',
              fontSize: '0.9rem',
              color: '#8B4513',
              fontWeight: 'bold',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
            }}>
              🍭 Manis Alami
            </div>
          </div>
        </Col>
      </Row>

      {/* Tambahkan elemen dekoratif di bawah untuk lebih menarik */}
      <div className="text-center mt-5">
        <p style={{ color: '#8B4513', fontSize: '1.1rem', fontStyle: 'italic' }}>
          Kunjungi kami dan rasakan kelezatan yang tak terlupakan!
        </p>
      </div>
    </Container>
  );
}

export default About;
