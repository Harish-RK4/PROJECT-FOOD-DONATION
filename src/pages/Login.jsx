import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LogIn, ArrowRight, ShieldCheck, Mail } from 'lucide-react';
import './Login.css';

const Login = () => {
  const [step, setStep] = useState(1); // 1: Email 2: OTP 3: Role Selection
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultRole = searchParams.get('role') || 'donor';

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (email) setStep(2);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const handleRoleSelection = (selectedRole) => {
    // Navigate to the respective dashboard
    navigate(`/${selectedRole}`);
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Auto-focus logic omitted for boilerplate brevity, imagine it focuses next
  };

  return (
    <div className="auth-container">
      <motion.div 
        className="auth-card glass-panel"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="auth-header">
          <ShieldCheck size={40} color="var(--primary)" />
          <h2>Welcome Back</h2>
          <p>Secure login to <b>FoodConnect</b></p>
        </div>

        <div className="auth-progress">
          <div className={`progress-bar step-${step}`}></div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.form 
              key="step1"
              className="auth-form"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              onSubmit={handleSendOtp}
            >
              <div className="input-group">
                <label>Email Address / Phone Number</label>
                <div className="input-with-icon">
                  <Mail size={18} />
                  <input 
                    type="text" 
                    placeholder="Enter email or phone" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-full glow-effect">
                Send OTP
              </button>
            </motion.form>
          )}

          {step === 2 && (
            <motion.form 
              key="step2"
              className="auth-form"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              onSubmit={handleVerifyOtp}
            >
              <div className="input-group">
                <label>Enter 6-digit OTP sent to {email}</label>
                <div className="otp-container">
                  {otp.map((digit, i) => (
                    <input 
                      key={i}
                      type="text"
                      maxLength="1"
                      className="otp-input"
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                    />
                  ))}
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-full glow-effect">
                Verify OTP <ArrowRight size={18} style={{ marginLeft: '8px' }}/>
              </button>
            </motion.form>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              className="role-selection"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <h3>How are you using FoodConnect?</h3>
              <div className="role-options">
                <button 
                  className={`role-btn ${defaultRole === 'donor' ? 'active' : ''}`}
                  onClick={() => handleRoleSelection('donor')}
                >
                  <div className="role-title">I am a Donor</div>
                  <div className="role-desc">Give surplus food away</div>
                </button>
                <button 
                  className={`role-btn ${defaultRole === 'receiver' ? 'active' : ''}`}
                  onClick={() => handleRoleSelection('receiver')}
                >
                  <div className="role-title">NGO / Receiver</div>
                  <div className="role-desc">Claim available food donations</div>
                </button>
                <button 
                  className="role-btn admin-role"
                  onClick={() => handleRoleSelection('admin')}
                >
                  <div className="role-title">System Admin</div>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Login;
