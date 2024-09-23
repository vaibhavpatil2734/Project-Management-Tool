import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css'; // For custom animations
import { useNavigate, Link } from 'react-router-dom'; // Import Link

export default function Login({ getprofiledata }) { // Receive getprofiledata from props
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

        // Alert login success
        alert('Login successful');
        
        // Navigate to the Profile page after sending the data
        navigate('/Profile');
      } else {
        console.error('Login failed');
        alert('Invalid credentials, please try again');
      }
    } catch (error) {
      console.error('Error during login', error);
    }
  };

  return (
    <div className="container my-5 p-16">
      <div className="row justify-content-center">
        <div className="col-lg-16 col-md-18">
          <div className="card shadow-lg custom-card-width">
            <div className="card-body p-4">
              <h2 className="text-center mb-4 p-6">Login</h2>
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
        </div>
      </div>
    </div>
  );
}
