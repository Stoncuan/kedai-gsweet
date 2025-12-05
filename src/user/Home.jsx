import "bootstrap/dist/css/bootstrap.min.css";

import NavbarGwseet from "./NavbarGwseet.jsx";
import MenuCard from "./MenuCard.jsx";
import About from "./About.jsx";
import Contact from "./Contact.jsx";
import Footer from "./Footer.jsx";
import Corousel from "./CarouselExample.jsx";

function Home() {
  return (
    <>
      <NavbarGwseet />
      <Corousel />
      <MenuCard />
      <About />
      <Contact />
      <Footer />
    </>
  );
}

export default Home;
