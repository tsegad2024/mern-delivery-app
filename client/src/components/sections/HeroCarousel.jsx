import React, { useState, useEffect } from "react";

const images = [
  "/images/hero1.jpeg",
  "/images/hero2.jpg",
  "/images/hero3.jpg",
  "/images/hero4.jpg",
  "/images/hero5.jpg",
  "/images/hero6.jpg",
  "/images/hero7.jpg",

];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // change every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-carousel">
      <div
        className="carousel-track"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((img, index) => (
          <img key={index} src={img} alt={`Slide ${index}`} />
        ))}
      </div>

      <div className="hero-text">
        <h1>Fast, Fresh, Delivered to You</h1>
        <input type="text" placeholder="Search for food or restaurants..." />
        <button>Order Now</button>
      </div>
    </section>
  );
};

export default HeroCarousel;
