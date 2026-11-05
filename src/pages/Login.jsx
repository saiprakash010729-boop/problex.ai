import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bot, Sparkles, ArrowRight, Eye, EyeOff, Lock, Mail, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setUser({
        name: "Rahul Reddy",
        email: email || "rahul.reddy@student.ac.in",
        avatar: "RR",
        category: "B.Tech Computer Science (3rd Year)",
        targetExam: "GATE 2027 & TCS NQT",
        preferredLanguage: "both",
        studyStreakDays: 14,
        doubtsResolved: 48,
        savedNotesCount: 12,
        weeklyGoalHours: 20,
        completedHours: 15.5
      });
      navigate('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC]">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-brandPurple-600 p-0.5">
              <div className="h-full w-full bg-navy-950 rounded-[10px] flex items-center justify-center">
                <span className="font-display font-black text-xl text-white">P</span>
              </div>
            </div>
            <span className="font-display font-extrabold text-2xl text-navy-900">
              PROBLEX <span className="text-blue-600">AI</span>
            </span>
          </Link>
          <h2 className="text-2xl font-display font-bold text-navy-900">
            Welcome back to Problex
          </h2>
          <p className="text-xs text-slate-500">
            Log in to access your AI Tutor chats and saved notes library.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@college.edu.in"
                className="w-full text-sm pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-slate-50/50"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Password
              </label>
              <a href="#" className="text-xs text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-sm pl-10 pr-10 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-slate-50/50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              defaultChecked
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-xs text-slate-600">
              Keep me signed in on this device
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-navy-900 hover:from-blue-700 hover:to-navy-950 shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Signing in...</span>
            ) : (
              <>
                <span>Sign In to Problex</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Fast Login Banner */}
        <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 text-xs text-blue-900 space-y-1">
          <div className="flex items-center gap-1.5 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Quick Demo Sign-in:
          </div>
          <p className="text-[11px] text-blue-700">
            Click "Sign In" with any sample email to immediately explore the personalized Student Dashboard!
          </p>
        </div>

        {/* Signup Redirect */}
        <div className="text-center text-xs text-slate-500">
          Don't have an account yet?{' '}
          <Link to="/signup" className="text-blue-600 font-bold hover:underline">
            Create Free Account
          </Link>
        </div>

      </div>
    </div>
  );
};
