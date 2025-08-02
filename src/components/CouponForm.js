import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSave, FaArrowLeft, FaTimes } from 'react-icons/fa';
import './CouponForm.css';

const CouponForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    code: '',
    description: '',
    store: '',
    discountPercentage: '',
    category: '',
    expiryDate: '',
    notes: '',
    isUsed: false
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditing);

  useEffect(() => {
    if (isEditing) {
      fetchCoupon();
    }
  }, [id]);

  const fetchCoupon = async () => {
    try {
      const response = await axios.get(`/coupons/${id}`);
      const coupon = response.data;

      const formattedDate = coupon.expiryDate
          ? new Date(coupon.expiryDate).toISOString().split('T')[0]
          : '';

      setFormData({
        code: coupon.code || '',
        description: coupon.description || '',
        store: coupon.store || '',
        discountPercentage: coupon.discountPercentage || '',
        category: coupon.category || '',
        expiryDate: formattedDate,
        notes: coupon.notes || '',
        isUsed: coupon.isUsed || false
      });
    } catch (error) {
      console.error('Error fetching coupon:', error);
      navigate('/coupons');
    } finally {
      setInitialLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.code.trim()) newErrors.code = 'Coupon code is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.store.trim()) newErrors.store = 'Store/Website is required';

    if (!formData.discountPercentage) {
      newErrors.discountPercentage = 'Discount percentage is required';
    } else if (isNaN(formData.discountPercentage) || parseFloat(formData.discountPercentage) <= 0) {
      newErrors.discountPercentage = 'Discount must be a positive number';
    }

    if (formData.expiryDate && new Date(formData.expiryDate) < new Date()) {
      newErrors.expiryDate = 'Expiry date cannot be in the past';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    const submitData = {
      ...formData,
      discountPercentage: parseFloat(formData.discountPercentage),
      expiryDate: formData.expiryDate || null
    };

    console.log("🚀 Submitting coupon:", submitData); // Debug log

    try {
      const config = {
        headers: { 'Content-Type': 'application/json' }
      };

      if (isEditing) {
        await axios.put(`/coupons/${id}`, submitData, config);
      } else {
        await axios.post('/coupons', submitData, config);
      }

      navigate('/coupons');
    } catch (error) {
      console.error('❌ Error saving coupon:', error);
      const backendMessage = error.response?.data;
      setErrors({
        submit: typeof backendMessage === 'string' ? backendMessage : 'Error saving coupon'
      });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading coupon...</p>
        </div>
    );
  }

  return (
      <div className="coupon-form-container">
        <div className="form-header">
          <button className="btn btn-secondary back-btn" onClick={() => navigate('/coupons')}>
            <FaArrowLeft /> Back to Coupons
          </button>
          <h1>{isEditing ? 'Edit Coupon' : 'Add New Coupon'}</h1>
        </div>

        <div className="form-card card">
          <form onSubmit={handleSubmit}>
            {errors.submit && (
                <div className="error-message">
                  <FaTimes /> {errors.submit}
                </div>
            )}

            <div className="form-grid">
              <div className="form-group">
                <label>Coupon Code</label>
                <input type="text" name="code" value={formData.code} onChange={handleChange} />
                {errors.code && <span className="error">{errors.code}</span>}
              </div>

              <div className="form-group">
                <label>Description</label>
                <input type="text" name="description" value={formData.description} onChange={handleChange} />
                {errors.description && <span className="error">{errors.description}</span>}
              </div>

              <div className="form-group">
                <label>Store / Website</label>
                <input type="text" name="store" value={formData.store} onChange={handleChange} />
                {errors.store && <span className="error">{errors.store}</span>}
              </div>

              <div className="form-group">
                <label>Discount (%)</label>
                <input type="number" name="discountPercentage" value={formData.discountPercentage} onChange={handleChange} />
                {errors.discountPercentage && <span className="error">{errors.discountPercentage}</span>}
              </div>

              <div className="form-group">
                <label>Category</label>
                <input type="text" name="category" value={formData.category} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Expiry Date</label>
                <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} />
                {errors.expiryDate && <span className="error">{errors.expiryDate}</span>}
              </div>

              <div className="form-group full-width">
                <label>Notes</label>
                <textarea name="notes" value={formData.notes} onChange={handleChange} />
              </div>

              {isEditing && (
                  <div className="form-group full-width">
                    <label className="checkbox-label">
                      <input type="checkbox" name="isUsed" checked={formData.isUsed} onChange={handleChange} />
                      <span className="checkmark"></span>
                      Mark as used
                    </label>
                  </div>
              )}
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary btn-large" disabled={loading}>
                <FaSave /> {loading ? 'Saving...' : isEditing ? 'Update Coupon' : 'Create Coupon'}
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default CouponForm;