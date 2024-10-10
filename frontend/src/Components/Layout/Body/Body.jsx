import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateProject from '../../Project/CreateProject';
import Register from '../../Auth/Register';
import Login from '../../Auth/Login';
import Profile from '../../Profile/Profile';
import CreateTasks from '../../CreateTasks/CreateTasks';
import OpenProject from '../../OpenProject/OpenProject';
import ViewTasks from '../../ViewTasks/ViewTasks';
import UpdateTask from '../../UpdateTask/UpdateTask';
import Chat from '../../Chat/Chat';
import MyCalendar from '../../MyCalendar/MyCalendar';
import './body.css'; // Custom styles
import Sidebar from '../Sidebar/sidebar';

export default function Body() {
  const [profiledata, setProfiledata] = useState(null);
  const [loginCount, setLoginCount] = useState(0); // Track login count

  const getProfiledata = (profile) => {
    setProfiledata(profile);
    setLoginCount(1); // Set login count to 1 after login
  };
  const getLoginCount = (count)=>{
    setLoginCount(count)
  }

  return (
    <div className='body-wrapper'>
      {/* Conditionally render sidebar if loginCount is 1 */}
      {loginCount === 1 && <Sidebar/>}
      {loginCount === 2 && <Register />}
      {loginCount === 0 && <Login getprofiledata={getProfiledata} getLoginCount={getLoginCount}  />}k
      <div className='content-area'>
        <Routes>
          <Route path="/CreateProject" element={<CreateProject />} />
          <Route path="/Profile" element={<Profile profiledata={profiledata} />} />
          <Route path="/CreateTasks" element={<CreateTasks />} />
          <Route path="/OpenProject" element={<OpenProject />} />
          <Route path="/ViewTasks" element={<ViewTasks />} />
          <Route path="/update-task/:id" element={<UpdateTask />} />
          <Route path="/Chat" element={<Chat />} />
          <Route path="/MyCalendar" element={<MyCalendar />} />
        </Routes>
      </div>
    </div>
  );
}
