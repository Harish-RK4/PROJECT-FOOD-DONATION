import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@clerk/clerk-react';
import { supabase } from '../lib/supabaseClient';
import { X, UploadCloud } from 'lucide-react';
import './NewDonationModal.css';

const NewDonationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    quantity: '',
    expiryDate: '',
    description: '',
  });

  const { userId } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.from('donations').insert([
        { 
          donor_id: userId || 'unknown_donor',
          title: formData.title,
          quantity: formData.quantity,
          expiry_date: formData.expiryDate ? new Date(formData.expiryDate).toISOString() : null,
          status: 'Available',
          type: 'General', // Would be a dropdown selection in a larger app
        }
      ]);

      if (error) throw error;
      
      // If successful, reset and close
      setFormData({ title: '', quantity: '', expiryDate: '', description: '' });
      onClose();
      
      // Optionally trigger a window reload or prop callback to refresh dashboard data
      window.location.reload(); 
    } catch (error) {
      console.error("Error inserting donation:", error);
      alert("Failed to submit donation. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          <motion.div 
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div 
            className="modal-container glass-panel"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
          >
            <div className="modal-header">
              <h3>Post New Donation</h3>
              <button className="close-btn" onClick={onClose}><X size={20} /></button>
            </div>
            
            <form className="donation-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Food Title / Type</label>
                <input required type="text" placeholder="e.g. 20 Fresh Sandwiches" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Quantity</label>
                  <input required type="text" placeholder="e.g. 5 kg" value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Est. Expiry Time</label>
                  <input required type="datetime-local" value={formData.expiryDate} onChange={e => setFormData({...formData, expiryDate: e.target.value})} />
                </div>
              </div>

              <div className="form-group">
                <label>Food Photo</label>
                <div className="upload-placeholder">
                  <UploadCloud size={32} color="var(--primary)" />
                  <p>Click to upload or drag and drop</p>
                  <span>SVG, PNG, JPG (max 5MB)</span>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn btn-primary glow-effect">Post Donation</button>
              </div>
            </form>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
};

export default NewDonationModal;
