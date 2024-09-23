import React from 'react';
import { Route, Routes } from 'react-router-dom'; // No need to import Router
import CreateProject from '../../Project/CreateProject';
import Register from '../../Auth/Register';
import Login from '../../Auth/Login';
import "./body.css"
import Profile from '../../Profile/Profile';
import { useState } from 'react';

export default function Body() {
  const [profiledata, setprofiledata] = useState(null)
  const getprofiledata = (profile)=>{
    setprofiledata(profile)
  }
  return (
    <div className='bodyposition'>

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login getprofiledata={getprofiledata}/>} /> 
        <Route path="/CreateProject" element={<CreateProject/>} />
        <Route path="/Profile" element={<Profile profiledata={profiledata}/>} />
      </Routes>
      
    </div>
  );
}
