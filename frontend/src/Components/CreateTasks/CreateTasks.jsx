import React, { useState } from 'react';
import './createtasks.css'; // Import the CSS file for styling

export default function CreateTasks() {
  const initialTask = {
    Tasktitle: '',
    description: '',
    Priority: 'Low', // Default value for Priority
    status: 'Pending', // Default value for Status
    assignedTo: '',
    title: '' // This is equivalent to projectTitle
  };

  const [tasks, setTasks] = useState([initialTask]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0); // Track the current task index
  const [createdTaskTitles, setCreatedTaskTitles] = useState([]); // Track created task titles

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newTasks = [...tasks];
    newTasks[index][name] = value;
    setTasks(newTasks);
  };

  const handleAddTask = () => {
    if (currentTaskIndex < tasks.length - 1) return; // Prevent adding a new task if the current one is not completed
    setTasks([...tasks, { ...initialTask }]); // Add a new task with initial values
    setCurrentTaskIndex(currentTaskIndex + 1); // Move to the next task
  };

  const handleRemoveTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    if (currentTaskIndex > 0) {
      setCurrentTaskIndex(currentTaskIndex - 1); // Move back to the previous task if removing one
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isCurrentTaskValid = tasks[currentTaskIndex].Tasktitle && tasks[currentTaskIndex].title; // Validate Tasktitle and Project Title

    if (!isCurrentTaskValid) {
      alert('Please fill all required fields for the current task.');
      return;
    }

    try {
      const token = localStorage.getItem('token'); // Get the auth token from localStorage

      if (!token) {
        alert('Token is missing. Please log in again.');
        return;
      }

      const responses = await Promise.all(
        tasks.map((task) => {
          return fetch('https://project-management-tool-5be8.onrender.com/api/tasks/createTask', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` // Send the token in Authorization header
            },
            body: JSON.stringify(task),
          });
        })
      );

      // Update the created task titles state
      const taskTitles = tasks.map((task) => task.Tasktitle); // Use Tasktitle instead of title
      setCreatedTaskTitles(taskTitles);
    } catch (error) {
      console.error('Error creating tasks:', error);
      alert('Failed to create tasks. Please try again.');
    }
  };

  return (
    <div className="create-tasks-container">
      <h1>Create Multiple Tasks</h1>
      <form onSubmit={handleSubmit} className="task-form">
        {tasks.length > 0 && (
          <div className="task-card">
            <h3>Task {currentTaskIndex + 1}</h3>
            <div className="task-input-row">
              <input
                type="text"
                name="Tasktitle"
                value={tasks[currentTaskIndex].Tasktitle}
                onChange={(e) => handleChange(currentTaskIndex, e)}
                placeholder="Task Title *"
                required
                className="task-input"
              />
            </div>
            <div className="task-input-row">
              <textarea
                name="description"
                value={tasks[currentTaskIndex].description}
                onChange={(e) => handleChange(currentTaskIndex, e)}
                placeholder="Task Description"
                className="task-textarea"
              />
            </div>
            <div className="task-input-row">
              <select
                name="Priority"
                value={tasks[currentTaskIndex].Priority}
                onChange={(e) => handleChange(currentTaskIndex, e)}
                required
                className="task-select"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="task-input-row">
              <select
                name="status"
                value={tasks[currentTaskIndex].status}
                onChange={(e) => handleChange(currentTaskIndex, e)}
                required
                className="task-select"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="task-input-row">
              <input
                type="text"
                name="assignedTo"
                value={tasks[currentTaskIndex].assignedTo}
                onChange={(e) => handleChange(currentTaskIndex, e)}
                placeholder="Assigned To (User ID)"
                className="task-input"
              />
            </div>
            <div className="task-input-row">
              <input
                type="text"
                name="title"
                value={tasks[currentTaskIndex].title}
                onChange={(e) => handleChange(currentTaskIndex, e)}
                placeholder="Project Title *"
                required
                className="task-input"
              />
            </div>
          </div>
        )}
        <button type="button" className="add-task-btn" onClick={handleAddTask}>
          Clear Form
        </button>
        <button type="submit" className="submit-tasks-btn">
          Create Task
        </button>
      </form>
      <div className="recent-tasks">
        <h3 className='mt-4'>Recently Created Tasks:</h3>
        <ul>
          {createdTaskTitles.map((Tasktitle, index) => (
            <li key={index}>{Tasktitle}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
