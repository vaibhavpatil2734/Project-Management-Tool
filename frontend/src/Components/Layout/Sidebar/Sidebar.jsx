import React from 'react';
import { useNavigate } from 'react-router-dom';
import './sidebar.css';

export default function Sidebar() {
  const navigate = useNavigate();

  const handleNavigateToCreateProject = () => {
    navigate("/CreateProject"); // Directly navigate to the CreateProject page
  };

  return (
    <div className="sidebar">
      <div className="dropdown-container">
        {/* Button for navigating to the CreateProject page */}
        <button className="add-project-button" onClick={handleNavigateToCreateProject}>
          <b className='bcolor'>+</b>
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
