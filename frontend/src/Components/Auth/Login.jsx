import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css'; // Custom CSS for styling
import { useNavigate, Link } from 'react-router-dom';

export default function Login({ getprofiledata }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://project-management-tool-5be8.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const { token, profile } = await response.json();
        getprofiledata(profile);
        localStorage.setItem('token', token);
        alert('Login successful');
        navigate('/dashboard');
      } else {
        alert('Invalid credentials, please try again');
      }
    } catch (error) {
      console.error('Error during login', error);
    }
  };

  return (
    <div className="fullscreen-container">
      <div className="cardOne m-2">
        <h2 className="text-center mb-4">- Login -</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <div className="mt-3 text-center">
          <Link to="/register">Register if you don't have an account</Link>
        </div>
      </div>
    </div>
  );
}
