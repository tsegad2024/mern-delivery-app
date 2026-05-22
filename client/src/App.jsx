import axios from 'axios';

import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import Signup from "./pages/Signup";


import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Login from "./pages/Login";
import Profile from "./pages/Profile";
import RequestShop from "./pages/RequestShop";
import AdminDashboard from "./pages/AdminDashboard";


function App() {
  const [products, setProducts] = useState([]);
  return (
    <Router>
      <Navbar />
      <main className="max-w-4xl mx-auto p-6">
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* <h1 className="text-3xl font-bold mb-6 text-center">
                  Shop Menu
                </h1> */}
                <HomePage/>
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/request-shop" element={<RequestShop/>}/>
          <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
        </Routes>
      </main>
    </Router>
  );
}

export default App;