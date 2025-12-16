import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Pastikan ini di-import

import Login from "./auth/Login.jsx";
import Home from "./user/Home.jsx";
import Dashboard from "./admin/Dashboard.jsx";
import AddMenu from "./admin/AddMenu.jsx";
import ManageUser from "./admin/ManageUser.jsx";
import ManageMenuDashboard from "./admin/ManageMenuDashboard.jsx";
import EditProfile from "./admin/EditProfile.jsx";
import AddUser from "./admin/AddUser.jsx";
import EditMenu from "./admin/EditMenu.jsx";
import EditUser from "./admin/EditUser.jsx";
import Profile from "./admin/Profile.jsx";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />
         <Route
          path="/dashboard/manage-datalist"
          element={<ManageMenuDashboard />}
        />

        {/* Menu */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/add-menu" element={<AddMenu />} />
        <Route path="/dashboard/edit-menu/:id" element={<EditMenu />} />
        
        {/* user */}
        <Route path="/dashboard/add-user" element={<AddUser />} />
        <Route path="/dashboard/manage-user" element={<ManageUser />} />
        <Route path="/dashboard/edit-user/:id" element={<EditUser />} />
       <Route path="/dashboard/edit-profile/:id" element={<EditProfile />} />
        <Route path="/dashboard/profile" element={<Profile />} />
      </Routes>
      
    </div>

    
  );
}

export default App;
