import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { SignIn, useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import './Login.css';

const Login = () => {
  const { userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      navigate('/donor');
    }
  }, [userId, navigate]);

  return (
    <div className="auth-container">
      <motion.div 
        className="auth-wrapper"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="auth-header" style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <ShieldCheck size={48} className="shield-icon" style={{ color: 'var(--primary)', marginBottom: '1rem', filter: 'drop-shadow(0 0 10px rgba(16, 185, 129, 0.3))' }} />
          <h2 style={{ fontSize: '1.8rem', margin: 0, color: 'var(--text-main)' }}>FoodConnect Enterprise</h2>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Secure Authentication Portal</p>
        </div>

        <SignIn 
          forceRedirectUrl="/donor"
          signUpForceRedirectUrl="/donor"
          appearance={{
            elements: {
              card: "clerk-custom-card",
              headerTitle: "clerk-custom-title",
              headerSubtitle: "clerk-custom-subtitle",
              formFieldInput: "clerk-custom-input",
              formButtonPrimary: "clerk-custom-btn",
              footerActionLink: "clerk-custom-link",
              identityPreviewText: "clerk-custom-text",
              formFieldLabel: "clerk-custom-label",
              dividerLine: "clerk-custom-divider",
              dividerText: "clerk-custom-divider-text",
              formResendCodeLink: "clerk-custom-link",
              headerBackIcon: "clerk-custom-text",
              headerBackLink: "clerk-custom-link",
              identityPreviewEditButton: "clerk-custom-link"
            },
            variables: {
              colorPrimary: "#10b981",
              colorBackground: "#09090b",
              colorText: "#fafafa",
              colorInputBackground: "#000000",
              colorInputText: "#fafafa",
              colorTextSecondary: "#a1a1aa",
              colorDanger: "#ef4444",
              borderRadius: "12px",
            }
          }}
        />
      </motion.div>
    </div>
  );
};

export default Login;
