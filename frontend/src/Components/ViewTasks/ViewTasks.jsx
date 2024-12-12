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
        setTasks(data.tasks);
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

  return (
    <div className="view-tasks">
      <h1>Tasks for Project: {projectTitle || 'Loading...'}</h1>
      {error && <p className="error">{error}</p>}
      <div className="task-container">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task._id} className={`task-item priority-${task.Priority.toLowerCase()}`}>
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
