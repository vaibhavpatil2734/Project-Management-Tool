import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css';
import { FaBars } from 'react-icons/fa';

export default function Navbar({ getsidbarcout }) {
  const [count, setCount] = useState(0);

  const toggleCount = () => {
    const newCount = count === 0 ? 1 : 0;
    setCount(newCount);
    getsidbarcout(newCount);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container d-flex justify-content-between align-items-center">
          <Link className="navbar-brand">OrbitMatrix</Link>

          {/* Button to toggle count, visible only on mobile view */}
          <button 
            className="btn btn-dark d-lg-none" 
            onClick={toggleCount}
          >
            <FaBars />
          </button>
        </div>
      </nav>
    </>
  );
}
