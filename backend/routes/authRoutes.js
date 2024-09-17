const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Adjust the path as needed

// Registration route
router.post('/register', authController.register);

// Login route (if needed)
router.post('/login', authController.login);

module.exports = router;
