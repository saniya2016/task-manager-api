const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const User = require('../models/user');
  
const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // ✅ Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: 'Email already registered' });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create new user
    const user = await User.create({ username, email, password: hashedPassword });
    return res.status(StatusCodes.CREATED).json({ success: true, message: 'User registered successfully', data: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Error registering user', error: error.message });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // ✅ Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ success: false, message: 'Invalid email or password' });
    }

    // ✅ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ success: false, message: 'Invalid email or password' });
    }

    // ✅ Generate JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });
    return res.status(StatusCodes.OK).json({ success: true, message: 'Login successful', data: { token } });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Error during login', error: error.message });
  }
};

module.exports = {
  register,
  login,
};
