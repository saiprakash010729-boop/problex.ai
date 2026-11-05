import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bot, 
  Sparkles, 
  Send, 
  Plus, 
  Copy, 
  Check, 
  Download, 
  Bookmark, 
  Languages, 
  BookOpen, 
  Code2, 
  Lightbulb, 
  HelpCircle, 
  Clock, 
  Flame, 
  ArrowRight, 
  RefreshCw, 
  Trash2, 
  Layers, 
  GraduationCap, 
  Award,
  ChevronRight,
  FileText,
  FileDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { downloadPdfDocument } from '../utils/pdfGenerator';
import { CodeBlock } from '../components/CodeBlock';

export const Dashboard = () => {
  const { user, addSavedNote, language, showToast } = useApp();

  // Chat sessions state
  const [sessions, setSessions] = useState([
    {
      id: 'session-1',
      title: user?.course === 'B.Tech' ? 'Binary Search & Time Complexity' : 'Fundamental Rights Articles 12-35',
      date: 'Today',
      messages: [
        {
          id: 'm1',
          sender: 'ai',
          text: `Welcome to Problex AI, ${user?.name || 'Student'}! 👋\n\nI am your dedicated AI academic tutor configured for **${user?.course || 'B.Tech'} (${user?.academicLevel || '3rd Year'})**.\n\nWhat would you like to learn today? You can ask academic concepts, request simple English explanations, get authentic Telugu analogies (తెలుగు వివరణ), dry-run code, or explore real-life examples!`,
          timestamp: 'Just now'
        }
      ]
    }
  ]);

  const [activeSessionId, setActiveSessionId] = useState('session-1');
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [activeMode, setActiveMode] = useState('standard'); // 'standard' | 'telugu' | 'simple' | 'code' | 'reallife'
  
  const messagesEndRef = useRef(null);

  const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeSession?.messages, isGenerating]);

  // Handle New Chat
  const handleNewChat = () => {
    const newSession = {
      id: `session-${Date.now()}`,
      title: 'New Conversation',
      date: 'Just now',
      messages: [
        {
          id: `m-${Date.now()}`,
          sender: 'ai',
          text: `Welcome to Problex AI! What would you like to learn today?`,
          timestamp: 'Just now'
        }
      ]
    };
    setSessions([newSession, ...sessions]);
    setActiveSessionId(newSession.id);
  };

  // Delete chat session
  const handleDeleteSession = (id, e) => {
    e.stopPropagation();
    if (sessions.length === 1) {
      showToast("At least one chat session must remain.");
      return;
    }
    const filtered = sessions.filter(s => s.id !== id);
    setSessions(filtered);
    if (activeSessionId === id) {
      setActiveSessionId(filtered[0].id);
    }
  };

  // Send message
  const handleSendMessage = async (textToSend, forcedMode = activeMode) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Update active session with user message
    const updatedSessions = sessions.map(s => {
      if (s.id === activeSessionId) {
        return {
          ...s,
          title: s.messages.length <= 1 ? (query.length > 32 ? query.substring(0, 32) + '...' : query) : s.title,
          messages: [...s.messages, userMessage]
        };
      }
      return s;
    });

    setSessions(updatedSessions);
    setInputText('');
    setIsGenerating(true);

    try {
      const res = await api.askAi({
        question: query,
        course: user?.course || 'B.Tech',
        academicLevel: user?.academicLevel || '3rd Year',
        language: forcedMode === 'telugu' ? 'telugu' : forcedMode === 'simple' ? 'simple' : 'both',
        mode: forcedMode
      });

      const aiResponseText = res?.fullResponse || res?.text || `Here is the explanation for: ${query}`;

      const aiMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiResponseText,
        topic: query,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setSessions(prev => prev.map(s => {
        if (s.id === activeSessionId) {
          return {
            ...s,
            messages: [...s.messages, aiMessage]
          };
        }
        return s;
      }));
    } catch (err) {
      showToast("Error generating AI response. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // One-click explanation variations
  const handleRequestVariation = (originalQuestion, modeType) => {
    let promptModifier = originalQuestion;
    if (modeType === 'telugu') {
      promptModifier = `Explain this in authentic Telugu with examples (తెలుగులో వివరించండి): "${originalQuestion}"`;
    } else if (modeType === 'simple') {
      promptModifier = `Explain this in simple English for beginner students: "${originalQuestion}"`;
    } else if (modeType === 'reallife') {
      promptModifier = `Give a real-life practical analogy/example (నిజ జీవిత ఉదాహరణ) for: "${originalQuestion}"`;
    } else if (modeType === 'code') {
      promptModifier = `Provide dry-run code and step-by-step logic for: "${originalQuestion}"`;
    }
    handleSendMessage(promptModifier, modeType);
  };

  // Copy response
  const handleCopyResponse = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast("Response copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Download response as PDF
  const handleDownloadResponsePdf = (topic, text) => {
    downloadPdfDocument({
      title: `Problex AI Explanation: ${topic || 'Academic Query'}`,
      topic: topic || "AI Study Answer",
      studentName: user?.name,
      course: user?.course,
      academicLevel: user?.academicLevel,
      rawText: text
    });
    showToast("Downloaded answer as PDF!");
  };

  // Save to notes
  const handleSaveToNotes = (topic, text) => {
    addSavedNote({
      title: topic || "AI Tutor Academic Explanation",
      topic: topic || "Concept Query",
      category: `${user?.course} (${user?.academicLevel})`,
      summary: text.substring(0, 150) + "...",
      content: text
    });
  };

  // Course-specific prompt suggestions
  const promptSuggestions = user?.course === 'B.Tech' ? [
    "Explain Binary Search in Telugu & English with dry-run code",
    "Second Law of Thermodynamics & Kelvin-Planck Statement",
    "Process Scheduling Algorithms in OS (FCFS vs Round Robin)",
    "Difference between TCP and UDP with real-life analogies",
    "How does DBMS B-Tree indexing work?"
  ] : [
    "Fundamental Rights (Articles 12 to 35) 8-Mark Structure",
    "Time and Work shortcuts using LCM method for SSC/UPSC",
    "Difference between Money Bill and Ordinary Bill",
    "Indus Valley Civilization town planning & drainage system",
    "Inflation: Demand-Pull vs Cost-Push & RBI Monetary Policy"
  ];

  return (
    <div className="min-h-screen bg-[#0A1128] text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* ========================================================= */}
        {/* TOP WELCOME BANNER & ACADEMIC LEVEL BADGE */}
        {/* ========================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#1E1B4B] to-[#0F172A] border border-blue-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-72 h-72 bg-gradient-to-tr from-blue-600/20 via-brandPurple-600/20 to-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-400/10 text-cyan-300 border border-cyan-400/25">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  Student Learning Command Center
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  Tagline: <strong className="text-slate-300">Learn Smarter. Solve Better. Build Your Future.</strong>
                </span>
              </div>

              {/* Welcome message using student's name */}
              <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white">
                Welcome to Problex AI, {user?.name}! 👋
              </h1>

              <div className="flex items-center gap-3 pt-1 flex-wrap">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs">
                  <GraduationCap className="w-4 h-4 text-blue-400" />
                  <span className="text-slate-300">Active Course:</span>
                  <span className="font-bold text-white">{user?.course || 'B.Tech'}</span>
                  <span className="text-cyan-400">• {user?.academicLevel || '3rd Year'}</span>
                </div>

                <Link
                  to="/select-standard"
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1"
                >
                  <span>Switch Course / Level</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700/80 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center font-bold">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-lg font-bold text-white leading-tight block">
                    {user?.studyStreakDays || 14} Days
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Daily Streak</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700/80 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center font-bold">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-lg font-bold text-white leading-tight block">
                    {user?.doubtsResolved || 48}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Doubts Solved</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* DEDICATED TOOLS NAVIGATION CARDS */}
        {/* ========================================================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/short-notes"
            className="p-5 rounded-2xl bg-[#0F172A] hover:bg-slate-900/90 border border-slate-700/80 hover:border-cyan-500/50 shadow-xl transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
            </div>
            <div className="font-bold text-sm text-white">Short Notes Generator</div>
            <p className="text-[11px] text-slate-400 mt-1">Definitions, formulas, points & quick revision.</p>
          </Link>

          <Link
            to="/quiz"
            className="p-5 rounded-2xl bg-[#0F172A] hover:bg-slate-900/90 border border-slate-700/80 hover:border-purple-500/50 shadow-xl transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-xl bg-brandPurple-500/15 text-brandPurple-400 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                <HelpCircle className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-brandPurple-400 transition-colors" />
            </div>
            <div className="font-bold text-sm text-white">Interactive Quiz Generator</div>
            <p className="text-[11px] text-slate-400 mt-1">4-option MCQs with explanations & scoring.</p>
          </Link>

          <Link
            to="/pdf-generator"
            className="p-5 rounded-2xl bg-[#0F172A] hover:bg-slate-900/90 border border-slate-700/80 hover:border-blue-500/50 shadow-xl transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                <FileDown className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
            </div>
            <div className="font-bold text-sm text-white">PDF Generator Tool</div>
            <p className="text-[11px] text-slate-400 mt-1">Export structured study guides to PDF.</p>
          </Link>

          <Link
            to="/time-assistance"
            className="p-5 rounded-2xl bg-[#0F172A] hover:bg-slate-900/90 border border-slate-700/80 hover:border-amber-500/50 shadow-xl transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                <Clock className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
            </div>
            <div className="font-bold text-sm text-white">Study Time Assistance</div>
            <p className="text-[11px] text-slate-400 mt-1">Daily schedule, Pomodoro & revision targets.</p>
          </Link>
        </div>

        {/* ========================================================= */}
        {/* MAIN AI CHAT INTERFACE & WORKSPACE */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          
          {/* LEFT: Chat History & Sessions */}
          <div className="lg:col-span-1 p-5 rounded-3xl bg-[#0F172A] border border-slate-700/80 shadow-xl space-y-4">
            <button
              onClick={handleNewChat}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-brandPurple-600 hover:opacity-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>New Chat</span>
            </button>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2 px-1">
                Chat History
              </span>
              <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                {sessions.map((s) => {
                  const isActive = s.id === activeSessionId;
                  return (
                    <div
                      key={s.id}
                      onClick={() => setActiveSessionId(s.id)}
                      className={`p-3 rounded-xl cursor-pointer text-xs transition-all flex items-center justify-between group ${
                        isActive
                          ? 'bg-blue-600/20 text-white border border-blue-500/40'
                          : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-transparent'
                      }`}
                    >
                      <div className="truncate pr-2 font-medium">
                        {s.title}
                      </div>
                      <button
                        onClick={(e) => handleDeleteSession(s.id, e)}
                        className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 p-1 transition-opacity"
                        title="Delete session"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI Capability Indicators */}
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 space-y-2">
              <div className="font-bold text-white flex items-center gap-1.5">
                <Languages className="w-3.5 h-3.5 text-cyan-400" /> Bilingual AI Features:
              </div>
              <ul className="space-y-1 text-[11px] text-slate-300">
                <li>• Telugu explanations (తెలుగు వివరణ)</li>
                <li>• Simple English simplification</li>
                <li>• Code dry-runs & complexity</li>
                <li>• Real-life analogies & formulas</li>
              </ul>
            </div>
          </div>

          {/* RIGHT: Active Chat Message Thread & Large Chat Input Box */}
          <div className="lg:col-span-3 p-6 sm:p-8 rounded-3xl bg-[#0F172A] border border-slate-700/80 shadow-2xl flex flex-col min-h-[640px]">
            
            {/* Chat Thread Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 p-0.5">
                  <div className="h-full w-full bg-navy-950 rounded-[14px] flex items-center justify-center">
                    <Bot className="w-5 h-5 text-cyan-400" />
                  </div>
                </div>
                <div>
                  <div className="font-bold text-sm text-white flex items-center gap-2">
                    <span>Problex AI Assistant</span>
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Tuned for {user?.course} • {user?.academicLevel}
                  </span>
                </div>
              </div>

              {/* Mode Toggles */}
              <div className="hidden sm:flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveMode('standard')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                    activeMode === 'standard' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Standard
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMode('telugu')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                    activeMode === 'telugu' ? 'bg-brandPurple-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  తెలుగు
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMode('simple')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                    activeMode === 'simple' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Simple English
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto py-6 space-y-6 max-h-[500px] pr-2">
              {activeSession.messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-2 mb-1 px-1">
                      <span className="text-[11px] font-bold text-slate-400">
                        {isUser ? user?.name || 'You' : 'Problex AI'}
                      </span>
                      <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
                    </div>

                    <div
                      className={`max-w-2xl rounded-2xl p-5 text-sm leading-relaxed ${
                        isUser
                          ? 'bg-blue-600 text-white rounded-tr-sm shadow-md shadow-blue-500/20'
                          : 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-tl-sm shadow-xl'
                      }`}
                    >
                      {/* Message Content */}
                      <div className="whitespace-pre-wrap">{msg.text}</div>

                      {/* AI Action Buttons */}
                      {!isUser && (
                        <div className="pt-4 mt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
                          <button
                            onClick={() => handleCopyResponse(msg.id, msg.text)}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-slate-300 flex items-center gap-1.5 transition-colors"
                          >
                            {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedId === msg.id ? "Copied" : "Copy Response"}</span>
                          </button>

                          <button
                            onClick={() => handleRequestVariation(msg.topic || msg.text, 'telugu')}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-brandPurple-300 flex items-center gap-1.5 transition-colors"
                          >
                            <Languages className="w-3 h-3" />
                            <span>తెలుగు వివరణ</span>
                          </button>

                          <button
                            onClick={() => handleRequestVariation(msg.topic || msg.text, 'simple')}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-cyan-300 flex items-center gap-1.5 transition-colors"
                          >
                            <Sparkles className="w-3 h-3" />
                            <span>Simple English</span>
                          </button>

                          <button
                            onClick={() => handleRequestVariation(msg.topic || msg.text, 'reallife')}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-amber-300 flex items-center gap-1.5 transition-colors"
                          >
                            <Lightbulb className="w-3 h-3" />
                            <span>Real-Life Example</span>
                          </button>

                          <button
                            onClick={() => handleDownloadResponsePdf(msg.topic, msg.text)}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-slate-300 flex items-center gap-1.5 transition-colors"
                          >
                            <Download className="w-3 h-3" />
                            <span>PDF</span>
                          </button>

                          <button
                            onClick={() => handleSaveToNotes(msg.topic, msg.text)}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-slate-300 flex items-center gap-1.5 transition-colors"
                          >
                            <Bookmark className="w-3 h-3" />
                            <span>Save</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Loading animation while generating answers */}
              {isGenerating && (
                <div className="flex flex-col items-start space-y-2 animate-in fade-in">
                  <div className="flex items-center gap-2 mb-1 px-1">
                    <span className="text-[11px] font-bold text-slate-400">Problex AI</span>
                    <span className="text-[10px] text-cyan-400">Thinking...</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 rounded-tl-sm flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-blue-500 animate-bounce"></span>
                      <span className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]"></span>
                      <span className="h-2 w-2 rounded-full bg-brandPurple-500 animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">
                      Generating structured academic explanation for {user?.course}...
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Prompt Suggestions */}
            <div className="pt-3 pb-2 border-t border-slate-800/80">
              <span className="text-[11px] font-bold text-slate-400 mb-1.5 block">
                Quick Prompts for {user?.course}:
              </span>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {promptSuggestions.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(p)}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-white shrink-0 transition-colors"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Large Chat Input Box & Send Button */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="pt-2 flex items-center gap-3"
            >
              <div className="relative flex-1">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Ask any academic question, coding problem, or Telugu explanation (${user?.course})...`}
                  disabled={isGenerating}
                  className="w-full py-4 pl-5 pr-12 rounded-2xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 shadow-inner transition-all disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={!inputText.trim() || isGenerating}
                className={`p-4 rounded-2xl text-white font-bold transition-all shadow-lg flex items-center justify-center shrink-0 ${
                  !inputText.trim() || isGenerating
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:opacity-95 shadow-cyan-500/25'
                }`}
                title="Send Question"
              >
                {isGenerating ? (
                  <RefreshCw className="w-5 h-5 animate-spin text-cyan-300" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </form>

          </div>

        </div>

      </div>
    </div>
  );
};
