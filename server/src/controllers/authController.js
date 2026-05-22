import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import TokenBlacklist from '../models/TokenBlacklist.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "Please fill in all fields" });

  try {
    if (await User.findOne({ email }))
      return res.status(409).json({ message: "Email already registered" });

    const hash = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hash });
    await user.save();

    res.json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Please fill in all fields" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid email or password" });

    // ✅ Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // adjust expiry as needed
    );

    res.json({
      message: "Login successful",
      token, // send token back
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    console.log("log: logout after token var")
    if (token) {
      // Add token to blacklist
      await TokenBlacklist.create({ token });
    }
    
    res.json({ message: "Logout successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUser =  async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    // console.log("log: log profile controller")
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
