import React, { useEffect, useState } from 'react';
import './viewtasks.css'; // Import CSS for styling
import { FaPencilAlt } from 'react-icons/fa'; // Importing pencil icon from react-icons
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

export default function ViewTasks() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [projectTitle, setProjectTitle] = useState(''); // State for project title
  const navigate = useNavigate(); // Initialize the navigation function

  useEffect(() => {
    const projectData = localStorage.getItem('projectData');
    if (projectData) {
      const parsedData = JSON.parse(projectData);

      setProjectTitle(parsedData.title);
      console.log('Project Title from local storage:', parsedData.title); // Debugging purpose

      fetchTasks(parsedData.title);
    } else {
      setError('No project data found in local storage.');
    }
  }, []);

  const fetchTasks = async (title) => {
    try {
      const response = await fetch('https://project-management-tool-5be8.onrender.com/api/tasks/getTasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const data = await response.json();
      if (data.tasks) {
        setTasks(data.tasks.map(task => ({ ...task, expanded: false }))); // Add expanded state
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to fetch tasks.');
    }
  };

  const handleEditClick = (taskId) => {
    navigate(`/dashboard/update-task/${taskId}`);
  };

  const toggleTaskDetails = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, expanded: !task.expanded } : task
      )
    );
  };

  return (
    <div className="view-tasks">
      <h1>Tasks for Project: {projectTitle || 'Loading...'}</h1>
      {error && <p className="error">{error}</p>}
      <div className="task-container">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task._id}
              className={`task-item ${task.expanded ? 'expand' : ''} priority-${task.Priority.toLowerCase()}`}
              onClick={() => toggleTaskDetails(task._id)} // Add click handler
            >
              <div className="task-columns">
                <div className="task-column"><strong>Title:</strong> {task.Tasktitle || 'No Title'}</div>
                <div className="task-column"><strong>Assigned To:</strong> {task.assignedTo || 'Unassigned'}</div>
              </div>

              {task.expanded && (
                <div className="task-details">
                  <p><strong>Status:</strong> {task.status || 'No Status'}</p>
                  <p><strong>Priority:</strong> {task.Priority || 'None'}</p>
                  <p><strong>Description:</strong> {task.description || 'No Description'}</p>
                  <div className="edit-icon">
                    <button className="edit-btn" onClick={(e) => {
                      e.stopPropagation(); // Prevent event propagation to the parent div
                      handleEditClick(task._id);
                    }}>
                      <FaPencilAlt /> {/* Pencil icon */}
                    </button>
                  </div>
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
