import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Bot, 
  Sparkles, 
  ArrowRight, 
  User, 
  Phone, 
  KeyRound, 
  CheckCircle2, 
  AlertCircle, 
  GraduationCap, 
  BookOpen, 
  Clock, 
  ShieldCheck,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';

export const Signup = () => {
  const navigate = useNavigate();
  const { loginUser, showToast } = useApp();

  // Form states
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('B.Tech'); // 'B.Tech' | 'Competitive Exams'
  const [otpInput, setOtpInput] = useState('');

  // OTP flow states
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [demoOtpCode, setDemoOtpCode] = useState('482910');
  const [countdown, setCountdown] = useState(0);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Mobile validation: 10-digit Indian number starting with 6, 7, 8, or 9
  const isMobileValid = /^[6-9]\d{9}$/.test(mobileNumber.trim());

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // Handle Send OTP
  const handleSendOtp = async () => {
    setErrorMessage('');
    if (!isMobileValid) {
      setErrorMessage('Please enter a valid 10-digit Indian mobile number (e.g. 9876543210).');
      return;
    }

    setSendingOtp(true);
    const res = await api.sendOtp(mobileNumber);
    setSendingOtp(false);

    if (res.success) {
      setOtpSent(true);
      setCountdown(30);
      setIsDemoMode(!!res.demoMode);
      if (res.demoOtp) {
        setDemoOtpCode(res.demoOtp);
      }
      showToast(res.message || 'OTP generated successfully.');
    } else {
      setErrorMessage(res.error || 'Failed to send OTP.');
    }
  };

  // Handle Auto-fill Demo OTP
  const handleAutoFillDemoOtp = () => {
    setOtpInput(demoOtpCode);
    setErrorMessage('');
  };

  // Handle Verify OTP
  const handleVerifyOtp = async () => {
    setErrorMessage('');
    if (!otpInput.trim()) {
      setErrorMessage('Please enter the verification OTP.');
      return;
    }

    setVerifyingOtp(true);
    const res = await api.verifyOtp(mobileNumber, otpInput);
    setVerifyingOtp(false);

    if (res.success && res.verified) {
      setOtpVerified(true);
      showToast('Mobile number verified successfully! ✅');
    } else {
      setErrorMessage(res.error || 'Invalid OTP. Please check the code.');
    }
  };

  // Handle Final Sign Up
  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!otpVerified) {
      setErrorMessage('Please verify your mobile number with OTP before signing up.');
      return;
    }

    setSubmitting(true);
    const res = await api.register({
      name: fullName.trim(),
      mobile: mobileNumber.trim(),
      course: selectedCourse
    });
    setSubmitting(false);

    if (res.success && res.user) {
      loginUser(res.user);
      // Redirect to Course and Standard Selection page
      navigate('/select-standard');
    } else {
      setErrorMessage(res.error || 'Sign up failed. Please try again.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-[#0A1128] via-[#0F172A] to-[#0A1128] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
      
      {/* Decorative Glow Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/20 via-brandPurple-600/15 to-cyan-500/10 blur-[120px] pointer-events-none rounded-full"></div>

      <div className="max-w-lg w-full relative z-10 space-y-8 bg-[#0F172A]/90 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-slate-700/60 shadow-2xl shadow-navy-950/80">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-brandPurple-600 p-0.5 shadow-lg shadow-blue-500/20">
              <div className="h-full w-full bg-navy-950 rounded-[14px] flex items-center justify-center">
                <span className="font-display font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300">
                  P
                </span>
              </div>
            </div>
            <div className="text-left">
              <span className="font-display font-extrabold text-2xl text-white tracking-tight">
                PROBLEX <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-brandPurple-400">AI</span>
              </span>
              <p className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase -mt-1">
                Learn Smarter. Solve Better. Build Your Future.
              </p>
            </div>
          </Link>
          
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white pt-2">
            Create Student Account
          </h1>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Targeted AI-powered study assistance for B.Tech engineers & Indian competitive exam aspirants.
          </p>
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5 animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSignUp} className="space-y-5">
          
          {/* 1. Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Full Name <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Sravan Kumar Reddy"
                className="w-full text-sm pl-10 pr-4 py-3 rounded-xl border border-slate-700 bg-slate-900/80 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          {/* 2. Mobile Number & Send OTP */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Mobile Number (India +91) <span className="text-rose-400">*</span>
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <div className="absolute left-3.5 top-3.5 flex items-center gap-1 text-slate-400 text-xs font-bold">
                  <Phone className="w-3.5 h-3.5" />
                  <span>+91</span>
                </div>
                <input
                  type="tel"
                  maxLength={10}
                  required
                  disabled={otpVerified}
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="9876543210"
                  className={`w-full text-sm pl-16 pr-4 py-3 rounded-xl border ${
                    otpVerified ? 'border-emerald-500/50 bg-emerald-950/20 text-emerald-300' : 'border-slate-700 bg-slate-900/80 text-white'
                  } placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all`}
                />
              </div>

              {!otpVerified && (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={!isMobileValid || sendingOtp || countdown > 0}
                  className={`px-4 py-3 rounded-xl text-xs font-bold shrink-0 transition-all ${
                    !isMobileValid || countdown > 0
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                      : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/20'
                  }`}
                >
                  {sendingOtp ? 'Sending...' : countdown > 0 ? `Resend (${countdown}s)` : otpSent ? 'Resend OTP' : 'Send OTP'}
                </button>
              )}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Must be a valid 10-digit Indian mobile number.
            </p>
          </div>

          {/* 3. Clearly Labelled Demo OTP Mode Notice */}
          {otpSent && isDemoMode && !otpVerified && (
            <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/30 text-xs text-blue-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold flex items-center gap-1.5 text-blue-300">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  Demo OTP Verification Mode
                </span>
                <span className="text-[10px] bg-cyan-400/20 text-cyan-300 px-2 py-0.5 rounded-full font-mono font-bold">
                  ACTIVE
                </span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                No external SMS gateway (Twilio/Fast2SMS) is configured. For development testing, your demo OTP is:
                <span className="font-mono font-black text-cyan-300 text-sm ml-1.5 px-2 py-0.5 bg-slate-900 rounded border border-cyan-400/30">
                  {demoOtpCode}
                </span>
              </p>
              <button
                type="button"
                onClick={handleAutoFillDemoOtp}
                className="text-[11px] text-cyan-400 hover:text-cyan-300 font-bold underline flex items-center gap-1"
              >
                ⚡ Click to Auto-fill Demo OTP ({demoOtpCode})
              </button>
            </div>
          )}

          {/* 4. Enter OTP & Verify OTP */}
          {otpSent && !otpVerified && (
            <div className="space-y-1.5 animate-in fade-in duration-300">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Enter OTP Code <span className="text-rose-400">*</span>
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <KeyRound className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    maxLength={6}
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 6-digit code"
                    className="w-full font-mono text-sm tracking-widest pl-10 pr-4 py-3 rounded-xl border border-slate-700 bg-slate-900/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={!otpInput.trim() || verifyingOtp}
                  className="px-5 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shrink-0 shadow-md shadow-emerald-500/20 transition-all disabled:opacity-50"
                >
                  {verifyingOtp ? 'Verifying...' : 'Verify OTP'}
                </button>
              </div>
            </div>
          )}

          {/* Mobile Verified Status Banner */}
          {otpVerified && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Mobile number (+91 {mobileNumber}) verified successfully!</span>
            </div>
          )}

          {/* 5. Select Course */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Select Your Course <span className="text-rose-400">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedCourse('B.Tech')}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  selectedCourse === 'B.Tech'
                    ? 'border-blue-500 bg-blue-600/15 shadow-lg shadow-blue-500/10'
                    : 'border-slate-700 bg-slate-900/50 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <GraduationCap className={`w-5 h-5 ${selectedCourse === 'B.Tech' ? 'text-blue-400' : 'text-slate-400'}`} />
                  {selectedCourse === 'B.Tech' && (
                    <span className="h-2 w-2 rounded-full bg-blue-400"></span>
                  )}
                </div>
                <div className="font-bold text-sm text-white">1. B.Tech</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Engineering Degrees (All Branches)</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedCourse('Competitive Exams')}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  selectedCourse === 'Competitive Exams'
                    ? 'border-brandPurple-500 bg-brandPurple-600/15 shadow-lg shadow-purple-500/10'
                    : 'border-slate-700 bg-slate-900/50 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <BookOpen className={`w-5 h-5 ${selectedCourse === 'Competitive Exams' ? 'text-brandPurple-400' : 'text-slate-400'}`} />
                  {selectedCourse === 'Competitive Exams' && (
                    <span className="h-2 w-2 rounded-full bg-brandPurple-400"></span>
                  )}
                </div>
                <div className="font-bold text-sm text-white">2. Competitive Exams</div>
                <div className="text-[11px] text-slate-400 mt-0.5">UPSC, SSC, State PSC & Govt Jobs</div>
              </button>
            </div>
          </div>

          {/* 6. Sign Up Submit Button */}
          <button
            type="submit"
            disabled={!otpVerified || submitting}
            className={`w-full py-4 rounded-2xl text-sm font-bold text-white transition-all flex items-center justify-center gap-2 ${
              !otpVerified || submitting
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-brandPurple-600 hover:opacity-95 shadow-xl shadow-blue-500/25'
            }`}
          >
            {submitting ? (
              <span>Setting up your profile...</span>
            ) : !otpVerified ? (
              <span>Verify Mobile via OTP to Sign Up</span>
            ) : (
              <>
                <span>Complete Sign Up & Choose Academic Year</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Login Option for Returning Users */}
        <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
          Already registered on Problex AI?{' '}
          <Link to="/login" className="text-cyan-400 font-bold hover:underline">
            Returning Student Login
          </Link>
        </div>

      </div>
    </div>
  );
};
