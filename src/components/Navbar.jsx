import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar glass-panel">
      <div className="nav-brand">
        <Heart size={24} color="var(--primary)" />
        <Link to="/" className="brand-title">FoodConnect</Link>
      </div>
      <div className="nav-links">
        <Link to="/login" className="btn btn-secondary">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
