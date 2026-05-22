// routes/restaurants.js
import express from "express";
import { getRestaurants, createRestaurant } from "../controllers/restourantController.js";

const router = express.Router();

// GET all restaurants
router.get("/restaurants", getRestaurants);

// POST new restaurant
router.post("/create-restaurant", createRestaurant);

export default router;
