import React from "react";
import { Carousel, Container } from "react-bootstrap";
import "../assets/style/Corousel.css"; // Import CSS kustom (buat file ini nanti)

const CarouselExample = () => {
  return (
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
                  <p>
                    Seblak komplit yang Bikin Lidah Bergoyang!.
                  </p>
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
                  <p>
                   Mie Jebew, Rasanya Bikin Ketagihan!.
                  </p>
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
                    Brownies yang Lembut dan Kaya, Camilan Sempurna untuk Pecinta Cokelat!.
                  </p>
                  <span className="price">Rp 85.000</span>
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
