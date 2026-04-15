import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar glass-panel">
      <div className="nav-brand">
        <Heart size={24} color="var(--primary)" />
        <Link to="/" className="brand-title">FoodConnect</Link>
      </div>
      <div className="nav-links">
        <SignedOut>
          <Link to="/login" className="btn btn-secondary">Login</Link>
        </SignedOut>
        <SignedIn>
          <Link to="/donor" className="btn btn-secondary" style={{ marginRight: '0.5rem', border: 'none', fontSize: '0.9rem' }}>Donor Portal</Link>
          <Link to="/receiver" className="btn btn-primary" style={{ marginRight: '1rem', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Receiver Portal</Link>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
