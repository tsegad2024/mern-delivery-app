import mongoose from "mongoose";
import Restaurant from "../models/Restaurant.js";
import dotenv from "dotenv";
import connectDB from "../config/connectDB.js";

dotenv.config();

connectDB();

const restaurants = [
  {
    name: "Pizza Palace",
    image: "/images/pizza.jpg",
    rating: 4.5,
    deliveryTime: "30 min",
  },
  {
    name: "Burger Hub",
    image: "/images/burger.jpg",
    rating: 4.2,
    deliveryTime: "25 min",
  },
  {
    name: "Taste of Ethiopia",
    image: "/images/ethiopian.jpg",
    rating: 4.7,
    deliveryTime: "40 min",
  },
  {
    name: "Coffee Express",
    image: "/images/coffee.jpg",
    rating: 4.3,
    deliveryTime: "20 min",
  },
  {
    name: "Sweet Treats",
    image: "/images/dessert.jpg",
    rating: 4.6,
    deliveryTime: "35 min",
  },
];

async function seedDB() {
  await Restaurant.deleteMany({});
  await Restaurant.insertMany(restaurants);
  console.log("Database seeded with restaurants!");
  mongoose.connection.close();
}

seedDB();
