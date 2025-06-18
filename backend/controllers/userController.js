const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

// POST /api/auth/login
exports.login = async (req, res) => {
  const { mobile, password } = req.body;
  try {
    const user = await User.findOne({ mobile });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user);
    res.json({ token, role: user.role, name: user.name });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/auth/register (optional for first setup)
exports.register = async (req, res) => {
  const { name, mobile, password, role } = req.body;
  try {
    const newUser = new User({ name, mobile, password, role });
    await newUser.save();
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
};
