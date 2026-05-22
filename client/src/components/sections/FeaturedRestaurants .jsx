import React, { useEffect, useState } from "react";

const FeaturedRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  console.log("log: FeaturedRestaurants")
  useEffect(() => {
    fetch("http://localhost:5000/api/restaurants")
      .then((res) => res.json())
      .then((data) => setRestaurants(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="featured">
      <h2>Featured Restaurants</h2>
      <div className="restaurant-grid">
        {restaurants.map((restaurant, index) => (
          <div className="card" key={index}>
            <img src={restaurant.image} alt={restaurant.name} />
            <h3>{restaurant.name}</h3>
            <p>⭐ {restaurant.rating} | {restaurant.deliveryTime}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedRestaurants;
