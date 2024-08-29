const express = require('express');
const connectDb = require('./config/db');
require('dotenv').config();

const app = express();

connectDb();  // Initiate database connection

app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
