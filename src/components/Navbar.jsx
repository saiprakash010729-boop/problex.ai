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
  FileText,
  HelpCircle,
  FileDown,
  Clock,
  GraduationCap,
  LogOut,
  User
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, user, logoutUser } = useApp();

  const navLinks = [
    { name: 'Home', path: '/', icon: Sparkles },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'AI Tutor', path: '/ai-tutor', icon: Bot, highlight: true },
    { name: 'Short Notes', path: '/short-notes', icon: FileText },
    { name: 'Quiz', path: '/quiz', icon: HelpCircle },
    { name: 'PDF Tool', path: '/pdf-generator', icon: FileDown },
    { name: 'Time Assist', path: '/time-assistance', icon: Clock },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0A1128]/90 backdrop-blur-xl border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-brandPurple-600 p-0.5 shadow-lg shadow-blue-500/20 transition-transform group-hover:scale-105">
              <div className="h-full w-full bg-navy-950 rounded-[14px] flex items-center justify-center relative overflow-hidden">
                <span className="font-display font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300">
                  P
                </span>
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-2xl tracking-tight text-white flex items-center gap-1.5">
                PROBLEX <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-brandPurple-400">AI</span>
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase -mt-1">
                Learn Smarter. Solve Better. Build Your Future.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                    active
                      ? 'text-cyan-300 bg-blue-600/20 border border-blue-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${active ? 'text-cyan-400' : 'text-slate-400'}`} />
                  {link.name}
                  {link.highlight && (
                    <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase rounded-md bg-gradient-to-r from-blue-600 to-brandPurple-600 text-white leading-none">
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
            <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-700/80 text-xs font-semibold">
              <button
                onClick={() => setLanguage('both')}
                className={`px-2 py-1 rounded-lg transition-all ${
                  language === 'both' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
                title="Bilingual: Telugu + English"
              >
                Both
              </button>
              <button
                onClick={() => setLanguage('telugu')}
                className={`px-2 py-1 rounded-lg transition-all ${
                  language === 'telugu' ? 'bg-brandPurple-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
                title="Telugu Mode"
              >
                తెలుగు
              </button>
              <button
                onClick={() => setLanguage('english')}
                className={`px-2 py-1 rounded-lg transition-all ${
                  language === 'english' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
                title="English Mode"
              >
                English
              </button>
            </div>

            {/* User Profile / Auth State */}
            {user?.name ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/select-standard"
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400/50 text-xs flex items-center gap-2 text-slate-300 transition-colors"
                  title="Click to change academic level"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-bold text-white max-w-[130px] truncate">{user.course} ({user.academicLevel})</span>
                </Link>

                <Link
                  to="/dashboard"
                  className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-brandPurple-600 p-0.5 shadow-md flex items-center justify-center font-bold text-xs text-white"
                  title={user.name}
                >
                  {user.name.substring(0, 2).toUpperCase()}
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-brandPurple-600 hover:opacity-95 shadow-md shadow-blue-500/20 transition-all"
                >
                  Sign Up Free
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 xl:hidden">
            <Link
              to="/dashboard"
              className="px-3 py-1.5 text-xs font-bold text-white bg-blue-600 rounded-lg shadow-sm"
            >
              Dashboard
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="xl:hidden bg-[#0F172A] border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    active
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <Link
              to="/select-standard"
              onClick={() => setIsOpen(false)}
              className="text-xs font-bold text-cyan-400 flex items-center gap-1.5"
            >
              <GraduationCap className="w-4 h-4" />
              <span>{user?.course || 'Course'}: {user?.academicLevel || 'Level'}</span>
            </Link>

            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
