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
    isToday,
} from 'date-fns';

export default function MyCalendar() {
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [newEventDetail, setNewEventDetail] = useState('');
    const [displayMonth, setDisplayMonth] = useState(new Date());
    const token = localStorage.getItem('token');
    const projectTitle = JSON.parse(localStorage.getItem('projectData')).title;

    const fetchEvents = async () => {
        try {
            const response = await fetch('https://project-management-tool-5be8.onrender.com/api/calendar/fetchCalendarEvents', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title: projectTitle }),
            });
            const data = await response.json();
            if (response.ok) {
                setEvents(data.events);
            } else {
                console.error('Failed to fetch events:', data.message);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [displayMonth]);

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

    const createEvent = async () => {
        if (!newEventDetail || !selectedDate) {
            alert('Please provide event details and select a date.');
            return;
        }

        try {
            const response = await fetch('https://project-management-tool-5be8.onrender.com/api/calendar/createCalendarEvent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: projectTitle,
                    eventDetail: newEventDetail,
                    date: selectedDate,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setEvents((prevEvents) => [...prevEvents, data]);
                setNewEventDetail('');
            } else {
                console.error('Failed to create event:', data.message);
            }
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    const renderCalendar = () => {
        const startMonth = startOfMonth(displayMonth);
        const endMonth = endOfMonth(displayMonth);
        const startDate = startOfWeek(startMonth);
        const endDate = endOfWeek(endMonth);

        const calendarDays = [];
        let currentDay = startDate;

        while (currentDay <= endDate) {
            const formattedDate = format(currentDay, 'yyyy-MM-dd');
            const isCurrentMonth = isSameMonth(currentDay, displayMonth);
            const isSelectedDay = isSameDay(currentDay, selectedDate);
            const hasEvent = events.some(event => format(new Date(event.date), 'yyyy-MM-dd') === formattedDate);
            const isTodayDay = isToday(currentDay);

            calendarDays.push(
                <motion.div
                    key={formattedDate}
                    className={`calendar-day ${isCurrentMonth ? '' : 'not-current-month'} ${isSelectedDay ? 'selected' : ''} ${isTodayDay ? 'today' : ''} ${hasEvent ? 'event-day' : ''}`}
                    onClick={() => setSelectedDate(formattedDate)}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="day-number">{format(currentDay, 'd')}</div>
                </motion.div>
            );
            currentDay = addDays(currentDay, 1);
        }

        return calendarDays;
    };

    return (
        <div className="calendar-container">
            <h2>Calendar - {projectTitle}</h2>
            <div className="calendar-header">
                <button className='calendar-header-buttons' onClick={() => setDisplayMonth(addMonths(displayMonth, -1))}>{'<'}</button>
                <span>{format(displayMonth, 'MMMM yyyy')}</span>
                <button className='calendar-header-buttons' onClick={() => setDisplayMonth(addMonths(displayMonth, 1))}>{'>'}</button>
            </div>
            <div className="weekday-labels">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
                    <div key={idx} className="weekday-label">
                        {day}
                    </div>
                ))}
            </div>
            <div className="calendar-grid">{renderCalendar()}</div>

            <motion.div className="event-input" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <h3>Events on {selectedDate ? format(new Date(selectedDate), 'MMMM dd, yyyy') : 'Select a Date'}</h3>
                <input
                    type="text"
                    value={newEventDetail}
                    onChange={(e) => setNewEventDetail(e.target.value)}
                    placeholder="Enter event details..."
                />
                <button onClick={createEvent}>Add Event</button>
            </motion.div>

            <div className="event-list-section">
                <h3>Event List</h3>
                {events
                    .filter((event) => format(new Date(event.date), 'yyyy-MM-dd') === selectedDate)
                    .map((event, idx) => (
                        <motion.div
                            key={idx}
                            className="event-item"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.1 }}
                        >
                            <span className="event-number">{idx + 1}.</span>
                            <br />
                            <div className="event-detail">
                                {event.eventDetail}
                            </div>

                        </motion.div>
                    ))}
            </div>
        </div>
    );
}
