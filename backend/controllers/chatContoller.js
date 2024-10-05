const Chat = require('../models/Chat'); // Adjust the path as necessary

// Send a chat message
const sendChatMessage = async (req, res) => {
    const { message, projectName } = req.body; // Project name and message from request body
    const { name } = req.user; // Username from the token

    // Validate message and projectName
    if (!message || typeof message !== 'string' || !message.trim()) {
        return res.status(400).json({ error: 'Message content is required.' });
    }

    if (!projectName || typeof projectName !== 'string' || !projectName.trim()) {
        return res.status(400).json({ error: 'Project name is required.' });
    }

    try {
        // Create a new chat message
        const chat = new Chat({
            senderName: name, // Extracted from token
            message: message.trim(),
            title: projectName.trim() // Project name from the request body
        });

        // Save the chat message
        await chat.save();
        res.status(201).json(chat); // Return the saved chat message
    } catch (error) {
        console.error('Error sending chat message:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
};


// Fetch chat messages by project name with pagination
const fetchChatMessages = async (req, res) => {
    const { projectName } = req.body; // Get projectName from request body

    // Validate projectName
    if (!projectName || !projectName.trim()) {
        return res.status(400).json({ error: 'Project name is required.' });
    }

    try {
        // Fetch all messages by project name without pagination
        const messages = await Chat.find({ title: projectName })
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
