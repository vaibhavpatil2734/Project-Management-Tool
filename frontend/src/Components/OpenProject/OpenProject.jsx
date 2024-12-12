import React, { useState, useEffect } from 'react';
import './openproject.css'; // Ensure this path is correct

export default function OpenProject({getProjectCount}) {
  const [title, setTitle] = useState('');
  const [projectData, setProjectData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedProjectData = localStorage.getItem('projectData');
    if (storedProjectData) {
      setProjectData(JSON.parse(storedProjectData));
      
    }
  }, []);

  const handleInputChange = (e) => {
    setTitle(e.target.value);
  };

  const handleOpenProject = async () => {
    if (!title) {
      setError('Please enter a project title.');
      return;
    }

    setError('');
    const token = localStorage.getItem('token');

    if (!token) {
      alert('No authentication token found. Please log in.');
      return;
    }
    try {
      const response = await fetch('https://project-management-tool-5be8.onrender.com/api/projects/openProject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to open project');
      }

      setProjectData(data.project);
      localStorage.setItem('projectData', JSON.stringify(data.project));
      getProjectCount(1)
      alert("project data found")
    } catch (err) {
      setError(err.message || 'Server error');
    }
  };

  return (
    <div className="open-project-container container my-5">
      <h2 className="text-center">Open Project</h2>
      <div className="input-container text-center my-4">
        <input
          type="text"
          placeholder="Enter project title to open project"
          value={title}
          onChange={handleInputChange}
          className="form-control project-title-input mx-auto"
          style={{ width: '50%' }} // Adjust width as needed
        />
        {title && ( // Show button only if title has text
          <button onClick={handleOpenProject} className="btn btn-primary open-project-button mt-3">
            Open Project
          </button>
        )}
      </div>

      {error && <p className="error-message text-danger text-center">{error}</p>}

      {projectData && (
        <div className="project-details-card card my-4 p-3">
          <h3 className="card-title">Project Details</h3>
          <p className="card-text"><strong>Title:</strong> {projectData.title}</p>
          <p className="card-text"><strong>Description:</strong> {projectData.description}</p>
          <p className="card-text"><strong>Assigned Users:</strong> {projectData.assignedUsers.join(', ')}</p>
        </div>
      )}
    </div>
  );
}
