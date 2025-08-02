import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client validation
    if (!formData.username.trim()) {
      setError('Username is required');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('A valid email is required');
      return;
    }
    if (!formData.password || formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/api/auth/register', {
        username: formData.username.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password
        // If you really want to send enabled/accountNonExpired/accountNonLocked, include here (and on backend)
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
      alert('Registration successful! Please login.');
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      setError('');
      navigate('/login', {
        replace: true,
        state: { fromRegistration: true, success: true }
      });
    } catch (error) {
      let errorMessage = 'Registration failed. ';
      if (error.response && error.response.data) {
        if (typeof error.response.data === "string") {
          errorMessage += error.response.data;
        } else if (error.response.data.message) {
          errorMessage += error.response.data.message;
        } else {
          errorMessage += JSON.stringify(error.response.data);
        }
      } else {
        errorMessage += error.message;
      }
      setError(errorMessage);
    }
  };

  return (
      <div className="register-container">
        <div className="register-box">
          <h2>Create Account</h2>
          <form onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                  type="text" id="username" name="username"
                  value={formData.username} onChange={handleChange} required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                  type="email" id="email" name="email"
                  value={formData.email} onChange={handleChange} required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                  type="password" id="password" name="password"
                  value={formData.password} onChange={handleChange} required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                  type="password" id="confirmPassword" name="confirmPassword"
                  value={formData.confirmPassword} onChange={handleChange} required
              />
            </div>
            <button type="submit" className="register-button">Register</button>
          </form>
          <div className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
  );
}

export default Register;
