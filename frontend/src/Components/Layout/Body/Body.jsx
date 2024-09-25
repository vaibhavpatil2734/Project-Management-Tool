import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom'; // No need to import Router
import CreateProject from '../../Project/CreateProject';
import Register from '../../Auth/Register';
import Login from '../../Auth/Login';
import "./body.css";
import Profile from '../../Profile/Profile';

export default function Body() {
  const [profiledata, setProfiledata] = useState(null);

  const getProfiledata = (profile) => {
    setProfiledata(profile);
  };

  return (
    <div className='bodyposition'>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login getprofiledata={getProfiledata} />} /> 
        <Route path="/CreateProject" element={<CreateProject />} />
        <Route path="/Profile" element={<Profile profiledata={profiledata} />} />
      </Routes>
    </div>
  );
}
