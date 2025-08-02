import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaPlus, FaSearch, FaClock, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    used: 0,
    expiringSoon: 0
  });
  const [recentCoupons, setRecentCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [allCoupons, activeCoupons, usedCoupons, expiringSoon] = await Promise.all([
        axios.get('/coupons'),
        axios.get('/coupons/active'),
        axios.get('/coupons/used'),
        axios.get('/coupons/expiring-soon')
      ]);

      setStats({
        total: allCoupons.data.length,
        active: activeCoupons.data.length,
        used: usedCoupons.data.length,
        expiringSoon: expiringSoon.data.length
      });
      const recent = allCoupons.data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
      setRecentCoupons(recent);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome to Coupon Manager</h1>
        <p>Manage your discount codes and save money on your purchases</p>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total Coupons</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.active}</div>
          <div className="stat-label">Active Coupons</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.used}</div>
          <div className="stat-label">Used Coupons</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.expiringSoon}</div>
          <div className="stat-label">Expiring Soon</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions card">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/coupons/new" className="action-card">
            <FaPlus className="action-icon" />
            <h3>Add New Coupon</h3>
            <p>Store a new discount code</p>
          </Link>
          <Link to="/coupons" className="action-card">
            <FaSearch className="action-icon" />
            <h3>View All Coupons</h3>
            <p>Browse your saved coupons</p>
          </Link>
        </div>
      </div>

      <div className="recent-coupons card">
        <h2>Recent Coupons</h2>
        {recentCoupons.length === 0 ? (
          <p className="no-coupons">No coupons yet. Add your first coupon to get started!</p>
        ) : (
          <div className="coupons-grid">
            {recentCoupons.map((coupon) => (
              <div key={coupon.id} className="coupon-card">
                <div className="coupon-header">
                  <h3>{coupon.store}</h3>
                  <span className={`badge ${coupon.isUsed ? 'badge-success' : 'badge-info'}`}>
                    {coupon.isUsed ? 'Used' : 'Active'}
                  </span>
                </div>
                <div className="coupon-code">{coupon.code}</div>
                <p className="coupon-description">{coupon.description}</p>
                <div className="coupon-details">
                  <span className="discount">{coupon.discountPercentage}% off</span>
                  {coupon.expiryDate && (
                    <span className="expiry">
                      <FaClock /> Expires: {formatDate(coupon.expiryDate)}
                    </span>
                  )}
                </div>
                <Link to={`/coupons/${coupon.id}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Alerts */}
      {stats.expiringSoon > 0 && (
        <div className="alert-card card">
          <div className="alert-header">
            <FaExclamationTriangle className="alert-icon" />
            <h3>Coupons Expiring Soon</h3>
          </div>
          <p>You have {stats.expiringSoon} coupon(s) expiring within the next 7 days.</p>
          <Link to="/coupons" className="btn btn-warning">
            View Expiring Coupons
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 