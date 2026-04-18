import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@clerk/clerk-react';
import { supabase } from '../lib/supabaseClient';
import { X, UploadCloud, MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './NewDonationModal.css';

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

function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  return position === null ? null : (
    <Marker position={position}></Marker>
  );
}

const NewDonationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    quantity: '',
    expiryDate: '',
    address: '',
    contactInfo: '',
    description: '',
  });

  const { userId } = useAuth();
  const [loading, setLoading] = useState(false);
  const [imageData, setImageData] = useState(null);
  
  // Geographical Location state
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (isOpen) {
      // Attempt to geolocate the user automatically
      navigator.geolocation.getCurrentPosition(
        (pos) => setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => {
          console.warn("Geolocation blocked or failed:", err);
          // Default to Bengaluru, Karnataka if blocked
          setPosition({ lat: 12.9716, lng: 77.5946 }); 
        }
      );
    }
  }, [isOpen]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 600;
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Compress deeply to text to spoof cloud storage
        const base64String = canvas.toDataURL('image/jpeg', 0.6);
        setImageData(base64String);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.from('donations').insert([
        { 
          donor_id: userId || 'unknown_donor',
          title: formData.title,
          quantity: formData.quantity,
          address: formData.address,
          contact_info: formData.contactInfo,
          latitude: position?.lat || null,
          longitude: position?.lng || null,
          image_data: imageData,
          expiry_date: formData.expiryDate ? new Date(formData.expiryDate).toISOString() : null,
          status: 'Available',
          type: 'General',
        }
      ]);

      if (error) throw error;
      
      setFormData({ title: '', quantity: '', expiryDate: '', description: '', address: '' });
      setImageData(null);
      onClose();
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
            style={{ maxHeight: '90vh', overflowY: 'auto' }}
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
                <label>Pickup Address</label>
                <input required type="text" placeholder="e.g. 123 Main St, New York" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
              </div>

              <div className="form-group">
                <label>Contact Details</label>
                <input required type="text" placeholder="e.g. +1 234 567 8900" value={formData.contactInfo} onChange={e => setFormData({...formData, contactInfo: e.target.value})} />
              </div>

              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={16} color="var(--primary)" /> Pin Precise Location
                </label>
                <div style={{ height: '200px', width: '100%', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border)' }}>
                  {position ? (
                    <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
                      <TileLayer
                        attribution='&copy; OpenStreetMap contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <LocationMarker position={position} setPosition={setPosition} />
                    </MapContainer>
                  ) : (
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-alt)' }}>
                      <p style={{ color: 'var(--text-muted)' }}>Loading GPS Map...</p>
                    </div>
                  )}
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem', display: 'block' }}>Drag or click on the map to place the collection pin.</span>
              </div>

              <div className="form-group">
                <label>Food Photo</label>
                <label className="upload-placeholder" style={{ cursor: 'pointer', display: 'block' }}>
                  <input type="file" style={{ display: 'none' }} accept="image/*" onChange={handleImageUpload} />
                  {imageData ? (
                    <img src={imageData} alt="preview" style={{width: '100%', maxHeight: '150px', objectFit: 'cover', borderRadius: 'var(--radius-sm)'}} />
                  ) : (
                    <div>
                      <UploadCloud size={32} color="var(--primary)" style={{ margin: '0 auto' }} />
                      <p>Click to browse files</p>
                      <span>Takes live photos instantly</span>
                    </div>
                  )}
                </label>
              </div>

              <div className="form-actions" style={{ marginTop: '1rem' }}>
                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn btn-primary glow-effect" disabled={loading}>
                  {loading ? 'Submitting...' : 'Post Donation'}
                </button>
              </div>
            </form>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
};

export default NewDonationModal;
