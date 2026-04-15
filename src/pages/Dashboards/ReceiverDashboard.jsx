import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search, Sparkles, Filter, Navigation } from 'lucide-react';
import './ReceiverDashboard.css';

const ReceiverDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const nearbyDonations = [
    { id: 1, title: 'Fresh Produce Box', dist: '1.2 km', type: 'Vegetables', time: 'Expires in 4 hrs' },
    { id: 2, title: 'Catered Lunch Leftovers', dist: '3.5 km', type: 'Meals', time: 'Expires in 2 hrs' },
    { id: 3, title: 'Bakery Surplus', dist: '4.1 km', type: 'Baked Goods', time: 'Expires tomorrow' },
  ];

  return (
    <div className="receiver-container">
      <div className="receiver-header">
        <div>
          <h2>Receiver Dashboard</h2>
          <p>Find and reserve surplus food matches nearby using semantic search.</p>
        </div>
        <div className="capacity-badge glass-panel">
          <span className="text-muted">Daily Capacity: </span>
          <strong>150 / 200 Meals</strong>
        </div>
      </div>

      <div className="search-section glass-panel">
        <div className="semantic-search-box">
          <Sparkles className="search-icon spark" size={20} />
          <input 
            type="text" 
            placeholder="E.g. We need fresh vegetables or 50 cooked meals nearby..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-primary semantic-btn glow-effect">AI Search</button>
        </div>
        <div className="filter-tags">
          <span className="filter-tag active">Nearest First</span>
          <span className="filter-tag">Expiring Soon</span>
          <span className="filter-tag">Bulk Only {'>'} 20kg</span>
        </div>
      </div>

      <div className="content-split">
        {/* List View */}
        <div className="donations-scroll-list">
          <h3>Available Matches</h3>
          {nearbyDonations.map((item, idx) => (
            <motion.div 
              key={item.id}
              className="donation-match-card glass-panel"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="match-header">
                <h4>{item.title}</h4>
                <span className="dist-badge"><MapPin size={12} /> {item.dist}</span>
              </div>
              <div className="match-body">
                <span className="type-pill">{item.type}</span>
                <span className="time-warning">{item.time}</span>
              </div>
              <div className="match-footer">
                <button className="btn btn-secondary btn-sm">View Details</button>
                <button className="btn btn-primary btn-sm">Reserve</button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Map View Placeholder */}
        <div className="map-view-container glass-panel">
          <div className="map-overlay">
            <Navigation size={48} color="var(--primary)" className="nav-icon" />
            <h3>Live Map View</h3>
            <p>GPS tracking and real-time markers will appear here in production.</p>
            <button className="btn btn-secondary">Simulate Location</button>
          </div>
          {/* Abstract CSS Map background */}
          <div className="abstract-map-bg"></div>
        </div>
      </div>
    </div>
  );
};

export default ReceiverDashboard;
