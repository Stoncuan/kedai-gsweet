import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/style/Navbar.css";

import { Navbar, Container, Nav } from "react-bootstrap";
function NavbarGwseet() {
  return (
    <>
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
    </>
  );
}

export default NavbarGwseet;
