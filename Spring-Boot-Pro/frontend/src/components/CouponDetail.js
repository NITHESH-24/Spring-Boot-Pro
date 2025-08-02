import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaEdit, FaTrash, FaCheckCircle, FaClock, FaCalendar, FaStore, FaTag } from 'react-icons/fa';
import './CouponDetail.css';

const CouponDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchCoupon();
  }, [id]);

  const fetchCoupon = async () => {
    try {
      const response = await axios.get(`/coupons/${id}`);
      setCoupon(response.data);
    } catch (error) {
      console.error('Error fetching coupon:', error);
      navigate('/coupons');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsUsed = async () => {
    try {
      await axios.patch(`/coupons/${id}/mark-used`);
      setCoupon(prev => ({ ...prev, isUsed: true }));
    } catch (error) {
      console.error('Error marking coupon as used:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/coupons/${id}`);
      navigate('/coupons');
    } catch (error) {
      console.error('Error deleting coupon:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isExpired = (expiryDate) => {
    return expiryDate && new Date(expiryDate) < new Date();
  };

  const isExpiringSoon = (expiryDate) => {
    if (!expiryDate) return false;
    const weekFromNow = new Date();
    weekFromNow.setDate(weekFromNow.getDate() + 7);
    return new Date(expiryDate) <= weekFromNow && new Date(expiryDate) > new Date();
  };

  const getStatusBadge = () => {
    if (coupon.isUsed) {
      return <span className="badge badge-success"><FaCheckCircle /> Used</span>;
    } else if (isExpired(coupon.expiryDate)) {
      return <span className="badge badge-danger">Expired</span>;
    } else if (isExpiringSoon(coupon.expiryDate)) {
      return <span className="badge badge-warning"><FaClock /> Expiring Soon</span>;
    } else {
      return <span className="badge badge-info">Active</span>;
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading coupon...</p>
      </div>
    );
  }

  if (!coupon) {
    return (
      <div className="error-container">
        <h2>Coupon not found</h2>
        <button className="btn btn-primary" onClick={() => navigate('/coupons')}>
          Back to Coupons
        </button>
      </div>
    );
  }

  return (
    <div className="coupon-detail-container">
      <div className="detail-header">
        <button 
          className="btn btn-secondary back-btn"
          onClick={() => navigate('/coupons')}
        >
          <FaArrowLeft /> Back to Coupons
        </button>
        <h1>Coupon Details</h1>
      </div>

      <div className="detail-card card">
        <div className="coupon-header">
          <div className="coupon-title">
            <h2>{coupon.store}</h2>
            {getStatusBadge()}
          </div>
          <div className="coupon-actions">
            <button
              className="btn btn-warning"
              onClick={() => navigate(`/coupons/${id}/edit`)}
            >
              <FaEdit /> Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => setShowDeleteModal(true)}
            >
              <FaTrash /> Delete
            </button>
          </div>
        </div>

        <div className="coupon-code-large">
          {coupon.code}
        </div>

        <div className="coupon-info-grid">
          <div className="info-section">
            <h3>Basic Information</h3>
            <div className="info-item">
              <FaStore className="info-icon" />
              <div className="info-content">
                <label>Store/Website</label>
                <span>{coupon.store}</span>
              </div>
            </div>
            <div className="info-item">
              <FaTag className="info-icon" />
              <div className="info-content">
                <label>Description</label>
                <span>{coupon.description}</span>
              </div>
            </div>
            {coupon.category && (
              <div className="info-item">
                <FaTag className="info-icon" />
                <div className="info-content">
                  <label>Category</label>
                  <span>{coupon.category}</span>
                </div>
              </div>
            )}
          </div>

          <div className="info-section">
            <h3>Discount Details</h3>
            <div className="discount-highlight">
              <span className="discount-percentage">{coupon.discountPercentage}%</span>
              <span className="discount-label">OFF</span>
            </div>
          </div>
        </div>

        <div className="coupon-dates">
          <h3>Important Dates</h3>
          <div className="dates-grid">
            <div className="date-item">
              <FaCalendar className="date-icon" />
              <div className="date-content">
                <label>Created</label>
                <span>{formatDate(coupon.createdAt)}</span>
              </div>
            </div>
            {coupon.expiryDate && (
              <div className="date-item">
                <FaClock className="date-icon" />
                <div className="date-content">
                  <label>Expires</label>
                  <span className={isExpired(coupon.expiryDate) ? 'expired' : ''}>
                    {formatDate(coupon.expiryDate)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {coupon.notes && (
          <div className="coupon-notes">
            <h3>Notes</h3>
            <p>{coupon.notes}</p>
          </div>
        )}

        {!coupon.isUsed && !isExpired(coupon.expiryDate) && (
          <div className="action-section">
            <button
              className="btn btn-success btn-large"
              onClick={handleMarkAsUsed}
            >
              <FaCheckCircle /> Mark as Used
            </button>
          </div>
        )}
      </div>
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete the coupon "{coupon.code}"?</p>
            <p>This action cannot be undone.</p>
            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponDetail; 