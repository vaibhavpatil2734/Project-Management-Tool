import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaEnvelope, FaBuilding, FaSignOutAlt } from 'react-icons/fa';
import './profile.css';

let nameNav;

export default function Profile({ profiledata }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 1));
    }, 50);

    return () => clearInterval(progressInterval);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    alert("You have been logged out.");
    window.location.reload(); // Reload the page or navigate to login
  };

  if (!profiledata) {
    return <div>Loading...</div>;
  }

  const { name, email, role, compId } = profiledata;
  nameNav = name;

  return (
    <div className="profile-container">
      <div className="background-animation"></div>
      <div className="moving-circles"></div>
      
      <div className="profile-card animate">
        <div className="profile-header">
          <FaUserCircle size={120} className="profile-icon" />
          <div className="profile-name">{name}</div>
          <div className="profile-role">{role}</div>
        </div>

        <div className="profile-body">
          <p><FaEnvelope /> <strong>Email:</strong> {email}</p>
          <p><FaBuilding /> <strong>Company ID:</strong> {compId}</p>
        </div>

       

        <button className="logout-button" onClick={handleLogout}>
          <FaSignOutAlt className="logout-icon" /> Logout
        </button>
      </div>
    </div>
  );
}

