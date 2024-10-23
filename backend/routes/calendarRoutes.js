const express = require('express');
const { createCalendarEvent, fetchCalendarEvents } = require('../controllers/CalendarController');

const router = express.Router();

// Define routes
router.post('/createCalendarEvent', createCalendarEvent);
router.post('/fetchCalendarEvents', fetchCalendarEvents); // Use POST method with body

module.exports = router;