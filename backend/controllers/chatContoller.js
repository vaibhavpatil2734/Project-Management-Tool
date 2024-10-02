const Chat = require('../models/Chat'); // Adjust the path as necessary

// Send a chat message
const sendChatMessage = async (req, res) => {
    const { message, projectName } = req.body; // Project name from request body
    const { username } = req.user; // Username from the token

    if (!message) {
        return res.status(400).json({ error: 'Message content is required.' });
    }
    if (!projectName) {
        return res.status(400).json({ error: 'Project name is required.' });
    }

    try {
        const chat = new Chat({
            senderName: username, // Extracted from token
            message: message,
            title: projectName // Project name from the request body
        });

        await chat.save();
        res.status(201).json(chat);
    } catch (error) {
        console.error('Error sending chat message:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
};

// Fetch chat messages by project name
const fetchChatMessages = async (req, res) => {
    const { projectName } = req.query; // Project name from query parameters

    if (!projectName) {
        return res.status(400).json({ error: 'Project name is required.' });
    }

    try {
        const messages = await Chat.find({ title: projectName }); // Fetch messages by project name
        res.status(200).json(messages); // Return fetched messages
    } catch (error) {
        console.error('Error fetching chat messages:', error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
};

module.exports = {
    sendChatMessage,
    fetchChatMessages // Export the fetch function
};
