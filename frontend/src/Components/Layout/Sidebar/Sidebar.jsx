import React, { useState, useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom'; // Import useNavigate hook
import './sidebar.css'; // Import custom CSS for styling

export default function Sidebar() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  // Fetch projects from the API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/projects');
        const data = await response.json();
        setProjects(data.projects); // Assuming your API response has a 'projects' field
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
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
        <button className="add-project-button">
        <Link to="/CreateProject"><b className='bcolor'>+</b></Link>
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
