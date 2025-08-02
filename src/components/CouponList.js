import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaEye, FaClock, FaCheckCircle } from 'react-icons/fa';
import './CouponList.css';

const CouponList = () => {
  const [coupons, setCoupons] = useState([]);
  const [filteredCoupons, setFilteredCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState(null);

  useEffect(() => {
    fetchCoupons();
  }, []);

  useEffect(() => {
    filterCoupons();
  }, [coupons, searchTerm, filter]);

  const fetchCoupons = async () => {
    try {
      const response = await axios.get('/coupons');
      setCoupons(response.data);
    } catch (error) {
      console.error('Error fetching coupons:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterCoupons = () => {
    let filtered = [...coupons];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(coupon =>
        coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coupon.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coupon.store.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (coupon.category && coupon.category.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    switch (filter) {
      case 'active':
        filtered = filtered.filter(coupon => !coupon.isUsed && (!coupon.expiryDate || new Date(coupon.expiryDate) > new Date()));
        break;
      case 'used':
        filtered = filtered.filter(coupon => coupon.isUsed);
        break;
      case 'expired':
        filtered = filtered.filter(coupon => coupon.expiryDate && new Date(coupon.expiryDate) < new Date());
        break;
      case 'expiring-soon':
        const weekFromNow = new Date();
        weekFromNow.setDate(weekFromNow.getDate() + 7);
        filtered = filtered.filter(coupon => 
          coupon.expiryDate && 
          new Date(coupon.expiryDate) <= weekFromNow && 
          new Date(coupon.expiryDate) > new Date()
        );
        break;
      default:
        break;
    }

    setFilteredCoupons(filtered);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/coupons/${id}`);
      setCoupons(coupons.filter(coupon => coupon.id !== id));
      setShowDeleteModal(false);
      setCouponToDelete(null);
    } catch (error) {
      console.error('Error deleting coupon:', error);
    }
  };

  const handleMarkAsUsed = async (id) => {
    try {
      await axios.patch(`/coupons/${id}/mark-used`);
      setCoupons(coupons.map(coupon => 
        coupon.id === id ? { ...coupon, isUsed: true } : coupon
      ));
    } catch (error) {
      console.error('Error marking coupon as used:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
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

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading coupons...</p>
      </div>
    );
  }

  return (
    <div className="coupon-list">
      <div className="list-header">
        <h1>All Coupons</h1>
        <Link to="/coupons/new" className="btn btn-primary">
          <FaPlus /> Add New Coupon
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="search-filter-section">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search coupons by code, description, store, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({coupons.length})
          </button>
          <button
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active ({coupons.filter(c => !c.isUsed && (!c.expiryDate || new Date(c.expiryDate) > new Date())).length})
          </button>
          <button
            className={`filter-btn ${filter === 'used' ? 'active' : ''}`}
            onClick={() => setFilter('used')}
          >
            Used ({coupons.filter(c => c.isUsed).length})
          </button>
          <button
            className={`filter-btn ${filter === 'expired' ? 'active' : ''}`}
            onClick={() => setFilter('expired')}
          >
            Expired ({coupons.filter(c => c.expiryDate && new Date(c.expiryDate) < new Date()).length})
          </button>
          <button
            className={`filter-btn ${filter === 'expiring-soon' ? 'active' : ''}`}
            onClick={() => setFilter('expiring-soon')}
          >
            Expiring Soon ({coupons.filter(c => isExpiringSoon(c.expiryDate)).length})
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="results-info">
        <p>Showing {filteredCoupons.length} of {coupons.length} coupons</p>
      </div>

      {/* Coupons Grid */}
      {filteredCoupons.length === 0 ? (
        <div className="no-coupons">
          <p>No coupons found matching your criteria.</p>
          {searchTerm && (
            <button 
              className="btn btn-secondary"
              onClick={() => setSearchTerm('')}
            >
              Clear Search
            </button>
          )}
        </div>
      ) : (
        <div className="coupons-grid">
          {filteredCoupons.map((coupon) => (
            <div key={coupon.id} className="coupon-card">
              <div className="coupon-header">
                <h3>{coupon.store}</h3>
                <div className="coupon-status">
                  {coupon.isUsed ? (
                    <span className="badge badge-success">
                      <FaCheckCircle /> Used
                    </span>
                  ) : isExpired(coupon.expiryDate) ? (
                    <span className="badge badge-danger">Expired</span>
                  ) : isExpiringSoon(coupon.expiryDate) ? (
                    <span className="badge badge-warning">
                      <FaClock /> Expiring Soon
                    </span>
                  ) : (
                    <span className="badge badge-info">Active</span>
                  )}
                </div>
              </div>

              <div className="coupon-code">{coupon.code}</div>
              <p className="coupon-description">{coupon.description}</p>
              
              <div className="coupon-details">
                <span className="discount">{coupon.discountPercentage}% off</span>
                {coupon.category && (
                  <span className="category">{coupon.category}</span>
                )}
              </div>

              {coupon.expiryDate && (
                <div className="expiry-info">
                  <FaClock />
                  <span>Expires: {formatDate(coupon.expiryDate)}</span>
                </div>
              )}

              <div className="coupon-actions">
                <Link to={`/coupons/${coupon.id}`} className="btn btn-secondary">
                  <FaEye /> View
                </Link>
                <Link to={`/coupons/${coupon.id}/edit`} className="btn btn-warning">
                  <FaEdit /> Edit
                </Link>
                {!coupon.isUsed && (
                  <button
                    className="btn btn-success"
                    onClick={() => handleMarkAsUsed(coupon.id)}
                  >
                    <FaCheckCircle /> Mark Used
                  </button>
                )}
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    setCouponToDelete(coupon);
                    setShowDeleteModal(true);
                  }}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete the coupon "{couponToDelete?.code}"?</p>
            <p>This action cannot be undone.</p>
            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setShowDeleteModal(false);
                  setCouponToDelete(null);
                }}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(couponToDelete.id)}
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

export default CouponList; 