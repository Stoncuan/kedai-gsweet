import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Pastikan ini di-import


import Login from "./auth/Login.jsx";
import Home from "./user/Home.jsx";
import Dashboard from "./admin/Dashboard.jsx";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Dashboard />} />
        
      </Routes>
    </div>
  );
}

export default App;
