const express = require('express');
const { sendChatMessage, fetchChatMessages} = require('../controllers/chatContoller'); // Adjust path as necessary
const verifyProjectMembership = require('../middleware/verifyProjectMembership');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// POST route for sending chat messages
router.post('/sendChatMessage', authMiddleware, sendChatMessage);
router.post('/fetchChatMessages', fetchChatMessages);
module.exports = router;
