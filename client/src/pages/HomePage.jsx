import React from "react";
import HeroCarousel from "../components/sections/HeroCarousel";
import FeaturedRestaurants from "../components/sections/FeaturedRestaurants ";

const HomePage = () => {
  return (
    <div>
      {/* Navbar */}
      {/* <nav className="navbar">
        <h2>QuickDelivery</h2>
        <ul>
          <li>Home</li>
          <li>Restaurants</li>
          <li>Track Order</li>
          <li>Contact</li>
        </ul>
        <button>Login / Signup</button>
      </nav> */}

      {/* Hero Section */}
      {/* <section className="hero">
        <h1>Fast, Fresh, Delivered to You</h1>
        <input type="text" placeholder="Search for food or restaurants..." />
        <button>Order Now</button>
      </section> */}
      <HeroCarousel/>
      {/* Featured Restaurants */}
      <FeaturedRestaurants/>
      {/* <section className="featured">
        <h2>Popular Restaurants</h2>
        <div className="restaurant-grid">
          <div className="card">
            <img src="/images/pizza.jpg" alt="Pizza Place" />
            <h3>Pizza Palace</h3>
            <p>⭐ 4.5 | 30 min</p>
          </div>
          <div className="card">
            <img src="/images/burger.jpg" alt="Burger Joint" />
            <h3>Burger Hub</h3>
            <p>⭐ 4.2 | 25 min</p>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer>
        <p>© 2026 QuickDelivery. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
