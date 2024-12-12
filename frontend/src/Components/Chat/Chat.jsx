import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion'; // Install framer-motion using `npm install framer-motion`
import './chat.css'; // Import the CSS file

export default function Chat() {
    const [messages, setMessages] = useState([]); // State for storing chat messages
    const [messageInput, setMessageInput] = useState(''); // State for the input field
    const [projectTitle, setProjectTitle] = useState(''); // State for the project title
    const token = localStorage.getItem('token'); // Retrieve JWT token from local storage
    const currentUser = "YourUsername"; // Set this dynamically based on your logged-in user

    const chatWindowRef = useRef(null); // Ref for chat window

    const fetchMessages = async () => {
        try {
            if (!projectTitle) {
                console.error('Project title not available');
                return;
            }

            const response = await fetch('https://project-management-tool-5be8.onrender.com/api/connect/fetchChatMessages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ title: projectTitle })
            });

            const data = await response.json();
            if (response.ok) {
                setMessages(data.messages); // Set the messages from the response
            } else {
                console.error('Failed to fetch messages:', data.error || data.message);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    useEffect(() => {
        const projectData = localStorage.getItem('projectData');
        if (projectData) {
            const parsedData = JSON.parse(projectData);
            setProjectTitle(parsedData.title); // Set the project title
        } else {
            console.error('No project data found in local storage.');
        }
    }, []);

    useEffect(() => {
        if (projectTitle) {
            fetchMessages(); // Fetch messages only if the project title is available
        }
    }, [projectTitle]);

    useEffect(() => {
        // Scroll to the bottom whenever messages change
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (!messageInput) {
            alert("Message cannot be empty!");
            return;
        }

        try {
            const response = await fetch('https://project-management-tool-5be8.onrender.com/api/connect/sendChatMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ message: messageInput, title: projectTitle })
            });

            const data = await response.json();
            if (response.ok) {
                setMessages((prevMessages) => [...prevMessages, data]);
                setMessageInput(''); // Clear the input field after sending
            } else {
                console.error('Failed to send message:', data.error || data.message);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="chat-container">
            <h2 className="chat-title">Chat Room - {projectTitle || 'Loading...'}</h2>
            
            {/* Chat window */}
            <motion.div
                ref={chatWindowRef} // Attach ref to the chat window
                className="chat-window"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {messages.map((msg, index) => (
                    <motion.div
                        key={index}
                        className={`chat-bubble ${msg.senderName === currentUser ? 'mine' : 'theirs'}`} // Adjust sender styling
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <strong>{msg.senderName === currentUser ? 'You' : msg.senderName}:</strong> {msg.message}
                    </motion.div>
                ))}
            </motion.div>

            {/* Input area */}
            <div className="input-container">
                <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type your message..."
                    className="chat-input"
                />
                <button onClick={handleSendMessage} className="send-button">
                    Send
                </button>
            </div>
        </div>
    );
}
