import React from 'react';
import { Route, Routes } from 'react-router-dom'; // No need to import Router
import CreateProject from '../../Project/CreateProject';
import Register from '../../Auth/Register';
import Login from '../../Auth/Login';
import "./body.css"

export default function Body() {
  return (
    <div className='bodyposition'>

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/CreateProject" element={<CreateProject/>} />
      </Routes>
    </div>
  );
}
