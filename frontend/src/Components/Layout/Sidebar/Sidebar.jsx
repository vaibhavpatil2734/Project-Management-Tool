import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './sidebar.css';

export default function Sidebar() {
  const navigate = useNavigate();
  const [projectTitle, setProjectTitle] = useState('');

  const handleNavigateToOpenProject = () => {
    navigate("/OpenProject");
  };

  const handleNavigateToCreateProject = () => {
    navigate("/CreateProject");
  };

  const handleNavigateToCreateTask = () => {
    navigate("/CreateTasks");
  };

  const handleNavigateToViewTask = () => {
    navigate("/ViewTasks");
  };

  const handleNavigateToChat = () => {
    navigate("/Chat");
  };

  const handleNavigateMyCalendar = () => {
    navigate("/MyCalendar");
  };
  const handleNavigateToBase = () => {
    navigate("/Base");
  };

  useEffect(() => {
    const projectData = localStorage.getItem('projectData');
    if (projectData) {
      const parsedData = JSON.parse(projectData);
      setProjectTitle(parsedData.title);
    }
  }, []);

  return (
    <div className="sidebar">
      <h2 className="sidebar-header">Project Manager</h2>

      <div className="card button-card">
        <div className="button-container">
          <button className="sidebar-button add-project-button" onClick={handleNavigateToCreateProject}>
            Create Project
          </button>
          <button className="sidebar-button add-task-button" onClick={handleNavigateToCreateTask}>
            Create Task
          </button>
          <button className="sidebar-button add-task-button" onClick={handleNavigateToOpenProject}>
            Open Project
          </button>
        </div>
      </div>

      {projectTitle && <div className="project-title">Project: {projectTitle}</div>}

      <div className="card menu-card">
        <ul className="sidebar-menu">
        <li><a className="menu-link" onClick={handleNavigateToBase}>View progress</a></li>
          <li><a className="menu-link" onClick={handleNavigateToViewTask}>View Tasks</a></li>
          <li><a className="menu-link" onClick={handleNavigateToChat}>Chat Room</a></li>
          <li><a className="menu-link" onClick={handleNavigateMyCalendar}>Calendar</a></li>
          <li><a className="menu-link" href="#contact">Contact</a></li>
        </ul>
      </div>
    </div>
  );
}
