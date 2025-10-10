import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/style/MenuCard.css'

// Data contoh menus (kamu bisa pass sebagai props atau fetch dari API)
const defaultMenus = [
  {
    id: 1,
    name: 'Baso Aci',
    description: 'lorem iprfewhhiew fhiwethiwet gheiwthwiethweit',
    image: '/image/BasoAci.jpg', // Ganti dengan path gambar asli
    price: 'Rp 25.000'
  },
  {
    id: 2,
    name: 'Seblak',
    description: 'rehrwjehr rewhrwjrhjwr rewbrjwbrjwr rjwebrjw',
    image: '/image/seblak.jpg',
    price: 'Rp 20.000'
  },
  {
    id: 3,
    name: 'Mie Jebew',
    description: 'Tart buah segar dengan custard creamy dan topping strawberry, kiwi, dan anggur. Sehat dan menyegarkan.',
    image: '/image/MieJebew.jpg',
    price: 'Rp 30.000'
  },

  {
    id: 4,
    name: 'Mie Jebew',
    description: 'Tart buah segar dengan custard creamy dan topping strawberry, kiwi, dan anggur. Sehat dan menyegarkan.',
    image: '/image/MieJebew.jpg',
    price: 'Rp 30.000'
  },

  {
    id: 5,
    name: 'Mie Jebew',
    description: 'Tart buah segar dengan custard creamy dan topping strawberry, kiwi, dan anggur. Sehat dan menyegarkan.',
    image: '/image/MieJebew.jpg',
    price: 'Rp 30.000'
  },
  {
    id: 6,
    name: 'Mie Jebew',
    description: 'Tart buah segar dengan custard creamy dan topping strawberry, kiwi, dan anggur. Sehat dan menyegarkan.',
    image: '/image/MieJebew.jpg',
    price: 'Rp 30.000'
  },
  
];

function MenuCard({ menus = defaultMenus }) { // Props menus opsional, default ke data contoh
  return (
    <Container fluid className="py-5" style={{ backgroundColor: '#f8f9fa' }}> {/* Background container untuk kontras */}
      <h2 className="text-center mb-4 text-dark fw-bold">Daftar Menu GSweet</h2>
      <Row xs={1} md={2} lg={3} className="g-4"> {/* Grid responsive: 1 kolom di mobile, 2 di tablet, 3 di desktop */}
        {menus.map((menu) => (
          <Col key={menu.id}>
            <Card 
              className="h-100 shadow-sm menu-card" // Custom class untuk styling
              style={{ 
                backgroundColor: '#E8988A', // Warna utama card
                border: 'none',
                borderRadius: '15px', // Rounded corners untuk tampilan modern
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease' // Hover effect
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(232, 152, 138, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
              }}
            >
              {/* Gambar Menu */}
              <Card.Img 
                variant="top" 
                src={menu.image} 
                alt={menu.name}
                style={{ 
                  height: '200px', 
                  objectFit: 'cover', // Gambar fit tanpa distorsi
                  width: '100%'
                }}
                onError={(e) => { // Fallback jika gambar tidak ditemukan
                  e.target.src = 'https://via.placeholder.com/300x200/E8988A/FFFFFF?text=No+Image';
                }}
              />
              
              {/* Body Card */}
              <Card.Body className="d-flex flex-column text-white">
                <Card.Title className="fw-bold mb-2" style={{ color: '#FFFFFF', fontSize: '1.25rem' }}>
                  {menu.name}
                </Card.Title>
                <Card.Text className="flex-grow-1" style={{ color: '#FFFFFF', opacity: 0.9, lineHeight: '1.5' }}>
                  {menu.description}
                </Card.Text>
                <div className="d-flex justify-content-between align-items-end mt-2">
                  <span className="fw-bold" style={{ fontSize: '1.1rem' }}>{menu.price}</span>
                  <Button 
                    variant="outline-light" 
                    className="rounded-pill px-3" 
                    size="sm"
                    onClick={() => alert(`Pesan ${menu.name}`)} // Contoh onClick, ganti dengan fungsi pesan
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

export default MenuCard;