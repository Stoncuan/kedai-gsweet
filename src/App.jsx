import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Pastikan ini di-import
import Corousel from "./user/CarouselExample.jsx";
import NavbarGwseet from "./user/NavbarGwseet.jsx";
import MenuCard from "./user/MenuCard.jsx";
import About from "./user/About.jsx";
import Contact from "./user/Contact.jsx";
import Footer from "./user/Footer.jsx";
import Login from "./auth/Login.jsx";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavbarGwseet />
      <Corousel />
      <MenuCard />
      <About />
      <Contact />
      <Footer />

      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
