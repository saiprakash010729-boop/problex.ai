import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, ArrowRight, Github, Twitter, Linkedin, Youtube, MessageCircle } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-navy-950 text-slate-300 pt-16 pb-12 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter / CTA Grid */}
        <div className="bg-gradient-to-r from-navy-900 via-navy-850 to-blue-950 p-8 sm:p-10 rounded-3xl border border-navy-700/60 shadow-2xl mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-electric-blue/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-cyan-400 border border-cyan-400/20 mb-3">
                <Sparkles className="w-3.5 h-3.5" /> Stay Ahead in Your Exams
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                Get daily exam capsules & AI study hacks in Telugu & English
              </h3>
              <p className="text-slate-400 text-sm mt-2 max-w-xl">
                Join over 45,000+ engineering, college, and government exam aspirants receiving weekly syllabus notes and programming guides.
              </p>
            </div>
            <div className="lg:col-span-5">
              <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to Problex AI updates!'); }} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your student email..."
                  className="bg-navy-950/80 text-white placeholder-slate-500 text-sm px-4 py-3 rounded-xl border border-navy-700 focus:outline-none focus:border-cyan-400 flex-grow"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 shrink-0"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
              <span className="text-[11px] text-slate-500 block mt-2">
                Zero spam. Free study material every Sunday. Unsubscribe anytime.
              </span>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-12 border-b border-navy-800">
          
          {/* Brand Info */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-brandPurple-600 p-0.5 flex items-center justify-center">
                <div className="h-full w-full bg-navy-950 rounded-[10px] flex items-center justify-center">
                  <span className="font-display font-black text-xl text-white">P</span>
                </div>
              </div>
              <span className="font-display font-bold text-2xl text-white tracking-tight">
                PROBLEX <span className="text-cyan-400">AI</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
              Empowering B.Tech students, college learners, and competitive exam aspirants across India with cutting-edge AI tutoring in both Telugu and English.
            </p>
            <div className="flex items-center gap-3 text-slate-400">
              <a href="#" className="h-9 w-9 rounded-lg bg-navy-900 hover:bg-navy-800 hover:text-cyan-400 flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-lg bg-navy-900 hover:bg-navy-800 hover:text-cyan-400 flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-lg bg-navy-900 hover:bg-navy-800 hover:text-cyan-400 flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-lg bg-navy-900 hover:bg-navy-800 hover:text-cyan-400 flex items-center justify-center transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* AI Tutor & Learning */}
          <div>
            <h4 className="font-display font-bold text-white text-sm mb-4 tracking-wide uppercase">
              AI Tutor
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/ai-tutor" className="text-slate-400 hover:text-white transition-colors">
                  Ask Any Doubt
                </Link>
              </li>
              <li>
                <Link to="/ai-tutor" className="text-slate-400 hover:text-white transition-colors">
                  Telugu Explanations
                </Link>
              </li>
              <li>
                <Link to="/ai-tutor" className="text-slate-400 hover:text-white transition-colors">
                  2, 4 & 8 Mark Answers
                </Link>
              </li>
              <li>
                <Link to="/ai-tutor" className="text-slate-400 hover:text-white transition-colors">
                  Programming Logic
                </Link>
              </li>
              <li>
                <Link to="/ai-tutor" className="text-slate-400 hover:text-white transition-colors">
                  Voice & Image Doubt Solver
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Study Tools */}
          <div>
            <h4 className="font-display font-bold text-white text-sm mb-4 tracking-wide uppercase">
              Study Tools
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/study-tools" className="text-slate-400 hover:text-white transition-colors">
                  AI Notes Generator
                </Link>
              </li>
              <li>
                <Link to="/study-tools" className="text-slate-400 hover:text-white transition-colors">
                  AI PDF Summarizer
                </Link>
              </li>
              <li>
                <Link to="/study-tools" className="text-slate-400 hover:text-white transition-colors">
                  Interactive Quiz Maker
                </Link>
              </li>
              <li>
                <Link to="/study-tools" className="text-slate-400 hover:text-white transition-colors">
                  Flashcard Generator
                </Link>
              </li>
              <li>
                <Link to="/study-tools" className="text-slate-400 hover:text-white transition-colors">
                  Smart Study Timetable
                </Link>
              </li>
            </ul>
          </div>

          {/* Government Exams */}
          <div>
            <h4 className="font-display font-bold text-white text-sm mb-4 tracking-wide uppercase">
              Govt Exams
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/government-exams" className="text-slate-400 hover:text-white transition-colors">
                  APPSC & TSPSC Groups
                </Link>
              </li>
              <li>
                <Link to="/government-exams" className="text-slate-400 hover:text-white transition-colors">
                  UPSC Civil Services
                </Link>
              </li>
              <li>
                <Link to="/government-exams" className="text-slate-400 hover:text-white transition-colors">
                  SSC CGL & CHSL
                </Link>
              </li>
              <li>
                <Link to="/government-exams" className="text-slate-400 hover:text-white transition-colors">
                  IBPS & SBI Banking
                </Link>
              </li>
              <li>
                <Link to="/government-exams" className="text-slate-400 hover:text-white transition-colors">
                  Daily Telugu Current Affairs
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-2">
            <span>© 2026 PROBLEX AI Technologies Inc. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-slate-400">తెలుగు మరియు ఆంగ్లంలో ఆధునిక విద్య</span>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/about-us" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link to="/about-us" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
            <Link to="/about-us" className="hover:text-slate-400 transition-colors">Student Honor Code</Link>
            <span className="flex items-center gap-1 text-slate-400">
              Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Students
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
