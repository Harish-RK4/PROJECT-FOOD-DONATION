import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSignIn, useSignUp, useAuth } from '@clerk/clerk-react';
import { ShieldCheck, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import './Login.css';

const Login = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const { isLoaded: isSignUpLoaded, signUp, setActive: setSignUpActive } = useSignUp();
  const { userId } = useAuth();
  
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultRole = searchParams.get('role') || 'donor';

  // If already logged in, redirect away from login screen
  useEffect(() => {
    if (userId) {
      navigate(`/${defaultRole}`);
    }
  }, [userId, navigate, defaultRole]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) return;
    setErrorMsg('');
    setLoading(true);
    
    if (!isLoaded || !isSignUpLoaded) return;
    
    try {
      try {
        const { supportedFirstFactors } = await signIn.create({
          identifier: email,
        });
        
        const isEmailCodeFactor = supportedFirstFactors.find(
          (factor) => factor.strategy === "email_code"
        );
        
        if (isEmailCodeFactor) {
          await signIn.prepareFirstFactor({
            strategy: "email_code",
            emailAddressId: isEmailCodeFactor.emailAddressId,
          });
          setStep(2);
        }
      } catch (err) {
        if (err.errors && err.errors[0].code === 'form_identifier_not_found') {
          await signUp.create({ emailAddress: email });
          await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
          setStep(2);
        } else {
          throw err;
        }
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.errors ? err.errors[0].longMessage : err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    const code = otp.join('');
    
    try {
      if (signIn && signIn.status === "needs_first_factor") {
        const result = await signIn.attemptFirstFactor({ strategy: "email_code", code });
        if (result.status === "complete") {
          await setActive({ session: result.createdSessionId });
          setStep(3);
        }
      } else if (signUp && signUp.status === "missing_requirements") {
        const result = await signUp.attemptEmailAddressVerification({ code });
        if (result.status === "complete") {
          await setSignUpActive({ session: result.createdSessionId });
          setStep(3);
        }
      }
    } catch (err) {
      console.error(err);
      // Handle strict mode / race condition double-submit successful state
      const isAlreadyVerified = err.errors && err.errors[0]?.longMessage?.toLowerCase().includes('already been verified');
      
      if (isAlreadyVerified) {
        if (signIn && signIn.status === "complete" && signIn.createdSessionId) {
          await setActive({ session: signIn.createdSessionId });
          setStep(3);
          return;
        } else if (signUp && signUp.status === "complete" && signUp.createdSessionId) {
          await setSignUpActive({ session: signUp.createdSessionId });
          setStep(3);
          return;
        }
      }
      
      setErrorMsg(err.errors ? err.errors[0].longMessage : "Invalid verification code");
      setOtp(['', '', '', '', '', '']);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelection = (selectedRole) => {
    navigate(`/${selectedRole}`);
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  return (
    <div className="auth-container">
      <motion.div 
        className="auth-card glass-panel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="auth-header">
          <ShieldCheck size={48} className="shield-icon" />
          <h2>Welcome to FoodConnect</h2>
          <p>Secure Enterprise Login</p>
        </div>

        <div className="auth-progress">
          <div className={`progress-bar step-${step}`}></div>
        </div>

        {errorMsg && (
          <div className="auth-error">
            <AlertCircle size={16} /> {errorMsg}
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.form 
              key="step1" className="auth-form"
              initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}
              onSubmit={handleSendOtp}
            >
              <div className="input-group">
                <label>Email Address</label>
                <div className="input-with-icon">
                  <Mail size={18} />
                  <input type="email" placeholder="enter your email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-full glow-effect" disabled={loading}>
                {loading ? 'Sending...' : 'Send Secure OTP'}
              </button>
            </motion.form>
          )}

          {step === 2 && (
            <motion.form 
              key="step2" className="auth-form"
              initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}
              onSubmit={handleVerifyOtp}
            >
              <div className="input-group">
                <label>Enter 6-digit verification code sent to {email}</label>
                <div className="otp-container">
                  {otp.map((digit, i) => (
                    <input key={i} type="text" maxLength="1" className="otp-input" value={digit} onChange={e => handleOtpChange(i, e.target.value)} />
                  ))}
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-full glow-effect" disabled={loading}>
                {loading ? 'Verifying...' : 'Authenticate'} <ArrowRight size={18} style={{ marginLeft: '8px' }}/>
              </button>
            </motion.form>
          )}

          {step === 3 && (
            <motion.div 
              key="step3" className="role-selection"
              initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
            >
              <h3>Select Operating Role</h3>
              <div className="role-options">
                <button className={`role-btn ${defaultRole === 'donor' ? 'active' : ''}`} onClick={() => handleRoleSelection('donor')}>
                  <div className="role-title">Supplier / Donor</div>
                  <div className="role-desc">Manage surplus asset allocation</div>
                </button>
                <button className={`role-btn ${defaultRole === 'receiver' ? 'active' : ''}`} onClick={() => handleRoleSelection('receiver')}>
                  <div className="role-title">Partner NGO</div>
                  <div className="role-desc">Claim available reserves</div>
                </button>
                <button className="role-btn admin-role" onClick={() => handleRoleSelection('admin')}>
                  <div className="role-title">System Administrator</div>
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
