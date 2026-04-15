import React from 'react';
import { motion } from 'framer-motion';
import { Package, Clock, CheckCircle } from 'lucide-react';
import './DonorDashboard.css';

const DonorDashboard = () => {
  // Mock Data
  const donationStats = [
    { title: "Available", value: 3, icon: <Package size={24} />, color: "var(--primary)" },
    { title: "Reserved", value: 1, icon: <Clock size={24} />, color: "var(--accent)" },
    { title: "Delivered", value: 12, icon: <CheckCircle size={24} />, color: "var(--secondary)" }
  ];

  const recentDonations = [
    { id: 1, type: "Baked Goods", qty: "20 portions", status: "Available", time: "2 hours ago" },
    { id: 2, type: "Fresh Produce", qty: "15 kg", status: "Reserved", time: "5 hours ago" },
    { id: 3, type: "Catered Meals", qty: "50 plates", status: "Delivered", time: "Yesterday" }
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

      <div className="dashboard-content">
        <div className="donations-list glass-panel">
          <div className="list-header">
            <h3>Recent Donations</h3>
            <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>+ New Donation</button>
          </div>
          
          <div className="table-responsive">
            <table className="donations-table">
              <thead>
                <tr>
                  <th>Food Type</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Posted</th>
                </tr>
              </thead>
              <tbody>
                {recentDonations.map((item) => (
                  <tr key={item.id}>
                    <td className="font-medium">{item.type}</td>
                    <td>{item.qty}</td>
                    <td>
                      <span className={`status-badge status-${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="text-muted">{item.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
