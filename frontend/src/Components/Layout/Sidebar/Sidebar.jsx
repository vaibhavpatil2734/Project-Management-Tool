import React from 'react';
import { useNavigate } from 'react-router-dom';
import './sidebar.css';

export default function Sidebar() {
  const navigate = useNavigate();

  const handleNavigateToCreateProject = () => {
    navigate("/CreateProject");
  };

  const handleNavigateToCreateTask = () => {
    navigate("/CreateTasks");
  };

  return (
    <div className="sidebar">
      <div className="button-container">
        {/* Button for navigating to the CreateProject page */}
        <button className="sidebar-button add-project-button" onClick={handleNavigateToCreateProject}>
          Create Project
        </button>
        
        {/* Button for navigating to the CreateTask page */}
        <button className="sidebar-button add-task-button" onClick={handleNavigateToCreateTask}>
          Create Task
        </button>
      </div>

      <ul className="sidebar-menu">
        <li><a onClick={handleNavigateToCreateTask}>Create Tasks</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
  );
}
