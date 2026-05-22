// models/ShopRequest.js
import mongoose from 'mongoose';

const shopRequestSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  shopName: { type: String, required: true },
  shopDescription: { type: String },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  },
  requestedAt: { type: Date, default: Date.now },
  respondedAt: { type: Date },
  adminNotes: { type: String }, // why approved/rejected
});

const ShopRequest = mongoose.model('ShopRequest', shopRequestSchema);
export default ShopRequest;