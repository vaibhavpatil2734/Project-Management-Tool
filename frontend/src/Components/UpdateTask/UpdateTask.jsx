import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './updatetask.css'; // Import the CSS file for styling

export default function UpdateTask() {
  const { id } = useParams(); // Get the task ID from URL params
  const [taskData, setTaskData] = useState({}); // Store the task data
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the task data using the ID
    const fetchTaskData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/tasks/${id}`);
        const data = await response.json();
        if (response.ok) {
          setTaskData(data.task);
        } else {
          console.error('Failed to fetch task data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching task data:', error);
      }
    };

    fetchTaskData();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Prepare updatedTask by checking if a field is empty, retain the previous value
      const updatedTask = {
        Tasktitle: taskData.Tasktitle || taskData.Tasktitle, // If field is empty, keep original
        description: taskData.description || taskData.description, // Same for description
        status: taskData.status || taskData.status,
        assignedTo: taskData.assignedTo || taskData.assignedTo,
        Priority: taskData.Priority || taskData.Priority,
      };

      const response = await fetch(`https://project-management-tool-5be8.onrender.com/api/tasks/updateTask/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask), // Send only updated fields
      });

      if (response.ok) {
        alert('Task updated successfully!');
        navigate('/tasks'); // Redirect to tasks page
      } else {
        const data = await response.json();
        console.error('Failed to update task:', data.message);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
    navigate("/dashboard/ViewTasks")
  };

  return (
    <div className="update-task-container">
      <h2 className="title">Update Task</h2>
      <form onSubmit={handleUpdate} className="update-task-form">
        <label className="form-label">
          Task Title:
          <input
            type="text"
            value={taskData.Tasktitle || ''}
            onChange={(e) => setTaskData({ ...taskData, Tasktitle: e.target.value })}
            className="form-input"
          />
        </label>

        <label className="form-label">
          Description:
          <input
            type="text"
            value={taskData.description || ''}
            onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
            className="form-input"
          />
        </label>

        <label className="form-label">
          Status:
          <select
            value={taskData.status || ''}
            onChange={(e) => setTaskData({ ...taskData, status: e.target.value })}
            className="form-input"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="complete">Complete</option>
          </select>
        </label>

        <label className="form-label">
          Assigned To:
          <input
            type="text"
            value={taskData.assignedTo || ''}
            onChange={(e) => setTaskData({ ...taskData, assignedTo: e.target.value })}
            className="form-input"
          />
        </label>

        <label className="form-label">
          Priority:
          <select
            value={taskData.Priority || ''}
            onChange={(e) => setTaskData({ ...taskData, Priority: e.target.value })}
            className="form-input"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <button type="submit" className="submit-button">Update Task</button>
      </form>
    </div>
  );
}