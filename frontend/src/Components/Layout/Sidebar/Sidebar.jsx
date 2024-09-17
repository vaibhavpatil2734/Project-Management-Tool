import React, { useState, useEffect } from 'react';
import './sidebar.css'; // Import custom CSS for styling

export default function Sidebar() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');

  useEffect(() => {
    // Fetch projects from an API or other source
    const fetchProjects = async () => {
      // Example: Fetching projects from an API
      // Replace with your actual API call
      const response = await fetch('http://localhost:5000/api/projects');
      const data = await response.json();
      setProjects(data);
    };

    fetchProjects();
  }, []);

  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
  };

  const handleAddProject = () => {
    // Logic to handle adding a new project
    alert('Add a new project');
  };

  return (
    <div className="sidebar">
      <div className="dropdown-container">
        <select 
          className="project-dropdown"
          value={selectedProject}
          onChange={handleProjectChange}
        >
          <option value="" disabled>Select a project</option>
          {projects.map(project => (
            <option key={project._id} value={project._id}>{project.title}</option>
          ))}
        </select>
        <button className="add-project-button" onClick={handleAddProject}>
          +
        </button>
      </div>
      <ul className="sidebar-menu">
        <li><a href="#home">Home</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
  );
}
