import { Routes, Route } from 'react-router-dom';
import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';
import Navbar from './Components/Layout/Navbar/Navbar';
import Sidebar from './Components/Layout/Sidebar/sidebar';
import Body from './Components/Layout/Body/Body';
import CreateProject from './Components/Project/CreateProject';

function App() {
  return (
    <>
      <Navbar />
      <Body/>
      
    </>
  );
}

export default App;
