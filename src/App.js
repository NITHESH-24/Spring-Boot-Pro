
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  Link,
} from 'react-router-dom';
import axios from 'axios';
import { FaHome, FaList, FaPlusCircle } from 'react-icons/fa';

import CouponList from './components/CouponList';
import CouponForm from './components/CouponForm';
import CouponDetail from './components/CouponDetail';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

import './App.css';

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

function Navigation() {
  const location = useLocation();

  return (
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <FaHome className="nav-icon" />
            <span>Coupon Manager</span>
          </div>
          <div className="nav-links">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              <FaHome /> Dashboard
            </Link>
            <Link to="/coupons" className={`nav-link ${location.pathname === '/coupons' ? 'active' : ''}`}>
              <FaList /> All Coupons
            </Link>
            <Link to="/coupons/new" className={`nav-link ${location.pathname === '/coupons/new' ? 'active' : ''}`}>
              <FaPlusCircle /> Add Coupon
            </Link>
          </div>
        </div>
      </nav>
  );
}
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [hasRegistered, setHasRegistered] = useState(false); // Optional toggle

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
      <Router>
        <div className="App">
          {isAuthenticated && <Navigation />}
          <div className="container">
            <Routes>
              <Route
                  path="/"
                  element={
                    !hasRegistered ? (
                        <Register />
                    ) : (
                        <Login onLoginSuccess={handleLoginSuccess} />
                    )
                  }
              />
              <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
              <Route path="/register" element={<Register />} />
              <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
              />
              <Route
                  path="/coupons"
                  element={
                    <PrivateRoute>
                      <CouponList />
                    </PrivateRoute>
                  }
              />
              <Route
                  path="/coupons/new"
                  element={
                    <PrivateRoute>
                      <CouponForm />
                    </PrivateRoute>
                  }
              />
              <Route
                  path="/coupons/:id"
                  element={
                    <PrivateRoute>
                      <CouponDetail />
                    </PrivateRoute>
                  }
              />
              <Route
                  path="/coupons/:id/edit"
                  element={
                    <PrivateRoute>
                      <CouponForm />
                    </PrivateRoute>
                  }
              />
            </Routes>
          </div>
        </div>
      </Router>
  );
}

export default App;