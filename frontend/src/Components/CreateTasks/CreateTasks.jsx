import React, { useState } from 'react';
import './createtasks.css'; // Import the CSS file for styling

export default function CreateTasks() {
  const initialTask = {
    title: '',
    description: '',
    Priority: 'Low', // Default value for Priority
    status: 'Pending', // Default value for Status
    assignedTo: '',
    projectTitle: ''
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
    const isCurrentTaskValid = tasks[currentTaskIndex].title && tasks[currentTaskIndex].projectTitle; // Simple validation for required fields

    if (!isCurrentTaskValid) {
      alert("Please fill all required fields for the current task.");
      return;
    }

    try {
      const responses = await Promise.all(
        tasks.map(task => {
          return fetch('http://localhost:5000/api/tasks/createTask', { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
          });
        })
      );
      const data = await Promise.all(responses.map(res => res.json()));
      console.log('Tasks created successfully:', data);

      // Update the created task titles state
      const titles = tasks.map(task => task.title);
      setCreatedTaskTitles(titles); // Store the titles of created tasks

      // Show an alert indicating successful task creation
      alert('Tasks created successfully!'); // Task created alert
    } catch (error) {
      console.error('Error creating tasks:', error);
      alert('Failed to create tasks. Please try again.'); // Error alert
    }
  };

  return (
    <div className="create-tasks-container">
      <h1>Create Multiple Tasks</h1>
      <form onSubmit={handleSubmit} className="task-form">
        {tasks.length > 0 && (
          <div className="task-card">
            <h3>Task {currentTaskIndex + 1}</h3>
            {/* Single field per row */}
            <div className="task-input-row">
              <input
                type="text"
                name="title"
                value={tasks[currentTaskIndex].title}
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
                name="projectTitle"
                value={tasks[currentTaskIndex].projectTitle}
                onChange={(e) => handleChange(currentTaskIndex, e)}
                placeholder="Project Title *"
                required
                className="task-input"
              />
            </div>
            <button type="button" className="remove-task-btn" onClick={() => handleRemoveTask(currentTaskIndex)}>Remove Task</button>
          </div>
        )}
        <button type="button" className="add-task-btn" onClick={handleAddTask}>Add Another Task</button>
        <button type="submit" className="submit-tasks-btn">Create Tasks</button>
      </form>
      <div className="recent-tasks">
        <h2>Recently Created Tasks:</h2>
        <ul>
          {createdTaskTitles.map((title, index) => (
            <li key={index}>{title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
