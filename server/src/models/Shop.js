// models/Shop.js
import mongoose from 'mongoose';

const shopSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  shopName: { type: String, required: true, unique: true },
  shopDescription: { type: String },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const Shop = mongoose.model('Shop', shopSchema);
export default Shop;