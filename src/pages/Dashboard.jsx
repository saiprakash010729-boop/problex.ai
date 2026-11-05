import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bot, 
  Sparkles, 
  BookOpen, 
  Clock, 
  TrendingUp, 
  Bookmark, 
  Calendar, 
  GraduationCap, 
  Landmark, 
  Code2, 
  ArrowRight, 
  CheckCircle2, 
  Trash2, 
  ExternalLink,
  Flame,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { STUDY_TOOLS_LIST } from '../data/mockData';

export const Dashboard = () => {
  const { user, savedNotes, removeSavedNote } = useApp();
  const [activeNotesFilter, setActiveNotesFilter] = useState('All');

  const filteredNotes = activeNotesFilter === 'All' 
    ? savedNotes 
    : savedNotes.filter(n => n.category.toLowerCase().includes(activeNotesFilter.toLowerCase()));

  const upcomingExams = [
    { name: "JNTU B.Tech Semester Finals", daysLeft: 18, date: "Nov 23, 2026", color: "text-blue-600 bg-blue-50 border-blue-200" },
    { name: "SSC CGL Tier-1 Exam", daysLeft: 42, date: "Dec 17, 2026", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
    { name: "TSPSC / APPSC Group-2 Prelims", daysLeft: 64, date: "Jan 08, 2027", color: "text-purple-600 bg-purple-50 border-purple-200" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Welcome Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-navy-950 via-navy-900 to-blue-950 text-white border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 mb-3">
                <Sparkles className="w-3.5 h-3.5" /> Student Dashboard
              </div>
              <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white">
                Namaste, {user.name}! 👋
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-1.5 max-w-xl">
                {user.category} • Target: <span className="text-cyan-300 font-semibold">{user.targetExam}</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/ai-tutor"
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-navy-950 font-bold text-sm shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition-all"
              >
                <Bot className="w-4 h-4" />
                <span>Launch AI Tutor</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-display font-extrabold text-navy-900 block leading-tight">
                {user.doubtsResolved}
              </span>
              <span className="text-xs font-semibold text-slate-500">Doubts Solved</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-purple-50 text-brandPurple-600 flex items-center justify-center font-bold">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-display font-extrabold text-navy-900 block leading-tight">
                {user.completedHours} hrs
              </span>
              <span className="text-xs font-semibold text-slate-500">Study Completed</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-display font-extrabold text-navy-900 block leading-tight">
                {user.studyStreakDays} Days
              </span>
              <span className="text-xs font-semibold text-slate-500">Daily Study Streak</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Bookmark className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-display font-extrabold text-navy-900 block leading-tight">
                {savedNotes.length}
              </span>
              <span className="text-xs font-semibold text-slate-500">Saved Notes</span>
            </div>
          </div>
        </div>

        {/* Two Column Layout: Main Content & Sidebar Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT 2 COLS: Recently Used Tools & Saved Notes */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Recently Used AI Tools */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <h2 className="text-lg font-display font-bold text-navy-900">
                    Quick Access AI Study Tools
                  </h2>
                </div>
                <Link to="/study-tools" className="text-xs font-bold text-blue-600 hover:text-blue-800">
                  View All Tools →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {STUDY_TOOLS_LIST.slice(0, 3).map((tool) => (
                  <Link
                    key={tool.id}
                    to="/study-tools"
                    className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 hover:border-blue-500 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`h-10 w-10 rounded-xl bg-gradient-to-r ${tool.color} text-white flex items-center justify-center font-bold shadow-sm`}>
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {tool.category}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-navy-900 group-hover:text-blue-600 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                      {tool.tagline}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Saved Notes Repository */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-brandPurple-600" />
                  <h2 className="text-lg font-display font-bold text-navy-900">
                    My Saved Notes & Formula Sheets
                  </h2>
                </div>

                {/* Filter tags */}
                <div className="flex items-center gap-1.5 text-xs font-semibold">
                  {['All', 'Data Structures', 'Polity', 'Engineering'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveNotesFilter(cat)}
                      className={`px-2.5 py-1 rounded-lg transition-all ${
                        activeNotesFilter === cat
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {filteredNotes.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-xs">
                  No notes saved in this category yet. Click "Save Note" in AI Tutor to build your revision library.
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredNotes.map((note) => (
                    <div
                      key={note.id}
                      className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 space-y-3 hover:border-slate-300 transition-all"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold uppercase bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                              {note.category}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              {note.date}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-navy-900">
                            {note.title}
                          </h4>
                        </div>
                        <button
                          onClick={() => removeSavedNote(note.id)}
                          className="text-slate-400 hover:text-rose-500 p-1"
                          title="Delete note"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed font-sans">
                        {note.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* RIGHT 1 COL: Upcoming Exams & Target Categories */}
          <div className="space-y-8">
            
            {/* Upcoming Exam Countdown */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Calendar className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-display font-bold text-navy-900">
                  Target Exam Countdown
                </h3>
              </div>

              <div className="space-y-3">
                {upcomingExams.map((exam, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-navy-900">{exam.name}</h4>
                      <span className="text-[11px] text-slate-500">{exam.date}</span>
                    </div>
                    <span className={`text-xs font-extrabold px-2.5 py-1 rounded-lg border ${exam.color}`}>
                      {exam.daysLeft} Days
                    </span>
                  </div>
                ))}
              </div>

              <Link
                to="/study-tools"
                className="w-full text-center py-2.5 rounded-xl border border-blue-200 text-blue-600 font-bold text-xs hover:bg-blue-50 block transition-colors"
              >
                Generate Custom Study Timetable
              </Link>
            </div>

            {/* Learning Hub Shortcuts */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-display font-bold text-navy-900 pb-2 border-b border-slate-100">
                Browse Learning Streams
              </h3>

              <div className="space-y-2 text-xs font-medium">
                <Link
                  to="/ai-tutor"
                  className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <GraduationCap className="w-4 h-4 text-blue-600" />
                    <span>B.Tech Engineering Syllabus</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  to="/government-exams"
                  className="p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Landmark className="w-4 h-4 text-emerald-600" />
                    <span>APPSC / TSPSC & Central Govt</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  to="/ai-tutor"
                  className="p-3 rounded-xl bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-brandPurple-700 flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Code2 className="w-4 h-4 text-purple-600" />
                    <span>Programming & Coding Tutor</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
