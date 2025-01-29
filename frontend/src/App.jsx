import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';
import Navbar from './Components/Layout/Navbar/Navbar';
import Sidebar from './Components/Layout/Sidebar/Sidebar';
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

  const [sidbarcout, setsidbarcout] = useState(0)

const getsidbarcout = (count) => {
  setsidbarcout(count);
}

  return (
    <>
      <Navbar getsidbarcout={getsidbarcout} profiledata={profiledata}/>
      <Routes>
        <Route path="/" element={<Login getprofiledata={getProfiledata} />} />
        <Route path="/register" element={<Register />} />

        <Route 
          path="/dashboard/*" 
          element={
            profiledata ? (
              <div className="app-container">
                <Sidebar projectCount={projectCount} sidbarcout={sidbarcout}/>
                <Body profiledata={profiledata} getProjectCount={getProjectCount} getsidbarcout={getsidbarcout}/>
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
