import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Bot, 
  Sparkles, 
  ArrowRight, 
  Phone, 
  KeyRound, 
  AlertCircle, 
  CheckCircle2, 
  UserCheck, 
  GraduationCap, 
  BookOpen,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';

export const Login = () => {
  const navigate = useNavigate();
  const { loginUser, showToast } = useApp();

  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isMobileValid = /^[6-9]\d{9}$/.test(mobile.trim());

  const handleSendLoginOtp = async () => {
    setErrorMessage('');
    if (!isMobileValid) {
      setErrorMessage('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    setLoading(true);
    const res = await api.sendOtp(mobile);
    setLoading(false);

    if (res.success) {
      setOtpSent(true);
      setOtp(res.demoOtp || '482910'); // Auto-fill demo OTP for convenience
      showToast('Login OTP generated! Demo code: 482910');
    } else {
      setErrorMessage(res.error || 'Failed to send OTP.');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!isMobileValid) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    const res = await api.login(mobile);
    setLoading(false);

    if (res.success && res.user) {
      loginUser(res.user);
      navigate('/dashboard');
    } else {
      setErrorMessage(res.error || 'Account not found. Please register first.');
    }
  };

  // Quick Demo Profiles for instant testing
  const handleQuickDemoLogin = (type) => {
    if (type === 'btech') {
      loginUser({
        id: "user-1",
        name: "Rahul Reddy",
        mobile: "9876543210",
        course: "B.Tech",
        academicLevel: "3rd Year",
        branch: "Computer Science & Engineering",
        category: "B.Tech • 3rd Year (CSE)",
        targetExam: "GATE 2027 & TCS NQT",
        preferredLanguage: "both",
        streakDays: 14,
        doubtsResolved: 48,
        studyHours: 15.5
      });
    } else {
      loginUser({
        id: "user-2",
        name: "Ananya Sharma",
        mobile: "9123456780",
        course: "Competitive Exams",
        academicLevel: "Degree",
        branch: "General Studies & Aptitude",
        category: "Competitive Exams • Degree",
        targetExam: "UPSC CSE & APPSC Group-1",
        preferredLanguage: "both",
        streakDays: 21,
        doubtsResolved: 62,
        studyHours: 24.0
      });
    }
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-[#0A1128] via-[#0F172A] to-[#0A1128] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
      
      {/* Decorative Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-gradient-to-tr from-blue-600/15 via-brandPurple-600/15 to-cyan-500/10 blur-[100px] pointer-events-none rounded-full"></div>

      <div className="max-w-md w-full relative z-10 space-y-8 bg-[#0F172A]/90 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-slate-700/60 shadow-2xl shadow-navy-950/80">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-brandPurple-600 p-0.5">
              <div className="h-full w-full bg-navy-950 rounded-[14px] flex items-center justify-center">
                <span className="font-display font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  P
                </span>
              </div>
            </div>
            <span className="font-display font-extrabold text-2xl text-white">
              PROBLEX <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-brandPurple-400">AI</span>
            </span>
          </Link>
          <h1 className="text-2xl font-display font-bold text-white pt-2">
            Welcome Back!
          </h1>
          <p className="text-xs text-slate-400">
            Sign in with your registered mobile number to resume your AI tutoring & saved notes.
          </p>
        </div>

        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Registered Mobile Number
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-3.5 flex items-center gap-1 text-slate-400 text-xs font-bold">
                <Phone className="w-3.5 h-3.5" />
                <span>+91</span>
              </div>
              <input
                type="tel"
                maxLength={10}
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                placeholder="9876543210"
                className="w-full text-sm pl-16 pr-4 py-3 rounded-xl border border-slate-700 bg-slate-900/80 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          {!otpSent ? (
            <button
              type="button"
              onClick={handleSendLoginOtp}
              disabled={!isMobileValid || loading}
              className={`w-full py-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                !isMobileValid || loading
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20'
              }`}
            >
              {loading ? 'Sending OTP...' : 'Send Login OTP'}
            </button>
          ) : (
            <div className="space-y-3 animate-in fade-in">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Enter OTP (Demo Code: 482910)
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="482910"
                    className="w-full font-mono text-sm tracking-widest pl-10 pr-4 py-3 rounded-xl border border-slate-700 bg-slate-900/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-brandPurple-600 hover:opacity-95 shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
              >
                {loading ? 'Verifying...' : 'Sign In to Dashboard'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </form>

        {/* Demo Fast Login Shortcuts */}
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> One-Click Demo Profiles:
          </div>
          <div className="grid grid-cols-1 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('btech')}
              className="p-2.5 rounded-xl bg-blue-950/40 hover:bg-blue-900/40 border border-blue-500/30 text-left flex items-center justify-between text-xs transition-colors"
            >
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-blue-400" />
                <span className="text-white font-semibold">Rahul Reddy (B.Tech 3rd Year CSE)</span>
              </div>
              <span className="text-[10px] text-cyan-400 font-bold">Launch →</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('govt')}
              className="p-2.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/40 border border-brandPurple-500/30 text-left flex items-center justify-between text-xs transition-colors"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-brandPurple-400" />
                <span className="text-white font-semibold">Ananya Sharma (Competitive Exams Degree)</span>
              </div>
              <span className="text-[10px] text-brandPurple-400 font-bold">Launch →</span>
            </button>
          </div>
        </div>

        {/* Sign up Redirect */}
        <div className="text-center text-xs text-slate-400 pt-2 border-t border-slate-800">
          New to Problex AI?{' '}
          <Link to="/signup" className="text-cyan-400 font-bold hover:underline">
            Create Free Account
          </Link>
        </div>

      </div>
    </div>
  );
};
