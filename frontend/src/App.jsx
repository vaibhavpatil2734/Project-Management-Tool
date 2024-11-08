import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';
import Navbar from './Components/Layout/Navbar/Navbar';
import Sidebar from './Components/Layout/Sidebar/sidebar';
import Body from './Components/Layout/Body/Body';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [profiledata, setProfiledata] = useState(null);
  const [projectCount, setprojectCount] = useState(0)
  const getProfiledata = (profile) => {
    setProfiledata(profile); // Set profile data
  };
  const getProjectCount = (count) => {
    setprojectCount(count);
  }



  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login getprofiledata={getProfiledata} />} />
        <Route path="/register" element={<Register />} />

        {/* Protected dashboard route */}
        <Route 
          path="/dashboard/*" 
          element={
            profiledata ? (
              <div className="app-container">
                <Sidebar projectCount={projectCount}/>
                <Body profiledata={profiledata} getProjectCount={getProjectCount}/>
              </div>
            ) : (
              <Navigate to="/" />  // If not logged in, redirect to login page
            )
          } 
        />
      </Routes>
    </>
  );
}

export default App;
