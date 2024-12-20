import React, { useState } from 'react';
import { useNavigate , Link } from 'react-router-dom'; // Correct import
import 'bootstrap/dist/css/bootstrap.min.css';
import './register.css'; // Custom CSS for styling

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    compId: '',
    password: '',
    role: 'user',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    try {
      const response = await fetch('https://project-management-tool-5be8.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Registration Successfully Completed!!!');
        // Redirect to login page after successful registration
        navigate("/");
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="register-container">
      <div className="register-card mt-5">
        <h2 className="register-title">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="name" className="register-label">Name</label>
            <input
              type="text"
              className="form-control register-input"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="compId" className="register-label">Company ID</label>
            <input
              type="text"
              className="form-control register-input"
              id="compId"
              name="compId"
              value={formData.compId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="email" className="register-label">Email address</label>
            <input
              type="email"
              className="form-control register-input"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="password" className="register-label">Password</label>
            <input
              type="password"
              className="form-control register-input"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="role" className="register-label">Role</label>
            <select
              className="form-control register-input"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="register-btn">Register</button>
          <Link to="/" className='text-light m-3 mt-5'>Login Page</Link>
        </form>
      </div>
    </div>
  );
}
