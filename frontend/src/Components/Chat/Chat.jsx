import React, { useState, useEffect } from 'react';

export default function Chat() {
    const [messages, setMessages] = useState([]); // State for storing chat messages
    const [messageInput, setMessageInput] = useState(''); // State for the input field
    const [projectTitle, setProjectTitle] = useState(''); // State for the project title
    const token = localStorage.getItem('token'); // Retrieve JWT token from local storage

    const fetchMessages = async () => {
        try {
            if (!projectTitle) {
                console.error('Project title not available');
                return;
            }

            console.log('Fetching messages for project:', projectTitle); // Log the project title being fetched

            const response = await fetch('http://localhost:5000/api/connect/fetchChatMessages', {
                method: 'POST', // Changed to POST for sending project name
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ projectName: projectTitle }) // Send the project name
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
        // Retrieve the project title from local storage
        const projectData = localStorage.getItem('projectData');
        if (projectData) {
            const parsedData = JSON.parse(projectData);
            setProjectTitle(parsedData.title); // Set the project title
            console.log('Project Title Retrieved:', parsedData.title); // Log the project title
        } else {
            console.error('No project data found in local storage.');
        }
    }, []); // This will run only once on component mount

    // Separate useEffect for fetching messages based on projectTitle
    useEffect(() => {
        if (projectTitle) {
            fetchMessages(); // Fetch messages only if the project title is available
        }
    }, [projectTitle]); // Fetch messages when project title changes

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
                body: JSON.stringify({ message: messageInput, projectName: projectTitle })
            });

            const data = await response.json();
            if (response.ok) {
                // Update the messages state to include the new message
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
        <div>
            <h2>Chat Room - {projectTitle || 'Loading...'}</h2>
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
