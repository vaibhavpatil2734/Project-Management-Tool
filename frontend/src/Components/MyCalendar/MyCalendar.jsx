import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './mycalendar.css';
import {
    format,
    addMonths,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    isSameMonth,
    isSameDay,
    addDays,
} from 'date-fns';

export default function MyCalendar() {
    const [events, setEvents] = useState([]); // State to store fetched events
    const [newEventDetail, setNewEventDetail] = useState(''); // State for new event input
    const [displayMonth, setDisplayMonth] = useState(new Date()); // State for the current month
    const [expandedDays, setExpandedDays] = useState(new Set()); // Track expanded days
    const token = localStorage.getItem('token');
    const projectTitle = JSON.parse(localStorage.getItem('projectData')).title;

    // Fetch calendar events from the backend
    const fetchEvents = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/calendar/fetchCalendarEvents', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title: projectTitle }),
            });
            const data = await response.json();
            if (response.ok) {
                setEvents(data.events); // Expecting { events: [...] } from the backend
            } else {
                console.error('Failed to fetch events:', data.message);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    // Fetch events when the component mounts or the display month changes
    useEffect(() => {
        fetchEvents();
    }, [displayMonth]);

    // Refetch events when user navigates back to the page
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (!document.hidden) {
                fetchEvents();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    // Create a new event
    const createEvent = async () => {
        if (!newEventDetail) {
            alert('Please provide event details.');
            return;
        }

        const selectedDate = Array.from(expandedDays)[0]; // Get the currently selected date from expandedDays
        if (!selectedDate) {
            alert('Please select a date to add an event.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/calendar/createCalendarEvent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title: projectTitle, eventDetail: newEventDetail, date: selectedDate }),
            });

            const data = await response.json();
            if (response.ok) {
                setEvents((prevEvents) => [...prevEvents, data]); // Assuming data contains the new event
                setNewEventDetail(''); // Clear input after submission
                setExpandedDays(new Set()); // Clear expanded days after adding event
            } else {
                console.error('Failed to create event:', data.message);
            }
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    // Toggle expand/collapse for a specific day
    const toggleExpandDay = (formattedDate) => {
        setExpandedDays((prev) => {
            const newExpandedDays = new Set(prev);
            if (newExpandedDays.has(formattedDate)) {
                newExpandedDays.delete(formattedDate); // Collapse if already expanded
            } else {
                newExpandedDays.add(formattedDate); // Expand if not already expanded
            }
            return newExpandedDays;
        });
    };

    // Display the calendar grid
    const renderCalendar = () => {
        const startMonth = startOfMonth(displayMonth);
        const endMonth = endOfMonth(displayMonth);
        const startDate = startOfWeek(startMonth);
        const endDate = endOfWeek(endMonth);

        const calendarDays = [];
        let currentDay = startDate;

        while (currentDay <= endDate) {
            const formattedDate = format(currentDay, 'yyyy-MM-dd');
            const dayEvents = events.filter((event) => format(new Date(event.date), 'yyyy-MM-dd') === formattedDate);
            const isCurrentMonth = isSameMonth(currentDay, displayMonth);
            const isSelectedDay = expandedDays.has(formattedDate);

            // Count events for the current day
            const eventCount = dayEvents.length;

            // Set color based on event count
            const eventColors = ['#6a5acd', '#ff6347', '#3cb371', '#ffa500', '#00bfff', '#ff1493', '#ffd700'];
            const eventColor = eventCount > 0 ? eventColors[eventCount % eventColors.length] : '#fff';

            calendarDays.push(
                <motion.div
                    key={formattedDate}
                    className={`calendar-day ${isCurrentMonth ? '' : 'not-current-month'} ${isSelectedDay ? 'selected' : ''}`}
                    style={{ backgroundColor: eventColor }}
                    onClick={() => toggleExpandDay(formattedDate)} // Toggle expand on click
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="day-number">{format(currentDay, 'd')}</div>
                    {eventCount > 0 && <div className="event-count">{eventCount}</div>}
                    <motion.div
                        className="events"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                            height: isSelectedDay ? 'auto' : 0,
                            opacity: isSelectedDay ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        {dayEvents.map((event, idx) => (
                            <motion.div
                                key={idx}
                                className="event"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.1 }}
                            >
                                {event.eventDetail}
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            );
            currentDay = addDays(currentDay, 1);
        }

        return calendarDays;
    };

    return (
        <div className="calendar-container">
            <h2>Calendar - {projectTitle}</h2>

            {/* Calendar Header */}
            <div className="calendar-header">
                <button onClick={() => setDisplayMonth(addMonths(displayMonth, -1))}>{'<'}</button>
                <span>{format(displayMonth, 'MMMM yyyy')}</span>
                <button onClick={() => setDisplayMonth(addMonths(displayMonth, 1))}>{'>'}</button>
            </div>

            {/* Weekday Labels */}
            <div className="weekday-labels">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
                    <div key={idx} className="weekday-label">{day}</div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="calendar-grid">
                {renderCalendar()}
            </div>

            {/* Event Input */}
            {expandedDays.size > 0 && (
                <motion.div className="event-input" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                    <h3>Add Event on {format(new Date(Array.from(expandedDays)[0]), 'MMMM dd, yyyy')}</h3>
                    <input
                        type="text"
                        value={newEventDetail}
                        onChange={(e) => setNewEventDetail(e.target.value)}
                        placeholder="Enter event details..."
                    />
                    <button onClick={createEvent}>Save Event</button>
                </motion.div>
            )}
        </div>
    );
}
