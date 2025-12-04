import "bootstrap/dist/css/bootstrap.min.css";

// Navbar CSS
import "../assets/style/Navbar.css";
import { Navbar, Container, Nav } from "react-bootstrap";

// Carousel CSS
import { Carousel, Container } from "react-bootstrap";
import "../assets/style/Corousel.css"; // Import CSS kustom (buat file ini nanti)

// MenuCard CSS
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/style/MenuCard.css";

function Home() {
  return (
    <>
      {/* Navbar */}
      <Navbar expand="lg" fixed="top" className="navbar-gsweet">
        <Container fluid>
          <div className="logo-container">
            <img width={90} src="/logoooo.png" alt="GSweet Logo" />
            <Navbar.Brand href="#">
              <h4>Kedai GSweet</h4>
            </Navbar.Brand>
          </div>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#home" className="nav-link-custom">
                Home
              </Nav.Link>
              <Nav.Link href="#menu" className="nav-link-custom">
                Menu
              </Nav.Link>
              <Nav.Link href="#about" className="nav-link-custom">
                About
              </Nav.Link>
              <Nav.Link href="#contact" className="nav-link-custom">
                Contact
              </Nav.Link>{" "}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* end Navbar */}

      {/* Corousel */}
      <Container id="home" fluid className="px-0 my-5">
        <div className="carousel-wrapper">
          <Carousel
            fade={true} // Efek fade halus untuk transisi menarik
            indicators={true}
            controls={true}
            interval={6000} // Auto-slide setiap 6 detik
            className="best-seller-carousel"
          >
            <Carousel.Item>
              <div className="image-container">
                <img
                  className="carousel-image"
                  src="/image/seblak.jpg"
                  alt="Nasi Goreng Spesial"
                />
                <div className="image-overlay"></div>
                <div className="caption-overlay">
                  <div className="caption-content">
                    <h3>Seblak</h3>
                    <p>Seblak komplit yang Bikin Lidah Bergoyang!.</p>
                    <span className="price">Rp 25.000</span>
                  </div>
                </div>
              </div>
            </Carousel.Item>

            <Carousel.Item>
              <div className="image-container">
                <img
                  className="carousel-image"
                  src="/image/MieJebew.jpg"
                  alt="Kebab"
                />
                <div className="image-overlay"></div>
                <div className="caption-overlay">
                  <div className="caption-content">
                    <h3>Mie Jebew</h3>
                    <p>Mie Jebew, Rasanya Bikin Ketagihan!.</p>
                    <span className="price">Rp 18.000</span>
                  </div>
                </div>
              </div>
            </Carousel.Item>

            <Carousel.Item>
              <div className="image-container">
                <img
                  className="carousel-image"
                  src="/image/Brownies.jpg"
                  alt="Pizza Pepperoni"
                />
                <div className="image-overlay"></div>
                <div className="caption-overlay">
                  <div className="caption-content">
                    <h3>Brownies</h3>
                    <p>
                      Brownies yang Lembut dan Kaya, Camilan Sempurna untuk
                      Pecinta Cokelat!.
                    </p>
                    <span className="price">Rp 85.000</span>
                  </div>
                </div>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
      </Container>
      {/* end Corousel */}

      {/* Menu */}

      {/* end Menu */}
    </>
  );
}

export default Home;
