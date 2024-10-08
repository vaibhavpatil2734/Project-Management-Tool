const mongoose = require('mongoose');

const calendarSchema = new mongoose.Schema({
    eventDetail: { type: String, required: true }, // Description of the event
    date: { type: Date, required: true }, // Date of the event
    title: { type: String, required: true } // Project name or identifier
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

const CalendarEvent = mongoose.model('CalendarEvent', calendarSchema);

module.exports = CalendarEvent;
