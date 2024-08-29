require('dotenv').config();
const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI; // Default URI if MONGODB_URI is not set

const connectDb = async () => {
    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connection is successful");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1); // Exit with failure code
    }
}

module.exports = connectDb;