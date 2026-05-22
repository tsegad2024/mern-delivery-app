import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['buyer', 'admin'], 
    default: 'buyer'
  },
  createdAt: { type: Date, default: Date.now },
  // For password reset
  resetToken: String,
  resetTokenExpiry: Date,
});

const User = mongoose.model('User', userSchema);
export default User;