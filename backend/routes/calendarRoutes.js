const express = require('express');
const { createCalendarEvent, fetchCalendarEvents } = require('../controllers/calendarController');
const verifyProjectMembership = require('../middleware/verifyProjectMembership');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// POST route for creating a calendar event
router.post('/createCalendarEvent', createCalendarEvent);

// GET route for fetching calendar events
router.get('/fetchCalendarEvents/:projectTitle', fetchCalendarEvents);

module.exports = router;
