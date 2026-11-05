import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  Menu, 
  X, 
  Bot, 
  Wrench, 
  Landmark, 
  Info, 
  LayoutDashboard, 
  Languages, 
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, user } = useApp();

  const navLinks = [
    { name: 'Home', path: '/', icon: Sparkles },
    { name: 'AI Tutor', path: '/ai-tutor', icon: Bot, highlight: true },
    { name: 'Study Tools', path: '/study-tools', icon: Wrench },
    { name: 'Government Exams', path: '/government-exams', icon: Landmark },
    { name: 'About Us', path: '/about-us', icon: Info },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-nav border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-navy-900 via-navy-800 to-electric-blue p-0.5 shadow-md shadow-navy-900/10 transition-transform group-hover:scale-105">
              <div className="h-full w-full bg-navy-950 rounded-[10px] flex items-center justify-center relative overflow-hidden">
                <span className="font-display font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300">
                  P
                </span>
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-2xl tracking-tight text-navy-900 flex items-center gap-1.5">
                PROBLEX <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-brandPurple-600">AI</span>
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase -mt-1">
                తెలుగు & English Learning
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                    active
                      ? 'text-blue-600 bg-blue-50/80 shadow-sm'
                      : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-blue-600' : 'text-slate-400'}`} />
                  {link.name}
                  {link.highlight && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase rounded-md bg-gradient-to-r from-blue-600 to-brandPurple-600 text-white leading-none">
                      AI 2.0
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Quick Language Selector */}
            <div className="flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200/80 text-xs font-semibold">
              <button
                onClick={() => setLanguage('both')}
                className={`px-2.5 py-1.5 rounded-lg transition-all ${
                  language === 'both' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-navy-900'
                }`}
                title="Bilingual: Telugu + English"
              >
                Both
              </button>
              <button
                onClick={() => setLanguage('telugu')}
                className={`px-2.5 py-1.5 rounded-lg transition-all ${
                  language === 'telugu' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-navy-900'
                }`}
              >
                తెలుగు
              </button>
              <button
                onClick={() => setLanguage('english')}
                className={`px-2.5 py-1.5 rounded-lg transition-all ${
                  language === 'english' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-navy-900'
                }`}
              >
                English
              </button>
            </div>

            {/* Dashboard Link */}
            <Link
              to="/dashboard"
              className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50/50 transition-all"
              title="Student Dashboard"
            >
              <LayoutDashboard className="w-5 h-5" />
            </Link>

            {/* Login / Auth */}
            <Link
              to="/login"
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-navy-900 hover:bg-slate-100 transition-all"
            >
              Log In
            </Link>

            {/* Primary CTA */}
            <Link
              to="/ai-tutor"
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-navy-800 to-brandPurple-600 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/ai-tutor"
              className="px-3 py-1.5 text-xs font-bold text-white bg-blue-600 rounded-lg shadow-sm"
            >
              AI Tutor
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl text-slate-600 hover:text-navy-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white/95 backdrop-blur-lg px-4 pt-3 pb-6 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
              <Languages className="w-3.5 h-3.5" /> Explanation Language:
            </span>
            <div className="flex bg-slate-100 p-0.5 rounded-lg text-xs font-bold">
              <button
                onClick={() => setLanguage('both')}
                className={`px-2 py-1 rounded ${language === 'both' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'}`}
              >
                Both
              </button>
              <button
                onClick={() => setLanguage('telugu')}
                className={`px-2 py-1 rounded ${language === 'telugu' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'}`}
              >
                తెలుగు
              </button>
              <button
                onClick={() => setLanguage('english')}
                className={`px-2 py-1 rounded ${language === 'english' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'}`}
              >
                English
              </button>
            </div>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    active ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-slate-400" />
                    <span>{link.name}</span>
                  </div>
                  {link.highlight && (
                    <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full">
                      Telugu + English
                    </span>
                  )}
                </Link>
              );
            })}

            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <LayoutDashboard className="w-4 h-4 text-slate-400" />
              <span>Student Dashboard</span>
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2.5 rounded-xl text-sm font-semibold text-slate-700 border border-slate-200"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 shadow-md shadow-blue-500/20"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
