import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Users, ShieldCheck } from 'lucide-react';
import './Home.css';
import heroBg from '../assets/hero-bg.png';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Connecting Surplus Food to <span className="highlight-text">Those in Need.</span>
          </motion.h1>
          
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Empowering communities to reduce waste and fight hunger through an intelligent, transparent donation platform.
          </motion.p>
          
          <motion.div 
            className="hero-cta-group"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to="/login?role=donor" className="btn btn-primary btn-lg glow-effect">
              Donate Food <ArrowRight size={18} style={{ marginLeft: '8px' }}/>
            </Link>
            <Link to="/login?role=receiver" className="btn btn-secondary btn-lg glass-effect">
              Receive Food
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Storytelling & Impact Section */}
      <section className="impact-section">
        <motion.div 
          className="impact-header"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Our Impact</h2>
          <p>Together we are making a measurable difference.</p>
        </motion.div>

        <div className="stats-grid">
          {[
            { icon: <Leaf size={32}/>, value: "12,400+", label: "Meals Saved", color: "var(--secondary)" },
            { icon: <Users size={32}/>, value: "450", label: "Active NGOs", color: "var(--primary)" },
            { icon: <ShieldCheck size={32}/>, value: "8,200kg", label: "CO₂ Reduced", color: "var(--accent)" }
          ].map((stat, idx) => (
            <motion.div 
              key={idx} 
              className="stat-card glass-panel"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                {stat.icon}
              </div>
              <h3 className="stat-value" style={{ color: stat.color }}>{stat.value}</h3>
              <p className="stat-label">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
