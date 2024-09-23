import React from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Icon for the profile picture
import './profile.css'; // Import your custom CSS for profile styling

export default function Profile({ profiledata }) {
  if (!profiledata) {
    return <div>Loading...</div>; // Handle the case where profile data is not available yet
  }

  const { name, email, role, compId } = profiledata;

  return (
    <div className="profile-card">
      <div className="profile-header">
        <FaUserCircle size={80} className="profile-icon" />
        <h3>{name}</h3>
        <p className="text-muted">{role}</p>
      </div>
      
      <div className="profile-body">
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Company ID:</strong> {compId}</p>
      </div>
    </div>
  );
}
