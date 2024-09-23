import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import './Navbar.css'; // Import the CSS file for custom styling
import { FaUserCircle } from 'react-icons/fa'; // Font Awesome for profile icon (optional)

export default function Navbar() {

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">MyApp</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                {/* Profile button with user name and profile icon */}
                {/* <button onClick={toggleProfileCard} className="btn btn-outline-light d-flex align-items-center">
                  <FaUserCircle size={24} className="me-2" />
                  {user.name}
                </button> */}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    
    </>
  );
}
