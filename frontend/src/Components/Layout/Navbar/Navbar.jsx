import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css';
import { FaBars } from 'react-icons/fa';

export default function Navbar({ getsidbarcout ,profiledata }) {
  const [count, setCount] = useState(0);

  const toggleCount = () => {
    if(profiledata != null ){
    const newCount = count === 0 ? 1 : 0;
    setCount(newCount);
    getsidbarcout(newCount);
    }else{
      alert("Please log in to access the sidebar.")
    }
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
