import { Routes, Route } from 'react-router-dom';
import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';
import Navbar from './Components/Layout/Navbar/Navbar';
import Sidebar from './Components/Layout/Sidebar/sidebar';

function App() {
  return (
    <>
      <Navbar />
      <Sidebar/>
      <div className="container mt-5">
        <Routes>
          {/* <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} /> */}
          {/* Add more routes here as needed */}
        </Routes>
      </div>
    </>
  );
}

export default App;
