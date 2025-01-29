import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import CreateProject from '../../Project/CreateProject';
import Profile from '../../Profile/Profile';
import CreateTasks from '../../CreateTasks/CreateTasks';
import OpenProject from '../../OpenProject/OpenProject';
import ViewTasks from '../../ViewTasks/ViewTasks';
import UpdateTask from '../../UpdateTask/UpdateTask';
import Chat from '../../Chat/Chat';
import MyCalendar from '../../MyCalendar/MyCalendar';
import './body.css'; // Custom styles
import Base from '../../Base/Base';
import Contact from '../../Contact/Contact';

export default function Body({ profiledata, getProjectCount, getsidbarcout }) {
  
  const handleOutSideClick = () => {
    getsidbarcout(0)
  };

  return (
    <div className="bodyposition" onClick={handleOutSideClick}>
      <div className="content-area">
        <Routes>
          <Route path="/" element={<CreateProject />} />
          <Route path="/Profile" element={<Profile profiledata={profiledata} />} />
          <Route path="/CreateTasks" element={<CreateTasks />} />
          <Route path="/OpenProject" element={<OpenProject getProjectCount={getProjectCount} />} />
          <Route path="/ViewTasks" element={<ViewTasks />} />
          <Route path="/update-task/:id" element={<UpdateTask />} />
          <Route path="/Chat" element={<Chat />} />
          <Route path="/MyCalendar" element={<MyCalendar />} />
          <Route path='/Base' element={<Base />} />
          <Route path='/Contact' element={<Contact />} />
        </Routes>
        <Outlet />
      </div>
    </div>
  );
}
