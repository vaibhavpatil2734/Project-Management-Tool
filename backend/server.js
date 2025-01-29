const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDb = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const errorHandler = require('./middleware/errorHandler');
const chatRoutes = require('./routes/chatRoutes');
const calendarRoutes = require('./routes/calendarRoutes');
require('dotenv').config();

const app = express();

connectDb();

const corsOptions = {
  origin: [
    'https://project-management-tool2734.netlify.app',
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // if you need cookies/session support
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Project Management API");
});

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/connect', chatRoutes);
app.use('/api/calendar', calendarRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, (req,res) => {
  console.log(`Server running on port ${PORT}`);
});
