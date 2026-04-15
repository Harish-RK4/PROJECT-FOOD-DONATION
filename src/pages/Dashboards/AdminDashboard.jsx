import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Database, AlertOctagon, Trash2, MapPin, Activity, CheckCircle, Package } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [globalDonations, setGlobalDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGlobalData = async () => {
    try {
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setGlobalDonations(data || []);
    } catch (error) {
      console.error("Error fetching global donations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGlobalData();
  }, []);

  const handleOverrideDelete = async (itemId) => {
    // Requires physical typing to confirm destructive action
    const promptValue = window.prompt("Type 'DELETE' to confirm overriding and deleting this asset globally:");
    if (promptValue !== 'DELETE') return;
    
    try {
      const { error } = await supabase
        .from('donations')
        .delete()
        .eq('id', itemId);
        
      if (error) throw error;
      setGlobalDonations(prev => prev.filter(item => item.id !== itemId));
    } catch (error) {
      console.error("Error globally deleting donation:", error);
      alert("Failed to delete donation");
    }
  };

  // Metrics Logic
  const totalAssets = globalDonations.length;
  const activeAssets = globalDonations.filter(d => d.status === 'Available').length;
  const reservedAssets = globalDonations.filter(d => d.status === 'Reserved').length;

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="admin-title">
          <ShieldAlert size={36} color="var(--primary)" className="pulse-icon" />
          <div>
            <h2>System Command Center</h2>
            <p>Global Asset Oversight & Escalation Console</p>
          </div>
        </div>
      </div>

      {/* High-Level Metrics */}
      <div className="metrics-grid">
        <motion.div 
          className="metric-card glass-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Database size={24} color="var(--primary)" />
          <div className="metric-info">
            <h3>{totalAssets}</h3>
            <p>Total Processed Assets</p>
          </div>
        </motion.div>
        
        <motion.div 
          className="metric-card glass-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Activity size={24} color="var(--accent)" />
          <div className="metric-info">
            <h3>{activeAssets}</h3>
            <p>Active Unclaimed Assets</p>
          </div>
        </motion.div>

        <motion.div 
          className="metric-card glass-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <CheckCircle size={24} color="var(--secondary)" />
          <div className="metric-info">
            <h3>{reservedAssets}</h3>
            <p>Locked & In-Transit</p>
          </div>
        </motion.div>
      </div>

      {/* Global Data Table */}
      <motion.div 
        className="admin-ledger glass-panel"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="ledger-header">
          <h3>Global Asset Ledger</h3>
          <button className="btn btn-secondary" onClick={fetchGlobalData} style={{ padding: '0.5rem 1rem' }}>
            Sync Live Database
          </button>
        </div>

        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Asset Title</th>
                <th>Donor Trace ID</th>
                <th>Status</th>
                <th>Geo Location</th>
                <th>Timestamp</th>
                <th>Override</th>
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td colSpan="7" className="text-muted" style={{textAlign: "center", padding: '2rem'}}>Loading master database...</td></tr>}
              {!loading && globalDonations.length === 0 && (
                <tr><td colSpan="7" className="text-muted" style={{textAlign: "center", padding: '2rem'}}>System database empty.</td></tr>
              )}
              {globalDonations.map((item) => (
                <tr key={item.id}>
                  <td className="text-muted" style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                    {item.id.substring(0, 8)}...
                  </td>
                  <td className="font-medium">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Package size={14} color="var(--primary)" />
                      {item.title}
                    </div>
                  </td>
                  <td className="text-muted" style={{ fontSize: '0.85rem' }}>{item.donor_id.substring(0, 15)}...</td>
                  <td>
                    <span className={`status-badge status-${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <div className="admin-geo">
                      <MapPin size={12} />
                      {item.address ? item.address.substring(0, 15) + '...' : 'Unknown'}
                    </div>
                  </td>
                  <td className="text-muted" style={{ fontSize: '0.85rem' }}>
                    {new Date(item.created_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                  </td>
                  <td>
                    <button 
                      onClick={() => handleOverrideDelete(item.id)}
                      className="override-btn"
                      title="Force Delete Asset"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
