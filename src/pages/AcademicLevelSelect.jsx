import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  BookOpen, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Award, 
  ChevronRight,
  School,
  Layers,
  Compass
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AcademicLevelSelect = () => {
  const navigate = useNavigate();
  const { user, updateCourseAndLevel, showToast } = useApp();

  const [course, setCourse] = useState(user?.course || 'B.Tech');
  const [academicLevel, setAcademicLevel] = useState(
    user?.academicLevel || (course === 'B.Tech' ? '3rd Year' : 'Degree')
  );
  const [branch, setBranch] = useState(
    user?.branch || (course === 'B.Tech' ? 'Computer Science & Engineering' : 'General Studies')
  );
  const [targetExam, setTargetExam] = useState(user?.targetExam || 'GATE & Semester Exams');
  const [saving, setSaving] = useState(false);

  // B.Tech Academic Years
  const btechYears = [
    {
      year: "1st Year",
      badge: "Foundation Year",
      desc: "Engineering Physics, Chemistry, Matrices & Calculus, Basic Electrical, C Programming & Lab."
    },
    {
      year: "2nd Year",
      badge: "Core Fundamentals",
      desc: "Data Structures, Digital Logic Design, Discrete Mathematics, OOPs with Java/C++, Computer Organization."
    },
    {
      year: "3rd Year",
      badge: "Advanced Core",
      desc: "Operating Systems, DBMS, Design & Analysis of Algorithms, Computer Networks, Software Engineering."
    },
    {
      year: "4th Year",
      badge: "Placements & Capstone",
      desc: "Machine Learning, Cloud Computing, Distributed Systems, Compiler Design, Campus Placement Prep."
    }
  ];

  // Competitive Exams Standards
  const competitiveStandards = [
    { standard: "8th Standard", badge: "School Foundation", desc: "NCERT Basics, General Science, Mathematics & Social Studies." },
    { standard: "9th Standard", badge: "Secondary School", desc: "Advanced Foundation, Mental Ability, State Board & CBSE Syllabus." },
    { standard: "10th Standard", badge: "Board Exam Aspirant", desc: "Board Exam Revision, NTSE, Olympiad & Basic General Knowledge." },
    { standard: "Intermediate", badge: "Junior College (11th/12th)", desc: "MPC, BiPC, CEC, MEC, JEE Main / EAPCET & Foundation GK." },
    { standard: "Degree", badge: "Undergraduate (UG)", desc: "B.A, B.Sc, B.Com, BBA preparing for UPSC, SSC CGL & State PSCs." },
    { standard: "Graduate", badge: "Post-Degree Aspirant", desc: "Dedicated preparation for UPSC CSE, APPSC/TSPSC Groups, Banking & Railways." },
    { standard: "Other", badge: "Lifelong Learner", desc: "Independent study, professional upskilling, and general competitive knowledge." }
  ];

  const btechBranches = [
    "Computer Science & Engineering (CSE)",
    "Electronics & Communication (ECE)",
    "Electrical & Electronics (EEE)",
    "Mechanical Engineering (ME)",
    "Civil Engineering (CE)",
    "Information Technology (IT)",
    "AI & Machine Learning / Data Science"
  ];

  const examTargets = [
    "UPSC Civil Services (IAS/IPS/IFS)",
    "APPSC / TSPSC Group 1, Group 2 & Group 4",
    "SSC CGL, CHSL & CPO",
    "Banking Exams (IBPS PO, SBI Clerk)",
    "Railways (RRB NTPC & Group D)",
    "GATE & PSU Recruitment"
  ];

  const handleCourseSwitch = (newCourse) => {
    setCourse(newCourse);
    if (newCourse === 'B.Tech') {
      setAcademicLevel('3rd Year');
      setBranch('Computer Science & Engineering (CSE)');
      setTargetExam('GATE & Semester Finals');
    } else {
      setAcademicLevel('Degree');
      setBranch('General Studies');
      setTargetExam('UPSC & State PSCs');
    }
  };

  const handleSaveAndContinue = async () => {
    setSaving(true);
    await updateCourseAndLevel(course, academicLevel, branch, targetExam);
    setSaving(false);
    showToast(`Saved! Welcome to Problex AI Dashboard.`);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1128] via-[#0F172A] to-[#0A1128] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Banner */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-cyan-400/10 text-cyan-300 border border-cyan-400/25">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Step 2 of 2: Academic Profile Setup
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
            Select Your Academic Level
          </h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Problex AI customizes question explanations, formulas, Telugu analogies, and quiz difficulty based on your exact academic curriculum.
          </p>
        </div>

        {/* Step 1: Course Toggle */}
        <div className="bg-[#0F172A]/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-700/60 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-display font-bold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-blue-400" />
                Selected Primary Course
              </h2>
              <p className="text-xs text-slate-400">Switch between B.Tech or Competitive Exams at any time.</p>
            </div>
            <span className="text-xs font-bold text-slate-400 bg-slate-800 px-3 py-1 rounded-full">
              {course}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <button
              type="button"
              onClick={() => handleCourseSwitch('B.Tech')}
              className={`p-5 rounded-2xl border text-left transition-all flex items-start gap-4 ${
                course === 'B.Tech'
                  ? 'border-blue-500 bg-blue-600/15 ring-2 ring-blue-500/30'
                  : 'border-slate-700/80 bg-slate-900/60 hover:bg-slate-800/40 text-slate-400'
              }`}
            >
              <div className={`p-3 rounded-xl ${course === 'B.Tech' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-base text-white">1. B.Tech Engineering</span>
                  {course === 'B.Tech' && <CheckCircle2 className="w-5 h-5 text-blue-400" />}
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  1st, 2nd, 3rd, and 4th Year engineering curriculum with 2M, 4M, 8M university exam structures.
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleCourseSwitch('Competitive Exams')}
              className={`p-5 rounded-2xl border text-left transition-all flex items-start gap-4 ${
                course === 'Competitive Exams'
                  ? 'border-brandPurple-500 bg-brandPurple-600/15 ring-2 ring-brandPurple-500/30'
                  : 'border-slate-700/80 bg-slate-900/60 hover:bg-slate-800/40 text-slate-400'
              }`}
            >
              <div className={`p-3 rounded-xl ${course === 'Competitive Exams' ? 'bg-brandPurple-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-base text-white">2. Competitive Exams</span>
                  {course === 'Competitive Exams' && <CheckCircle2 className="w-5 h-5 text-brandPurple-400" />}
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  8th Standard to Degree & Graduate levels for UPSC, SSC, APPSC, TSPSC & Banking.
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Step 2: Academic Level / Standard Selection */}
        <div className="bg-[#0F172A]/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-700/60 shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-display font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400" />
                {course === 'B.Tech' ? 'Choose Your B.Tech Academic Year' : 'Choose Your Academic Standard'}
              </h2>
              <p className="text-xs text-slate-400">
                {course === 'B.Tech' 
                  ? 'Select your current B.Tech year (1st to 4th Year)' 
                  : 'Select your standard (8th, 9th, 10th, Intermediate, Degree, Graduate, Other)'}
              </p>
            </div>
            <span className="text-xs text-cyan-300 font-bold bg-cyan-950/40 border border-cyan-400/30 px-3 py-1 rounded-full">
              Selected: {academicLevel}
            </span>
          </div>

          {/* If B.Tech: Display 1st Year, 2nd Year, 3rd Year, 4th Year */}
          {course === 'B.Tech' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {btechYears.map((item) => {
                const isSelected = academicLevel === item.year;
                return (
                  <button
                    key={item.year}
                    type="button"
                    onClick={() => setAcademicLevel(item.year)}
                    className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                      isSelected
                        ? 'border-blue-500 bg-gradient-to-br from-blue-600/20 via-blue-900/20 to-slate-900 ring-2 ring-blue-500 shadow-xl shadow-blue-500/10'
                        : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800/50 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-white font-display">{item.year}</span>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          {item.badge}
                        </span>
                      </div>
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center border transition-all ${
                        isSelected ? 'bg-blue-600 border-blue-500 text-white' : 'border-slate-700 text-transparent'
                      }`}>
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          )}

          {/* If Competitive Exams: Display 8th, 9th, 10th, Intermediate, Degree, Graduate, Other */}
          {course === 'Competitive Exams' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {competitiveStandards.map((item) => {
                const isSelected = academicLevel === item.standard;
                return (
                  <button
                    key={item.standard}
                    type="button"
                    onClick={() => setAcademicLevel(item.standard)}
                    className={`p-4 rounded-2xl border text-left transition-all relative group ${
                      isSelected
                        ? 'border-brandPurple-500 bg-gradient-to-br from-brandPurple-600/25 via-indigo-950/30 to-slate-900 ring-2 ring-brandPurple-500 shadow-xl shadow-purple-500/10'
                        : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800/50 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-bold text-white">{item.standard}</span>
                      <div className={`h-5 w-5 rounded-full flex items-center justify-center border transition-all ${
                        isSelected ? 'bg-brandPurple-600 border-brandPurple-500 text-white' : 'border-slate-700 text-transparent'
                      }`}>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <div className="text-[10px] text-brandPurple-300 font-semibold mb-1">
                      {item.badge}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight">
                      {item.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          )}

          {/* Optional Branch / Focus Selector */}
          <div className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                {course === 'B.Tech' ? 'Engineering Branch / Specialization' : 'Primary Target Subject / Focus'}
              </label>
              {course === 'B.Tech' ? (
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-slate-700 bg-slate-900 text-white focus:outline-none focus:border-blue-500"
                >
                  {btechBranches.map((b, i) => (
                    <option key={i} value={b}>{b}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  placeholder="e.g. General Studies & Aptitude"
                  className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-slate-700 bg-slate-900 text-white focus:outline-none focus:border-brandPurple-500"
                />
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Target Exam or University
              </label>
              {course === 'Competitive Exams' ? (
                <select
                  value={targetExam}
                  onChange={(e) => setTargetExam(e.target.value)}
                  className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-slate-700 bg-slate-900 text-white focus:outline-none focus:border-brandPurple-500"
                >
                  {examTargets.map((e, i) => (
                    <option key={i} value={e}>{e}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={targetExam}
                  onChange={(e) => setTargetExam(e.target.value)}
                  placeholder="e.g. JNTU / OU Semester Exams & GATE"
                  className="w-full text-xs sm:text-sm px-4 py-3 rounded-xl border border-slate-700 bg-slate-900 text-white focus:outline-none focus:border-blue-500"
                />
              )}
            </div>
          </div>

        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/80 border border-slate-800">
          <div className="text-center sm:text-left">
            <div className="text-xs text-slate-400">Configuring Profile:</div>
            <div className="text-base font-bold text-white">
              {course} • <span className="text-cyan-300">{academicLevel}</span> ({branch})
            </div>
          </div>

          <button
            type="button"
            onClick={handleSaveAndContinue}
            disabled={saving}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-brandPurple-600 hover:opacity-95 shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2 transition-all"
          >
            {saving ? (
              <span>Saving your preferences...</span>
            ) : (
              <>
                <span>Enter Problex AI Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
