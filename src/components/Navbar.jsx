import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Globe } from 'lucide-react';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { useTranslation } from 'react-i18next';
import './Navbar.css';

const Navbar = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <nav className="navbar glass-panel">
      <div className="nav-brand">
        <Heart size={24} color="var(--primary)" />
        <Link to="/" className="brand-title">FoodConnect</Link>
      </div>
      <div className="nav-links">
        {/* Language Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginRight: '1rem', background: 'rgba(255,255,255,0.05)', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>
          <Globe size={16} color="var(--text-muted)" />
          <select 
            onChange={changeLanguage} 
            value={i18n.language}
            style={{ background: 'transparent', color: 'var(--text-main)', border: 'none', outline: 'none', cursor: 'pointer', fontSize: '0.85rem' }}
          >
            <option value="en" style={{background: 'var(--surface)'}}>English</option>
            <option value="hi" style={{background: 'var(--surface)'}}>हिन्दी</option>
            <option value="kn" style={{background: 'var(--surface)'}}>ಕನ್ನಡ</option>
          </select>
        </div>

        <SignedOut>
          <Link to="/login" className="btn btn-secondary">{t('nav.login')}</Link>
        </SignedOut>
        <SignedIn>
          <Link to="/donor" className="btn btn-secondary" style={{ marginRight: '0.5rem', border: 'none', fontSize: '0.9rem' }}>{t('nav.donorPortal')}</Link>
          <Link to="/receiver" className="btn btn-primary" style={{ marginRight: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>{t('nav.receiverPortal')}</Link>
          <Link to="/admin" className="btn btn-secondary" style={{ marginRight: '1rem', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#ef4444', fontSize: '0.9rem' }}>{t('nav.adminPortal')}</Link>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
