import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Shield, Zap } from 'lucide-react';
import './Home.css';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="home-container">
      {/* Grand Professional Hero */}
      <section className="grand-hero">
        <div className="hero-glow-bg"></div>
        
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants} className="hero-badge">
            <span className="badge-pulse"></span>
            FoodConnect Enterprise Edition 1.0
          </motion.div>

          <motion.h1 variants={itemVariants} className="grand-title">
            Zero Hunger.<br/>
            Infinite <span className="text-gradient">Impact.</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="grand-subtitle">
            The professional logistics network for surplus food allocation. Seamlessly route verified donations to NGOs with military-grade precision and real-time tracing.
          </motion.p>
          
          <motion.div variants={itemVariants} className="hero-actions">
            <Link to="/login?role=donor" className="btn btn-primary btn-lg">
              Start Donating <ArrowRight size={18} style={{ marginLeft: '8px' }}/>
            </Link>
            <Link to="/login?role=receiver" className="btn btn-secondary btn-lg">
              Partner API Access
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Sleek Features Section */}
      <section className="grand-features">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Built for Global Scale</h2>
          <p>Advanced metrics and unbreakable security infrastructure.</p>
        </motion.div>

        <div className="feature-grid">
          {[
            { icon: <Zap size={28}/>, title: "Real-Time Routing", desc: "Our AI engine matches food volatility with live NGO proximity data instantly." },
            { icon: <Shield size={28}/>, title: "Verified Network", desc: "Rigorous KYC checks ensure your donations reach legally authorized endpoints." },
            { icon: <Globe size={28}/>, title: "Carbon Analytics", desc: "Automated ESG compliance reporting detailing exact greenhouse gas diversion." }
          ].map((feat, idx) => (
            <motion.div 
              key={idx} 
              className="feature-card glass-panel"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              <div className="card-spotlight"></div>
              <div className="feature-icon">{feat.icon}</div>
              <h3>{feat.title}</h3>
              <p>{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
