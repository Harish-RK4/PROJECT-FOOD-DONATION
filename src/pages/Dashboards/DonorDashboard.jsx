import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Clock, CheckCircle, Trash2 } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';
import { supabase } from '../../lib/supabaseClient';
import NewDonationModal from '../../components/NewDonationModal';
import './DonorDashboard.css';

const DonorDashboard = () => {
  const { userId } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recentDonations, setRecentDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this donation?")) return;
    
    try {
      const { error } = await supabase
        .from('donations')
        .delete()
        .eq('id', itemId);
        
      if (error) throw error;
      // Filter it out from local state instantly for snappy UI
      setRecentDonations(prev => prev.filter(item => item.id !== itemId));
    } catch (error) {
      console.error("Error deleting donation:", error);
      alert("Failed to delete donation");
    }
  };

  const fetchDonations = async () => {
    try {
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .eq('donor_id', userId || 'unknown')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setRecentDonations(data || []);
    } catch (error) {
      console.error("Error fetching donations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, [userId]);

  // Dynamic status counting
  const availableCount = recentDonations.filter(d => d.status === 'Available').length;
  const reservedCount = recentDonations.filter(d => d.status === 'Reserved').length;
  const deliveredCount = recentDonations.filter(d => d.status === 'Delivered').length;

  const donationStats = [
    { title: "Available", value: availableCount, icon: <Package size={24} />, color: "var(--primary)" },
    { title: "Reserved", value: reservedCount, icon: <Clock size={24} />, color: "var(--accent)" },
    { title: "Delivered", value: deliveredCount, icon: <CheckCircle size={24} />, color: "var(--secondary)" }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Donor Dashboard</h2>
        <p>Manage your food donations and track your community impact.</p>
      </div>

      <div className="stats-container">
        {donationStats.map((stat, idx) => (
          <motion.div 
            key={idx}
            className="status-card glass-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="status-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="status-details">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="dashboard-content" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div className="donations-list glass-panel" style={{ flex: '2 1 600px' }}>
          <div className="list-header">
            <h3>Recent Donations</h3>
            <button 
              className="btn btn-primary" 
              style={{ padding: '0.5rem 1rem' }}
              onClick={() => setIsModalOpen(true)}
            >
              + New Donation
            </button>
          </div>
          
          <div className="table-responsive">
            <table className="donations-table">
              <thead>
                <tr>
                  <th>Food Item</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Posted Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading && <tr><td colSpan="5" className="text-muted" style={{textAlign: "center", padding: '2rem'}}>Loading database sync...</td></tr>}
                {!loading && recentDonations.length === 0 && (
                  <tr><td colSpan="5" className="text-muted" style={{textAlign: "center", padding: '2rem'}}>No donations found. Submit your first one!</td></tr>
                )}
                {recentDonations.map((item) => (
                  <tr key={item.id}>
                    <td className="font-medium">{item.title}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <span className={`status-badge status-${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="text-muted">{new Date(item.created_at).toLocaleDateString()}</td>
                    <td>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.25rem' }}
                        title="Delete Donation"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="impact-tracker glass-panel" style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2rem' }}>
          <div className="list-header" style={{ marginBottom: '0' }}>
            <h3>Your Impact Score</h3>
          </div>
          <div className="impact-score">
            <h1 style={{ fontSize: '3rem', color: 'var(--primary)', lineHeight: '1' }}>8.2k</h1>
            <p className="text-muted">Total kg of food saved from landfills</p>
          </div>
          
          <div className="impact-progress-group">
            <div className="progress-label" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>
              <span>Monthly Goal</span>
              <span>10k kg</span>
            </div>
            <div className="progress-bar-bg" style={{ width: '100%', height: '10px', backgroundColor: 'var(--surface-alt)', borderRadius: '99px', overflow: 'hidden' }}>
              <motion.div 
                className="progress-bar-fill" 
                style={{ height: '100%', backgroundColor: 'var(--accent)' }} 
                initial={{ width: 0 }}
                animate={{ width: '82%' }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
          </div>
          
          <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border)', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            <p>You are in the top <strong>5%</strong> of donors in your region this month! Keep it up!</p>
          </div>
        </div>
      </div>
      
      <NewDonationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default DonorDashboard;
