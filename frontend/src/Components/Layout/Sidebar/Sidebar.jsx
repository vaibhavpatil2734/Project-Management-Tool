import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './sidebar.css';
import { FaUserCircle } from 'react-icons/fa';

export default function Sidebar({ projectCount, sidbarcout }) {
  const navigate = useNavigate();
  const [projectTitle, setProjectTitle] = useState('');

  // Conditional navigation function
  const handleConditionalNavigation = (navigateTo) => {
    if (projectCount === 1) {
      navigate(navigateTo);
    } else {
      alert("Please open a project first.");
    }
  };

  const handleNavigateToOpenProject = () => {
    navigate("/dashboard/OpenProject");
  };

  const handleNavigateToCreateProject = () => {
    navigate("/dashboard/");
  };

  const handleNavigateToContact = () => {
    navigate("/dashboard/contact");
  };

  const handleNavigateToProfile = () => {
    navigate("/dashboard/profile");
  };

  useEffect(() => {
    const projectData = localStorage.getItem('projectData');
    if (projectData) {
      const parsedData = JSON.parse(projectData);
      setProjectTitle(parsedData.title);
    }
  }, []);

  // Check if it's a laptop view or mobile view
  const isLaptopView = window.innerWidth >= 1024;

  return (
    <div className={`sidebar ${isLaptopView ? 'visible' : (sidbarcout === 1 ? 'visible' : 'hidden')}`}>
      <h2 className="sidebar-header">Project Manager</h2>

      <div className="card button-card">
        <div className="button-container">
          <button 
            className="sidebar-button add-project-button" 
            onClick={handleNavigateToCreateProject}
          >
            Create Project
          </button>
          <button 
            className="sidebar-button add-task-button" 
            onClick={() => handleConditionalNavigation("/dashboard/CreateTasks")}
          >
            Create Task
          </button>
          <button 
            className="sidebar-button add-task-button" 
            onClick={handleNavigateToOpenProject}
          >
            Open Project
          </button>
        </div>
      </div>

      {projectTitle && <div className="project-title">Project: {projectTitle}</div>}

      <div className="card menu-card">
        <ul className="sidebar-menu">
          <li>
            <a 
              className="menu-link" 
              onClick={() => handleConditionalNavigation("/dashboard/Base")}
            >
              View Progress
            </a>
          </li>
          <li>
            <a 
              className="menu-link" 
              onClick={() => handleConditionalNavigation("/dashboard/ViewTasks")}
            >
              View Tasks
            </a>
          </li>
          <li>
            <a 
              className="menu-link" 
              onClick={() => handleConditionalNavigation("/dashboard/Chat")}
            >
              Chat Room
            </a>
          </li>
          <li>
            <a 
              className="menu-link" 
              onClick={() => handleConditionalNavigation("/dashboard/MyCalendar")}
            >
              Calendar
            </a>
          </li>
          <li>
            <a 
              className="menu-link" 
              onClick={handleNavigateToContact}
            >
              Contact
            </a>
          </li>
        </ul>
      </div>

      <div className="cardprofile">
        <button 
          className="sidebar-button profile-button" 
          onClick={handleNavigateToProfile}
        >
          <FaUserCircle size={24} className="me-2" />
          Profile
        </button>
      </div>
    </div>
  );
}
