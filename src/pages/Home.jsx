import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Shield, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './Home.css';

const Home = () => {
  const { t } = useTranslation();

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
        
        {/* Abstract Rotating Background Mesh */}
        <motion.div 
          className="hero-abstract-mesh"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ position: 'absolute', top: '50%', left: '50%', x: '-50%', y: '-50%', zIndex: 1, opacity: 0.05, pointerEvents: 'none' }}
        >
          <Globe size={800} strokeWidth={0.5} />
        </motion.div>
        
        <motion.div 
          className="hero-abstract-mesh-inner"
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ position: 'absolute', top: '50%', left: '50%', x: '-50%', y: '-50%', zIndex: 1, opacity: 0.03, pointerEvents: 'none' }}
        >
          <Globe size={600} strokeWidth={0.5} />
        </motion.div>
        
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants} className="hero-badge">
            <span className="badge-pulse"></span>
            {t('home.badge')}
          </motion.div>

          <motion.h1 variants={itemVariants} className="grand-title">
            {t('home.title1')}<br/>
            <span className="text-gradient">{t('home.title2')}</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="grand-subtitle">
            {t('home.subtitle')}
          </motion.p>
          
          <motion.div variants={itemVariants} className="hero-actions">
            <Link to="/login?role=donor" className="btn btn-primary btn-lg">
              {t('home.donateBtn')} <ArrowRight size={18} style={{ marginLeft: '8px' }}/>
            </Link>
            <Link to="/login?role=receiver" className="btn btn-secondary btn-lg">
              {t('home.apiBtn')}
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
          <h2 className="section-title">{t('home.featuresTitle')}</h2>
          <p>{t('home.featuresSub')}</p>
        </motion.div>

        <div className="feature-grid">
          {[
            { icon: <Zap size={28}/>, title: t('home.f1Title'), desc: t('home.f1Desc') },
            { icon: <Shield size={28}/>, title: t('home.f2Title'), desc: t('home.f2Desc') },
            { icon: <Globe size={28}/>, title: t('home.f3Title'), desc: t('home.f3Desc') }
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
