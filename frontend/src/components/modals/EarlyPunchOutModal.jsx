// components/modals/EarlyPunchOutModal.jsx
import React, { useState } from 'react';
import './EarlyPunchOutModal.css';

const EarlyPunchOutModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  workedHours, 
  requiredHours = 7 
}) => {
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const remainingHours = (requiredHours - workedHours).toFixed(1);
  const hoursWorked = workedHours.toFixed(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!reason.trim()) {
      setError('Please provide a reason for early punch-out');
      return;
    }

    if (reason.length < 10) {
      setError('Please provide a detailed reason (minimum 10 characters)');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await onSubmit(reason);
    } catch (err) {
      setError(err.message || 'Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="early-punchout-overlay" onClick={handleOverlayClick}>
      <div className="early-punchout-modal">
        <div className="modal-header">
          <h2>🔴 Early Punch-Out Request</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-content">
          <div className="work-summary">
            <div className="summary-item">
              <span className="label">Hours Worked:</span>
              <span className={`value ${workedHours >= requiredHours ? 'completed' : 'incomplete'}`}>
                {hoursWorked} hours
              </span>
            </div>
            <div className="summary-item">
              <span className="label">Required Hours:</span>
              <span className="value">{requiredHours} hours</span>
            </div>
            <div className="summary-item">
              <span className="label">Remaining:</span>
              <span className={`value ${remainingHours <= 0 ? 'completed' : 'incomplete'}`}>
                {remainingHours} hours
              </span>
            </div>
          </div>

          {remainingHours > 0 && (
            <div className="warning-alert">
              ⚠️ <strong>Attention:</strong> You need to work {remainingHours} more hours 
              to complete the minimum requirement. Early punch-out requires approval.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="reason">
                Reason for early punch-out *
                <span className="subtext">(Minimum 10 characters)</span>
              </label>
              <textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Please provide a detailed reason for early punch-out..."
                rows={4}
                minLength={10}
                required
              />
              {error && <div className="error-message">{error}</div>}
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={loading || !reason.trim()}
              >
                {loading ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </form>

          <div className="info-note">
            <p>ℹ️ <strong>Note:</strong></p>
            <ul>
              <li>Your request will be sent to admin for approval</li>
              <li>You can continue working while waiting for approval</li>
              <li>Admin may contact you for more details</li>
              <li>Approval is at the discretion of management</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarlyPunchOutModal;