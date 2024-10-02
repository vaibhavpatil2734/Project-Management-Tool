import React, { useState, useEffect } from 'react';

export default function Chat() {
    const [messages, setMessages] = useState([]); // State for storing chat messages
    const [messageInput, setMessageInput] = useState(''); // State for the input field
    const projectData = JSON.parse(localStorage.getItem('projectData')); // Retrieve project data from local storage
    const projectName = projectData ? projectData.title : ''; // Get project title
    const token = localStorage.getItem('token'); // Retrieve JWT token from local storage

    useEffect(() => {
        // Function to fetch chat messages from the server
        const fetchMessages = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/connect/fetchChatMessages'); // Update with your API endpoint
                const data = await response.json();

                if (response.ok) {
                    setMessages(data); // Assuming the response is an array of chat messages
                } else {
                    console.error('Failed to fetch messages:', data.message);
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, []);

    const handleSendMessage = async () => {
        if (!messageInput) {
            alert("Message cannot be empty!");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/connect/sendChatMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ message: messageInput, projectName }) // Pass the project title
            });

            const data = await response.json();
            if (response.ok) {
                // Update the messages state to include the new message
                setMessages((prevMessages) => [...prevMessages, data]);
                setMessageInput(''); // Clear the input field after sending
            } else {
                console.error('Failed to send message:', data.message);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div>
            <h2>Chat Room - {projectName}</h2>
            <div className="chat-window" style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll' }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{ margin: '5px 0' }}>
                        <strong>{msg.senderName}:</strong> {msg.message}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type your message"
                style={{ width: '70%', marginRight: '10px' }}
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
}
