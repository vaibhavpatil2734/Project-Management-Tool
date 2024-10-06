const Chat = require('../models/Chat'); // Adjust the path as necessary

// Send a chat message
const sendChatMessage = async (req, res) => {
    const { message, title } = req.body; // Title (previously projectName) and message from request body
    const { name } = req.user; // Username from the token

    // Validate message and title
    if (!message || typeof message !== 'string' || !message.trim()) {
        return res.status(400).json({ error: 'Message content is required.' });
    }

    if (!title || typeof title !== 'string' || !title.trim()) {
        return res.status(400).json({ error: 'Title (project name) is required.' });
    }

    try {
        // Create a new chat message
        const chat = new Chat({
            senderName: name, // Extracted from token
            message: message.trim(),
            title: title.trim() // Title from the request body
        });

        // Save the chat message
        await chat.save();
        res.status(201).json(chat); // Return the saved chat message
    } catch (error) {
        console.error('Error sending chat message:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
};

// Fetch chat messages by title with pagination
const fetchChatMessages = async (req, res) => {
    const { title } = req.body; // Get title (previously projectName) from request body

    // Validate title
    if (!title || !title.trim()) {
        return res.status(400).json({ error: 'Title (project name) is required.' });
    }

    try {
        // Fetch all messages by title without pagination
        const messages = await Chat.find({ title })
                            .sort({ createdAt: 1 }) // Sort by oldest first, so latest appears last
                            .exec();

        // Return all messages
        res.status(200).json({ messages });
    } catch (error) {
        console.error('Error fetching chat messages:', error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
};

// Export the functions for use in routes
module.exports = {
    sendChatMessage,
    fetchChatMessages
};
