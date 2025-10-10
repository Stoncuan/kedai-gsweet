import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Pastikan ini di-import
import Corousel from './component/CarouselExample.jsx';
import NavbarGwseet from './component/NavbarGwseet.jsx';
import MenuCard from './component/MenuCard.jsx';
import About from './component/About.jsx';

function App() {
  return (
    <div className="App">
      <NavbarGwseet/>
      <Corousel/>
      <MenuCard/>
      <About/>
    </div>
  );
}

export default App;
