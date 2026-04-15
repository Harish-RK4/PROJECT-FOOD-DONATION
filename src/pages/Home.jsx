import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Users, ShieldCheck, HeartPulse } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hyper-Modern Hero Section */}
      <section className="hero-section">
        {/* Animated Mesh Gradient Background */}
        <div className="hero-bg-blobs">
          <div className="blob-1"></div>
          <div className="blob-2"></div>
          <div className="blob-3"></div>
        </div>
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <motion.div 
            className="hero-pill"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <HeartPulse size={16} color="#34d399" />
            <span>Over 10,000 meals distributed this month</span>
          </motion.div>

          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            Ending Hunger.<br />
            <span className="highlight-text">Together.</span>
          </motion.h1>
          
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            A smart, elegant platform seamlessly bridging the gap between surplus food and communities in critical need. Be the change today.
          </motion.p>
          
          <motion.div 
            className="hero-cta-group"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to="/login?role=donor" className="btn glow-btn btn-lg">
              Donate Food <ArrowRight size={20} style={{ marginLeft: '8px' }}/>
            </Link>
            <Link to="/login?role=receiver" className="btn glass-btn btn-lg">
              Claim Donations
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Modern Bento Box Impact Section */}
      <section className="impact-section">
        <motion.div 
          className="impact-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2>Measurable Impact.</h2>
          <p>Real-time telemetry on how FoodConnect is changing the world.</p>
        </motion.div>

        <div className="bento-grid">
          <motion.div 
            className="bento-card large"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="pattern-dots"></div>
            <Leaf size={48} style={{ marginBottom: '2rem', opacity: 0.8 }} />
            <h3>12.4k</h3>
            <p>Pounds of CO₂ Emissions Prevented</p>
          </motion.div>

          <motion.div 
            className="bento-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bento-icon" style={{ background: 'rgba(79, 70, 229, 0.1)', color: '#4f46e5' }}>
              <Users size={32} />
            </div>
            <h3>450+</h3>
            <p>Verified Partner NGOs</p>
          </motion.div>

          <motion.div 
            className="bento-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bento-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
              <ShieldCheck size={32} />
            </div>
            <h3>100%</h3>
            <p>Secure & Transparent Routing</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
