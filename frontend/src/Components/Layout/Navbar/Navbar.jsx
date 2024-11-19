import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Make sure to import Link for navigation
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import './navbar.css'; // Import the CSS file for custom styling
import { FaUserCircle } from 'react-icons/fa'; // Font Awesome for profile icon (optional)


// Navbar component
export default function Navbar() {

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <Link className="navbar-brand" >OrbitMatrix</Link>
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
        </div>
      </nav>
    </>
  );
}
