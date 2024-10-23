import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaEnvelope, FaBuilding } from 'react-icons/fa';
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

        <div className="progress-bar-container">
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { nameNav };
