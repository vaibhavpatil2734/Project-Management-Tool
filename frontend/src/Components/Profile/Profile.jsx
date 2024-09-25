import React, { useState } from 'react';
import { FaUserCircle, FaTimes } from 'react-icons/fa'; // Import close icon from Font Awesome
import './profile.css'; // Import your custom CSS for profile styling

let nameNav; // Declare the variable for exporting

export default function Profile({ profiledata }) {
  const [isVisible, setIsVisible] = useState(true); // State to control the visibility of the profile card

  if (!profiledata) {
    return <div>Loading...</div>; // Handle the case where profile data is not available yet
  }

  const { name, email, role, compId } = profiledata;

  nameNav = name; // Assign the value of name to nameNav

  // Logout handler
  const handleLogout = () => {
    // Clear any authentication data (like tokens)
    localStorage.removeItem('token');
    alert('Logged out successfully!');
    // Redirect or handle other logout logic
    window.location.href = '/login';
  };

  // Close button handler
  const handleClose = () => {
    setIsVisible(false); // Hide the profile card by setting isVisible to false
  };

  if (!isVisible) {
    return null; // Return null when the profile card is hidden
  }

  return (
    <div className="profile-card">
      <div className="profile-header">
        {/* Close button with icon */}
        <button className="close-button" onClick={handleClose}>
          <FaTimes size={20} />
        </button>
        
        <FaUserCircle size={80} className="profile-icon" />
        <h3>{name}</h3>
        <p className="text-muted">{role}</p>
        <button className="btn btn-danger logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      
      <div className="profile-body">
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Company ID:</strong> {compId}</p>
      </div>
    </div>
  );
}

// Export the nameNav variable
export { nameNav };
