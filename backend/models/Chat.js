const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    senderName: { type: String, required: true }, // Name of the sender
    message: { type: String, required: true },    // Message content
    title: { type: String, required: true },      // Title of the chat/message
    timestamp: { type: Date, default: Date.now }, // Timestamp of when the message was sent
    isRead: { type: Boolean, default: false }      // To track if the message has been read
});

// Create the Chat model
const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
