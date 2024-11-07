import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css'; // Custom CSS for animations
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation
import { motion } from 'framer-motion'; // Framer motion for animation

export default function Login({ getprofiledata, getLoginCount }) {
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
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const { token, profile } = await response.json();

        // Pass profile data to Body component using the getprofiledata function
        getprofiledata(profile);

        // Save token to localStorage or handle authentication
        localStorage.setItem('token', token);

        console.log('Login successful. Token:', token);

        // Alert login successs
        alert('Login successful');

        // Navigate to the Profile page after sending the data
        navigate('/dashboard');
      } else {
        console.error('Login failed');
        alert('Invalid credentials, please try again');
      }
    } catch (error) {
      console.error('Error during login', error);
    }
  };

  const handleNavigateToRegistration = () => {
    navigate("/register");
  };

  return (
    <div className="fullscreen-container">
      {/* Background with animated progress bars, pie chart, and line graph */}
      <div className="background-animation">
        <div className="progress-bar"></div>
        <div className="progress-bar"></div>
        <div className="progress-bar"></div>
        <div className="pie-chart"></div>
        <svg className="line-graph" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100">
          <polyline className="line" points="0,90 20,60 40,70 60,50 80,55 100,40 120,30 140,45 160,35 180,20 200,30" />
        </svg>
      </div>

      <motion.div
        className="login-container"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="container my-5 p-16">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
              <motion.div
                className="card shadow-lg custom-card-width"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="card-body p-4">
                  <h2 className="text-center mb-4">Login</h2>
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
                    <Link onClick={handleNavigateToRegistration}>Register if you don't have an account</Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
