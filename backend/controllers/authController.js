const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Registration logic
exports.register = async (req, res) => {
  const { name, compId, email, password, role } = req.body;

  console.log('Received registration request Server Side:', { name, email, password, role });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists');
      return res.status(400).json({ msg: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      compId,
      email,
      password: hashedPassword,
      role
    });

    await newUser.save();

    res.status(201).json({ msg: 'DONE'});
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Login logic
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    console.log('User compId:', user.compId);

    const payload = {
      name: user.name,
      compId:user.compId,
      email: user.email,
      role: user.role,
      
    };
    

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Retrieve profile data to send back
    const profileData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      compId: user.compId,  // Assuming this is also part of user schema
      // Add other fields you need to display in the profile
    };

    // Send token and profile data in the response
    res.status(200).json({ 
      token, 
      profile: profileData 
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
