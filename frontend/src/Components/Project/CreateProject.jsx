import React, { useState } from 'react';
import './createProject.css'; // Import custom CSS for animations

export default function CreateProject() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    createdBy: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/projects/createProjects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Project created:', data); // Debugging log for success
        alert('Project created successfully');
        setFormData({ title: '', description: '', createdBy: '' });
      } else {
        // More detailed error response handling
        const errorData = await response.json();
        console.error('Failed to create project:', errorData);
        alert('Failed to create project: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error creating project:', error); // Server or network error
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
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="createdBy">Created By (User ID)</label>
            <input
              type="text"
              className="form-control"
              id="createdBy"
              name="createdBy"
              value={formData.createdBy}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-animate mt-3">
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
}
