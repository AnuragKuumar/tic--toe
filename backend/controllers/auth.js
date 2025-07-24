const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

exports.register = async (req, res) => {
  try {
    const { username, email, password, skillLevel, agreeToTerms } = req.body;

    if (!agreeToTerms) {
      return res.status(400).json({ message: 'You must agree to terms' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      skillLevel,
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, authConfig.secret, { expiresIn: authConfig.tokenLife });

    res.json({
      message: 'Logged in successfully',
      accessToken: token,
      user: {
        username: user.username,
        email: user.email,
        skillLevel: user.skillLevel,
      },
      rememberMe: !!rememberMe,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
