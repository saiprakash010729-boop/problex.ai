import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Landmark, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Calendar, 
  BookOpen, 
  Award, 
  HelpCircle, 
  Clock, 
  FileText, 
  Languages,
  Check,
  ChevronRight,
  TrendingUp,
  Download
} from 'lucide-react';
import { GOVT_EXAMS_DATA, DAILY_CURRENT_AFFAIRS, MOCK_QUIZ_QUESTIONS } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const GovernmentExams = () => {
  const { addSavedNote } = useApp();
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'ca' | 'quiz' | 'gk'
  const [caLang, setCaLang] = useState('both'); // 'both' | 'telugu' | 'english'

  // Mock quiz state inside Govt section
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectAnswer = (qId, optionIdx) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: optionIdx
    }));
  };

  const calculateScore = () => {
    let score = 0;
    MOCK_QUIZ_QUESTIONS.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Hero */}
        <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-blue-950 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-2xl relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-cyan-300 border border-cyan-400/30">
              <Landmark className="w-3.5 h-3.5" />
              <span>Government Job Aspirants Hub</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-white">
              Ace Competitive Exams in <span className="text-cyan-400">Telugu & English</span>
            </h1>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Dedicated preparation resources for UPSC Civil Services, SSC CGL/CHSL, IBPS Banking, RRB Railways, and APPSC / TSPSC Group 1, 2, 4. Daily current affairs, aptitude shortcuts, and mock quizzes.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5 bg-navy-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Daily Telugu Current Affairs
              </span>
              <span className="flex items-center gap-1.5 bg-navy-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" /> APPSC & TSPSC Syllabus Aligned
              </span>
              <span className="flex items-center gap-1.5 bg-navy-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
                <CheckCircle2 className="w-4 h-4 text-brandPurple-400" /> Quantitative Math Shortcuts
              </span>
            </div>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4 mb-10 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'all' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Exam Streams
          </button>
          <button
            onClick={() => setActiveTab('ca')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'ca' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Daily Current Affairs (Telugu + English)
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'quiz' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Live Practice Quiz & Mocks
          </button>
          <button
            onClick={() => setActiveTab('gk')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'gk' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            General Knowledge & Polity Modules
          </button>
        </div>

        {/* TAB 1: ALL EXAM STREAMS */}
        {(activeTab === 'all' || activeTab === 'gk') && (
          <div className="space-y-8 mb-16">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-display font-bold text-navy-900">
                  Target Government Exam Streams
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Click on any exam to view syllabus breakdown and AI study modules.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {GOVT_EXAMS_DATA.map((exam) => (
                <div
                  key={exam.id}
                  className="p-6 rounded-3xl bg-white border border-slate-200/90 hover:border-blue-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${exam.color}`}>
                        {exam.badge}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400">
                        {exam.vacancies}
                      </span>
                    </div>

                    <h3 className="text-xl font-display font-bold text-navy-900">
                      {exam.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      {exam.description}
                    </p>

                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Core Subjects:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {exam.subjects.map((sub, sIdx) => (
                          <span key={sIdx} className="text-[11px] font-medium bg-slate-50 text-slate-700 px-2 py-0.5 rounded border border-slate-200/70">
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-600">
                      {exam.keyStats}
                    </span>
                    <Link
                      to="/ai-tutor"
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-navy-900 text-white hover:bg-blue-600 transition-colors flex items-center gap-1"
                    >
                      <span>Study with AI</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: DAILY CURRENT AFFAIRS */}
        {(activeTab === 'all' || activeTab === 'ca') && (
          <div className="mb-16">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-display font-bold text-navy-900">
                    Daily Bilingual Current Affairs
                  </h2>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-bold">
                    Updated Today
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  High-yield news analyzed from The Hindu, PIB, and Eenadu for UPSC & State PSC exams.
                </p>
              </div>

              {/* Language toggle for CA */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold self-start">
                <button
                  onClick={() => setCaLang('both')}
                  className={`px-3 py-1.5 rounded-lg ${caLang === 'both' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'}`}
                >
                  Bilingual (Both)
                </button>
                <button
                  onClick={() => setCaLang('telugu')}
                  className={`px-3 py-1.5 rounded-lg ${caLang === 'telugu' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'}`}
                >
                  తెలుగు
                </button>
                <button
                  onClick={() => setCaLang('english')}
                  className={`px-3 py-1.5 rounded-lg ${caLang === 'english' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'}`}
                >
                  English
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {DAILY_CURRENT_AFFAIRS.map((ca) => (
                <div
                  key={ca.id}
                  className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                      {ca.category}
                    </span>
                    <span className="text-slate-400 flex items-center gap-1 font-medium">
                      <Calendar className="w-3.5 h-3.5" /> {ca.date}
                    </span>
                  </div>

                  {/* Headlines & Summaries */}
                  <div className="space-y-3">
                    {(caLang === 'both' || caLang === 'telugu') && (
                      <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-100/80">
                        <h4 className="text-base font-bold text-navy-900 font-sans">
                          {ca.headlineTelugu}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-700 mt-1.5 leading-relaxed font-sans">
                          {ca.summaryTelugu}
                        </p>
                      </div>
                    )}

                    {(caLang === 'both' || caLang === 'english') && (
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                        <h4 className="text-base font-bold text-navy-900">
                          {ca.headlineEnglish}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                          {ca.summaryEnglish}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Exam Significance Footer */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="text-slate-500">
                      <strong>Target Exams:</strong> {ca.examSignificance}
                    </span>
                    <button
                      onClick={() => addSavedNote({
                        title: ca.headlineEnglish,
                        category: "Current Affairs",
                        language: caLang,
                        summary: ca.summaryEnglish,
                        content: `${ca.headlineTelugu}\n${ca.summaryTelugu}\n\n${ca.headlineEnglish}\n${ca.summaryEnglish}`
                      })}
                      className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Save to My Notes</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: LIVE PRACTICE QUIZ */}
        {(activeTab === 'all' || activeTab === 'quiz') && (
          <div className="mb-16">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div>
                  <h2 className="text-2xl font-display font-bold text-navy-900">
                    Live Government Job Practice Quiz
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Multi-subject practice set with real-time scoring and Telugu explanations.
                  </p>
                </div>
                {!showResults && (
                  <button
                    onClick={() => setShowResults(true)}
                    className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20"
                  >
                    Submit & View Results
                  </button>
                )}
              </div>

              {/* Quiz Results Summary if submitted */}
              {showResults && (
                <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 to-navy-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-cyan-400 font-bold text-xs uppercase tracking-wider">
                      Evaluation Result
                    </span>
                    <h3 className="text-2xl font-display font-bold">
                      Your Score: {calculateScore()} / {MOCK_QUIZ_QUESTIONS.length}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      Review detailed solutions and Telugu rationale below.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedAnswers({});
                      setShowResults(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-white text-navy-950 font-bold text-xs shadow-sm"
                  >
                    Reset Quiz
                  </button>
                </div>
              )}

              {/* Questions List */}
              <div className="space-y-6">
                {MOCK_QUIZ_QUESTIONS.map((q, idx) => (
                  <div key={q.id} className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                        {q.subject}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">Question {idx + 1}</span>
                    </div>

                    <h4 className="text-base font-bold text-navy-900">
                      {q.question}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {q.options.map((opt, oIdx) => {
                        const isSelected = selectedAnswers[q.id] === oIdx;
                        const isCorrect = q.correctAnswer === oIdx;
                        let btnStyle = "border-slate-200 hover:border-slate-300 bg-white text-slate-700";

                        if (isSelected && !showResults) {
                          btnStyle = "border-blue-600 bg-blue-50 text-blue-900 font-bold ring-1 ring-blue-600";
                        } else if (showResults) {
                          if (isCorrect) {
                            btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold";
                          } else if (isSelected && !isCorrect) {
                            btnStyle = "border-rose-500 bg-rose-50 text-rose-900";
                          }
                        }

                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleSelectAnswer(q.id, oIdx)}
                            className={`p-3 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center gap-2.5 ${btnStyle}`}
                          >
                            <span className="h-5 w-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold shrink-0">
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {showResults && (
                      <div className="p-4 rounded-xl bg-slate-900 text-slate-100 text-xs space-y-2 mt-3">
                        <span className="font-bold text-cyan-400 block">
                          సమాధాన వివరణ (Telugu Solution Explanation):
                        </span>
                        <p className="text-cyan-200/90 leading-relaxed font-sans">
                          {q.explanationTelugu}
                        </p>
                        <p className="text-slate-300 pt-1 border-t border-slate-800 leading-relaxed">
                          {q.explanationEnglish}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
