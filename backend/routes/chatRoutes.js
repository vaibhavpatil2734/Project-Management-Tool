const express = require('express');
const { sendChatMessage, fetchChatMessages} = require('../controllers/chatContoller'); // Adjust path as necessary

const router = express.Router();

// POST route for sending chat messages
router.post('/sendChatMessage', sendChatMessage);
router.post('/fetchChatMessages', fetchChatMessages);
module.exports = router;
