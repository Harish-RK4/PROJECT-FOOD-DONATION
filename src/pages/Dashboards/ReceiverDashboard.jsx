import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search, Sparkles, Filter, Navigation, Phone } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './ReceiverDashboard.css';

// Fix for default Leaflet marker icons in React/Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const ReceiverDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [nearbyDonations, setNearbyDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Default Map center: Bengaluru, Karnataka
  const defaultPosition = [12.9716, 77.5946];

  const fetchAvailableDonations = async () => {
    try {
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .eq('status', 'Available')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setNearbyDonations(data || []);
    } catch (error) {
      console.error("Error fetching available donations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClaim = async (itemId) => {
    if (!window.confirm("Are you sure you want to claim this donation? By claiming, you agree to coordinate pickup immediately.")) return;
    
    try {
      const { error } = await supabase
        .from('donations')
        .update({ status: 'Reserved' })
        .eq('id', itemId);
        
      if (error) throw error;
      
      // Instantly remove from local available list
      setNearbyDonations(prev => prev.filter(item => item.id !== itemId));
      alert("Successfully claimed! Please contact the donor using the provided details to coordinate collection.");
    } catch (err) {
      console.error("Error claiming donation:", err);
      alert("Failed to claim donation.");
    }
  };

  useEffect(() => {
    fetchAvailableDonations();
  }, []);

  return (
    <div className="receiver-container">
      {/* Left Pane - List & Search */}
      <motion.div 
        className="list-pane"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <div className="pane-header">
          <h2>Active Donations</h2>
          <p>Find available surplus near you</p>
          
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Semantic AI Search (e.g., 'Fresh baked bread nearby')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Sparkles size={18} className="ai-icon" />
          </div>

          <div className="filter-chips">
            <button className="chip active">All Available</button>
            <button className="chip">Produce</button>
            <button className="chip">Prepared Meals</button>
            <button className="chip filter-btn"><Filter size={14} /> Filters</button>
          </div>
        </div>

        <div className="donations-list">
          {loading && <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '2rem' }}>Loading map data...</p>}
          {!loading && nearbyDonations.length === 0 && (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '2rem' }}>No active donations nearby.</p>
          )}
          {nearbyDonations.map((item, index) => (
            <motion.div 
              key={item.id} 
              className="donation-card glass-panel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="card-top">
                <h4>{item.title}</h4>
                <span className="time-badge">
                  {item.expiry_date ? `Exp: ${new Date(item.expiry_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}` : 'No expiry'}
                </span>
              </div>
              <p className="donation-type">{item.quantity} • {item.type}</p>
              
              <div className="card-bottom" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
                <div className="location-info">
                  <MapPin size={14} color="var(--primary)" />
                  <span>{item.address || 'Address hidden pending claim'}</span>
                </div>
                {item.contact_info && (
                  <div className="location-info" style={{ color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Phone size={14} color="var(--secondary)" />
                    <span style={{ fontSize: '0.85rem' }}>{item.contact_info}</span>
                  </div>
                )}
                <button 
                  onClick={() => handleClaim(item.id)}
                  className="btn btn-primary claim-btn glow-effect" 
                  style={{ width: '100%', marginTop: '0.5rem' }}
                >
                  Confirm Claim
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Right Pane - Interactive Leaflet Map */}
      <motion.div 
        className="map-pane"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <div className="map-integration" style={{ padding: 0, overflow: 'hidden' }}>
          <MapContainer center={defaultPosition} zoom={11} style={{ height: '100%', width: '100%', borderRadius: 'var(--radius-lg)' }}>
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {nearbyDonations.filter(d => d.latitude && d.longitude).map((item) => (
              <Marker key={item.id} position={[item.latitude, item.longitude]}>
                <Popup>
                  <strong>{item.title}</strong><br/>
                  {item.quantity}<br/>
                  {item.contact_info && <span style={{display: 'flex', alignItems: 'center', gap: '4px', margin: '4px 0'}}><Phone size={12}/> {item.contact_info}</span>}
                  <span style={{color: '#10b981'}}>Claim Available</span>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default ReceiverDashboard;
