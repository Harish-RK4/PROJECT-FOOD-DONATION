import React from 'react';
import { motion } from 'framer-motion';
import { SignIn } from '@clerk/clerk-react';
import './Login.css';

const Login = () => {
  return (
    <div className="auth-container">
      <motion.div 
        className="auth-clerk-wrapper glass-panel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}
      >
        <SignIn signUpFallbackRedirectUrl="/donor" fallbackRedirectUrl="/donor" />
      </motion.div>
    </div>
  );
};

export default Login;
