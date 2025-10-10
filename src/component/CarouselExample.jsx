import React from "react";
import { Carousel, Container } from "react-bootstrap";
import "../assets/style/Corousel.css"; // Import CSS kustom (buat file ini nanti)

const CarouselExample = () => {
  return (
    <Container fluid className="px-0 my-5">
      <div className="carousel-wrapper">
        <Carousel
          fade={true} // Efek fade halus untuk transisi menarik
          indicators={true}
          controls={true}
          interval={6000} // Auto-slide setiap 4 detik
          className="best-seller-carousel"
        >
          {/* Slide 1: Nasi Goreng */}
          <Carousel.Item>
            <div className="image-container">
              <img
                className="carousel-image"
                src="/image/BasoAci.jpg"
                alt="Nasi Goreng Spesial"
              />
              <div className="image-overlay"></div>
              <div className="caption-overlay">
                <div className="caption-content">
                  <h3>Baso Aci</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
                    atque perferendis non, ea aut eos dicta incidunt quia
                    cupiditate aspernatur.
                  </p>
                  <span className="price">Rp 25.000</span>
                </div>
              </div>
            </div>
          </Carousel.Item>

          {/* Slide 2: Burger */}
          <Carousel.Item>
            <div className="image-container">
              <img
                className="carousel-image"
                src="/image/Kebab.jpg"
                alt="Kebab"
              />
              <div className="image-overlay"></div>
              <div className="caption-overlay">
                <div className="caption-content">
                  <h3>Kebab</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Iste fugiat sequi autem totam inventore labore dolorem
                    incidunt voluptate ducimus quaerat.
                  </p>
                  <span className="price">Rp 35.000</span>
                </div>
              </div>
            </div>
          </Carousel.Item>

          {/* Slide 3: Pizza */}
          <Carousel.Item>
            <div className="image-container">
              <img
                className="carousel-image"
                src="/image/PisangAroma.jpg"
                alt="Pizza Pepperoni"
              />
              <div className="image-overlay"></div>
              <div className="caption-overlay">
                <div className="caption-content">
                  <h3>Pisang Aroma</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Blanditiis voluptates eius, sit harum at placeat
                    perspiciatis quis repellat corrupti alias!
                  </p>
                  <span className="price">Rp 45.000</span>
                </div>
              </div>
            </div>
          </Carousel.Item>

          {/* Slide 4: Sushi */}
          <Carousel.Item>
            <div className="image-container">
              <img
                className="carousel-image"
                src="/image/RotiBakar.jpg"
                alt="Sushi Set"
              />
              <div className="image-overlay"></div>
              <div className="caption-overlay">
                <div className="caption-content">
                  <h3>Roti Bakar</h3>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Placeat doloribus nihil accusamus natus autem sint
                    molestias, numquam non vitae officia.
                  </p>
                  <span className="price">Rp 50.000</span>
                </div>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    </Container>
  );
};

export default CarouselExample;
