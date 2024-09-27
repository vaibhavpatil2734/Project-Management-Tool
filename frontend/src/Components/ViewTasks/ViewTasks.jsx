import React, { useEffect, useState } from 'react';
import './ViewTasks.css'; // Import CSS for styling

export default function ViewTasks() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [projectTitle, setProjectTitle] = useState(''); // State for project title
  const [expandedTaskId, setExpandedTaskId] = useState(null); // State to track expanded task

  useEffect(() => {
    // Retrieve the project object from local storage
    const projectData = localStorage.getItem('projectData'); // Ensure this key matches your storage logic
    if (projectData) {
      const parsedData = JSON.parse(projectData); // Parse the JSON string
      setProjectTitle(parsedData.title); // Set the project title from parsed data

      // Fetch tasks for the project using the title
      fetchTasks(parsedData.title); // Pass the title directly to fetchTasks
    } else {
      setError('No project data found in local storage.');
    }
  }, []);

  const fetchTasks = async (projectTitle) => {
    try {
      const response = await fetch('http://localhost:5000/api/tasks/getTasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectName: projectTitle }), // Sending projectName in the request
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const data = await response.json();
      console.log(data); // Log the response to check the structure
      setTasks(data.tasks || []); // Safely set tasks to an empty array if undefined
    } catch (err) {
      console.error(err); // Log the error for debugging
      setError(err.message || 'Failed to fetch tasks.');
    }
  };

  const handleTaskMouseEnter = (taskId) => {
    setExpandedTaskId(taskId); // Expand the task on mouse enter
  };

  const handleTaskMouseLeave = () => {
    setExpandedTaskId(null); // Collapse the task on mouse leave
  };

  // Function to determine the color based on priority
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return '#e63946'; // Modern red color for high priority
      case 'Medium':
        return '#f1faee'; // Light color for medium priority
      case 'Low':
        return '#a8dadc'; // Light blue color for low priority
      default:
        return '#457b9d'; // Default color
    }
  };

  return (
    <div>
      <h1>Tasks for Project: {projectTitle || 'Loading...'}</h1>
      {error && <p className="error">{error}</p>}
      <div className="task-container">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task._id}
              className="task-item"
              style={{ backgroundColor: getPriorityColor(task.Priority) }}
              onMouseEnter={() => handleTaskMouseEnter(task._id)} // Expand on mouse enter
              onMouseLeave={handleTaskMouseLeave} // Collapse on mouse leave
            >
              <div className="task-columns">
                <div className="task-column"><strong>Title:</strong> {task.title || 'No Title'}</div>
                <div className="task-column"><strong>Assigned Users:</strong> {task.assignedTo || 'No Users Assigned'}</div>
                <div className="task-column"><strong>Priority:</strong> {task.Priority || 'No Priority'}</div>
                <div className="task-column"><strong>Status:</strong> {task.status || 'No Status'}</div>
              </div>
              {expandedTaskId === task._id && (
                <div className="task-details">
                  <p><strong>Description:</strong> {task.description || 'No Description'}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No tasks available for this project.</p>
        )}
      </div>
    </div>
  );
}
