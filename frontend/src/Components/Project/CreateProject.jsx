import React, { useState } from 'react';
import './createProject.css'; // Import custom CSS for animations

export default function CreateProject() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedUsers: [], // List of compIds for the users assigned to the project
  });

  const [userCompId, setUserCompId] = useState(''); // This stores the compId entered in the input field

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle adding a new assigned user (compId) to the project
  const handleAddUser = () => {
    if (!userCompId.trim()) return; // Ensure input is not empty

    // If compId is valid, add it to assignedUsers
    if (!formData.assignedUsers.includes(userCompId)) {
      setFormData((prevState) => ({
        ...prevState,
        assignedUsers: [...prevState.assignedUsers, userCompId.trim()], // Add trimmed compId to the list
      }));
      setUserCompId(''); // Clear the input after adding
    }
  };

  // Remove an assigned user from the list
  const handleRemoveUser = (compIdToRemove) => {
    setFormData((prevState) => ({
      ...prevState,
      assignedUsers: prevState.assignedUsers.filter((compId) => compId !== compIdToRemove),
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve the JWT token from localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      alert('No authentication token found. Please log in.');
      return;
    }

    try {
      const response = await fetch('https://project-management-tool-5be8.onrender.com/api/projects/createProjects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include the token in the Authorization header
        },
        body: JSON.stringify(formData), // Send the formData as JSON
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Project created:', data);
        alert('Project created successfully');
        // Reset form
        setFormData({ title: '', description: '', createdBy: '', assignedUsers: [] });
      } else {
        const errorData = await response.json();
        console.error('Failed to create project:', errorData);
        alert('Failed to create project: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Server or network error occurred');
    }
  };

  return (
    <div className="container my-5">
      <div className="fade-in">
        <h2 className="text-center mb-4">Create New Project</h2>
        <form onSubmit={handleSubmit} className="p-4 rounded form-bg shadow">
          <div className="form-group mb-3">
            <label htmlFor="title">Project Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>


          <div className="form-group mb-3">
            <label htmlFor="assignedUser">Created By (Company ID) & Assign Users (Company ID)</label>
            <div className="input-group">
              <input
                type="text"
                className="AssignWidth "
                id="assignedUser"
                value={userCompId}
                onChange={(e) => setUserCompId(e.target.value)}
                placeholder="Enter Company ID"
                
              />
              <button
                type="button"
                className="add-user-btn btn btn-secondary ms-2"
                onClick={handleAddUser}
                disabled={!userCompId.trim()} // Disable if input is empty
              >
                Add User
              </button>
            </div>
          </div>

          {/* Display assigned users */}
          {formData.assignedUsers.length > 0 && (
            <div className="mb-3">
              <h6>Assigned Users:</h6>
              <ul className="list-group">
                {formData.assignedUsers.map((compId, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    {compId}
                    <button
                        type="button"
                        className="btn btn-danger btn-sm remove-btn"
                        onClick={() => handleRemoveUser(compId)}
                      >
                        <span className="remove-text">Remove</span>
                        <span className="remove-icon">✖</span>
                      </button>

                  </li>
                ))}
              </ul>
            </div>
          )}

          <button type="submit" className="btn btn-primary btn-animate mt-3">
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
}