import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/connectDB.js';
import authRoute from './routes/auth.js';
import shopRoute from './routes/shopRoute.js';
import restaurantRoutes from './routes/restaurants.js';


const app = express();

dotenv.config();

app.use(cors({
  origin: 'http://localhost:5173', // React's URL (CRA default)
  credentials: true  
}));
app.use(express.json());
connectDB();

app.use('/api/auth', authRoute);
app.use('/api', shopRoute);
app.use('/api', restaurantRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, 
  () =>{ 
    console.log(`Backend running on port ${PORT}`)
    
  }
);