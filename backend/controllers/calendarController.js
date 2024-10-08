const CalendarEvent = require('../models/Calendar'); // Adjust the path as necessary

// Create a new calendar event
const createCalendarEvent = async (req, res) => {
    const { eventDetail, date, title } = req.body; // Extract event details, date, and title (project name) from the request body

    // Validate input
    if (!eventDetail || typeof eventDetail !== 'string' || !eventDetail.trim()) {
        return res.status(400).json({ error: 'Event detail is required.' });
    }

    if (!date || isNaN(Date.parse(date))) {
        return res.status(400).json({ error: 'Valid event date is required.' });
    }

    if (!title || typeof title !== 'string' || !title.trim()) {
        return res.status(400).json({ error: 'Title (project name) is required.' });
    }

    try {
        // Create a new event
        const calendarEvent = new CalendarEvent({
            eventDetail: eventDetail.trim(),
            date: new Date(date), // Ensure the date is a valid Date object
            title: title.trim(), // Project title
        });

        // Save the event
        await calendarEvent.save();
        res.status(201).json(calendarEvent); // Return the saved event
    } catch (error) {
        console.error('Error creating calendar event:', error);
        res.status(500).json({ error: 'Failed to create event' });
    }
};

// Fetch calendar events by project title
const fetchCalendarEvents = async (req, res) => {
    const { title } = req.body; // Extract project title from request body

    // Validate title
    if (!title || typeof title !== 'string' || !title.trim()) {
        return res.status(400).json({ error: 'Title (project name) is required.' });
    }

    try {
        // Fetch all events by title without pagination
        const events = await CalendarEvent.find({ title })
                            .sort({ date: 1 }) // Sort by date, oldest to newest
                            .exec();

        // Return the events
        res.status(200).json({ events });
    } catch (error) {
        console.error('Error fetching calendar events:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
};

// Export the controller functions
module.exports = {
    createCalendarEvent,
    fetchCalendarEvents,
};
