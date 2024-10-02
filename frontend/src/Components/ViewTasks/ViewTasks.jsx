import React, { useEffect, useState } from 'react';
import './ViewTasks.css'; // Import CSS for styling
import { FaPencilAlt } from 'react-icons/fa'; // Importing pencil icon from react-icons
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

export default function ViewTasks() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [projectTitle, setProjectTitle] = useState(''); // State for project title
  const navigate = useNavigate(); // Initialize the navigation function

  useEffect(() => {
    // Retrieve the project title from local storage
    const projectData = localStorage.getItem('projectData');
    if (projectData) {
      const parsedData = JSON.parse(projectData);

      // Set project title from parsed data
      setProjectTitle(parsedData.title);
      console.log('Project Title from local storage:', parsedData.title); // Debugging purpose

      // Fetch tasks using the project title
      fetchTasks(parsedData.title);
    } else {
      setError('No project data found in local storage.');
    }
  }, []);

  const fetchTasks = async (title) => {
    try {
      const response = await fetch('http://localhost:5000/api/tasks/getTasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }), // Sending only title in the request body
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const data = await response.json();
      if (data.tasks) {
        setTasks(data.tasks); // Set the tasks if successfully retrieved
      } else {
        setError(data.message); // Handle no tasks found scenario
      }
    } catch (err) {
      console.error(err); // Log the error for debugging
      setError(err.message || 'Failed to fetch tasks.');
    }
  };

  const handleEditClick = (taskId) => {
    // Navigate to the UpdateTask component with the task ID
    navigate(`/update-task/${taskId}`);
  };

  return (
    <div className="view-tasks">
      <h1>Tasks for Project: {projectTitle || 'Loading...'}</h1>
      {error && <p className="error">{error}</p>}
      <div className="task-container">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task._id} className={`task-item priority-${task.Priority.toLowerCase()}`}>
              {/* First Row: Task Title, Status, Assigned To, Priority, and Edit Button */}
              <div className="task-columns">
                <div className="task-column"><strong>Title:</strong> {task.Tasktitle || 'No Title'}</div>
                <div className="task-column"><strong>Status:</strong> {task.status || 'No Status'}</div>
                <div className="task-column"><strong>Assigned To:</strong> {task.assignedTo || 'Unassigned'}</div>
                <div className="task-column priority-column"><strong>Priority:</strong> {task.Priority || 'None'}</div>
                <div className="task-column edit-icon">
                  <button className="edit-btn" onClick={() => handleEditClick(task._id)}>
                    <FaPencilAlt /> {/* Pencil icon */}
                  </button>
                </div>
              </div>

              {/* Second Row: Description (visible on hover) */}
              <div className="task-details">
                <p><strong>Description:</strong> {task.description || 'No Description'}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No tasks available for this project.</p>
        )}
      </div>
    </div>
  );
}
