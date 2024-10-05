const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    senderName: { type: String, required: true },
    message: { type: String, required: true },
    title: { type: String, required: true } // Project name
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
