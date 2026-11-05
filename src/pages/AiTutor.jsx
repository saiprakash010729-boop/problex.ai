import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  User, 
  Send, 
  Languages, 
  Sparkles, 
  Plus, 
  Trash2, 
  Volume2, 
  Copy, 
  Check, 
  Bookmark, 
  Code, 
  Award, 
  HelpCircle, 
  RefreshCw,
  Search,
  BookOpen,
  ArrowRight,
  ChevronDown,
  GraduationCap
} from 'lucide-react';
import { AI_PRESET_PROMPTS } from '../data/mockData';
import { CodeBlock } from '../components/CodeBlock';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { downloadPdfDocument } from '../utils/pdfGenerator';

export const AiTutor = () => {
  const { addSavedNote, language, setLanguage, user } = useApp();
  
  // Format selector: 'standard' | '2mark' | '4mark' | '8mark' | 'code' | 'simple'
  const [formatMode, setFormatMode] = useState('standard');
  const [level, setLevel] = useState('exam'); // 'beginner' | 'exam' | 'indepth'
  
  // Chat sessions state
  const [sessions, setSessions] = useState([
    {
      id: 'session-1',
      title: 'Binary Search Algorithm & Time Complexity',
      category: 'B.Tech Engineering',
      date: 'Today',
      messages: [
        {
          id: 'm1',
          sender: 'user',
          text: 'Explain Binary Search with time complexity and an example in Telugu and English.',
          timestamp: '10:14 AM'
        },
        {
          id: 'm2',
          sender: 'ai',
          promptData: AI_PRESET_PROMPTS[0],
          timestamp: '10:14 AM'
        }
      ]
    },
    {
      id: 'session-2',
      title: 'Indian Constitution: Fundamental Rights',
      category: 'Government Exams',
      date: 'Today',
      messages: [
        {
          id: 'm3',
          sender: 'user',
          text: 'Explain the Fundamental Rights of Indian Constitution for competitive exams in Telugu and English.',
          timestamp: '09:30 AM'
        },
        {
          id: 'm4',
          sender: 'ai',
          promptData: AI_PRESET_PROMPTS[1],
          timestamp: '09:30 AM'
        }
      ]
    },
    {
      id: 'session-3',
      title: 'Python Lists vs Tuples',
      category: 'Coding & Tech',
      date: 'Yesterday',
      messages: [
        {
          id: 'm5',
          sender: 'user',
          text: 'What is the difference between Lists and Tuples in Python? Explain with Telugu & English examples.',
          timestamp: 'Yesterday'
        },
        {
          id: 'm6',
          sender: 'ai',
          promptData: AI_PRESET_PROMPTS[2],
          timestamp: 'Yesterday'
        }
      ]
    }
  ]);

  const [activeSessionId, setActiveSessionId] = useState('session-1');
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [speakingId, setSpeakingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const messagesEndRef = useRef(null);

  const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeSession.messages, isTyping]);

  const handleNewChat = () => {
    const newSession = {
      id: `session-${Date.now()}`,
      title: 'New AI Conversation',
      category: 'General Academic',
      date: 'Just now',
      messages: []
    };
    setSessions([newSession, ...sessions]);
    setActiveSessionId(newSession.id);
  };

  const handleDeleteSession = (id, e) => {
    e.stopPropagation();
    if (sessions.length === 1) {
      alert("At least one chat session must remain active.");
      return;
    }
    const filtered = sessions.filter(s => s.id !== id);
    setSessions(filtered);
    if (activeSessionId === id) {
      setActiveSessionId(filtered[0].id);
    }
  };

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Update active session with user message
    const updatedSessions = sessions.map(s => {
      if (s.id === activeSessionId) {
        return {
          ...s,
          title: s.messages.length === 0 ? query.substring(0, 36) : s.title,
          messages: [...s.messages, userMessage]
        };
      }
      return s;
    });

    setSessions(updatedSessions);
    setInputText('');
    setIsTyping(true);

    try {
      const res = await api.askAi({
        question: query,
        course: user?.course || 'B.Tech',
        academicLevel: user?.academicLevel || '3rd Year',
        language: language,
        mode: formatMode
      });

      const matched = AI_PRESET_PROMPTS.find(p => 
        p.keywords.some(k => query.toLowerCase().includes(k))
      ) || AI_PRESET_PROMPTS[0];

      const aiMessage = {
        id: `ai-msg-${Date.now()}`,
        sender: 'ai',
        promptData: {
          id: `ai-dyn-${Date.now()}`,
          category: user?.course || 'Engineering',
          keywords: [query.toLowerCase()],
          question: query,
          response: {
            title: res.title || matched.response.title || query,
            telugu: res.teluguExplanation || matched.response.telugu,
            english: res.englishExplanation || res.fullResponse || matched.response.english,
            code: res.formulasOrCode ? {
              language: "cpp",
              snippet: res.formulasOrCode,
              dryRunExplanation: res.realLifeExample || matched.response.code?.dryRunExplanation || "Dry run analysis verified."
            } : matched.response.code,
            realLifeAnalogy: res.realLifeExample || matched.response.realLifeAnalogy,
            examAnswers: matched.response.examAnswers || {
              mark2: res.englishExplanation ? res.englishExplanation.substring(0, 160) + "..." : "Concise university definition.",
              mark4: res.englishExplanation || "Point-by-point exam explanation.",
              mark8: res.fullResponse || "Full 8-mark structured university answer."
            }
          }
        },
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
      console.error("AI chat error:", err);
    } finally {
      setIsTyping(false);
    }
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (id, text) => {
    if ('speechSynthesis' in window) {
      if (speakingId === id) {
        window.speechSynthesis.cancel();
        setSpeakingId(null);
        return;
      }
      setSpeakingId(id);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setSpeakingId(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  const promptSuggestions = [
    "Explain Binary Search in Telugu & English",
    "Fundamental Rights (Art 12 to 35) 8-Mark Answer",
    "Difference between Python List and Tuple",
    "Second Law of Thermodynamics with Kelvin-Planck Statement",
    "How does QuickSort work with dry-run?",
    "Time & Work shortcuts for SSC CGL"
  ];

  return (
    <div className="flex h-[calc(100vh-80px)] bg-[#F8FAFC] overflow-hidden">
      
      {/* LEFT CHAT HISTORY SIDEBAR */}
      <aside className={`
        fixed inset-y-20 left-0 z-30 w-72 bg-navy-950 text-slate-300 border-r border-slate-800 flex flex-col transition-transform duration-300 lg:static lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Top New Chat Button */}
        <div className="p-4 border-b border-slate-800/80 space-y-3">
          <button
            onClick={handleNewChat}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-brandPurple-600 hover:from-blue-500 hover:to-brandPurple-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Chat Session</span>
          </button>

          {/* Search chat */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chat history..."
              className="w-full bg-navy-900 text-xs text-white placeholder-slate-500 pl-8 pr-3 py-2 rounded-lg border border-slate-800 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Sessions list */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Recent Conversations
          </div>

          {sessions
            .filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((s) => (
              <div
                key={s.id}
                onClick={() => {
                  setActiveSessionId(s.id);
                  setSidebarOpen(false);
                }}
                className={`group flex items-center justify-between p-2.5 rounded-xl text-xs font-medium cursor-pointer transition-all ${
                  activeSessionId === s.id
                    ? 'bg-blue-600/20 text-cyan-300 border border-blue-500/30'
                    : 'text-slate-400 hover:bg-navy-900 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <Bot className={`w-3.5 h-3.5 shrink-0 ${activeSessionId === s.id ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <span className="truncate">{s.title}</span>
                </div>
                <button
                  onClick={(e) => handleDeleteSession(s.id, e)}
                  className="opacity-0 group-hover:opacity-100 hover:text-rose-400 p-1 transition-opacity"
                  title="Delete chat"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
        </div>

        {/* Sidebar Footer Info */}
        <div className="p-3 bg-navy-900 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>AI Tutor Engine: v2.4</span>
          <span className="text-cyan-400 font-semibold">Dual Language</span>
        </div>
      </aside>

      {/* MAIN CHAT INTERFACE */}
      <main className="flex-1 flex flex-col h-full bg-[#F8FAFC] relative overflow-hidden">
        
        {/* Top Control Header */}
        <div className="h-16 px-4 sm:px-6 bg-white border-b border-slate-200 flex items-center justify-between z-10 shrink-0">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <Bot className="w-5 h-5 text-blue-600" />
            </button>
            <div>
              <h2 className="text-sm sm:text-base font-display font-bold text-navy-900 truncate max-w-[200px] sm:max-w-md">
                {activeSession.title}
              </h2>
              <span className="text-[11px] text-slate-500 hidden sm:inline">
                Academic AI Tutor • Telugu & English Native Support
              </span>
            </div>
          </div>

          {/* Quick Format & Language Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Format Selector */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <span className="text-[10px] uppercase font-bold text-slate-400 px-2 hidden md:inline">
                Format:
              </span>
              <button
                onClick={() => setFormatMode('standard')}
                className={`px-2 py-1 rounded-lg ${formatMode === 'standard' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'}`}
              >
                Standard
              </button>
              <button
                onClick={() => setFormatMode('2mark')}
                className={`px-2 py-1 rounded-lg ${formatMode === '2mark' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'}`}
                title="2-Mark concise university answer"
              >
                2M
              </button>
              <button
                onClick={() => setFormatMode('4mark')}
                className={`px-2 py-1 rounded-lg ${formatMode === '4mark' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'}`}
                title="4-Mark structured answer"
              >
                4M
              </button>
              <button
                onClick={() => setFormatMode('8mark')}
                className={`px-2 py-1 rounded-lg ${formatMode === '8mark' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'}`}
                title="8-Mark comprehensive answer"
              >
                8M
              </button>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setLanguage('both')}
                className={`px-2 py-1 rounded-lg ${language === 'both' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600'}`}
              >
                Both
              </button>
              <button
                onClick={() => setLanguage('telugu')}
                className={`px-2 py-1 rounded-lg ${language === 'telugu' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600'}`}
              >
                తెలుగు
              </button>
              <button
                onClick={() => setLanguage('english')}
                className={`px-2 py-1 rounded-lg ${language === 'english' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600'}`}
              >
                English
              </button>
            </div>

          </div>

        </div>

        {/* CHAT MESSAGES SCROLL AREA */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          
          {/* Welcome Card if chat empty */}
          {activeSession.messages.length === 0 && (
            <div className="max-w-2xl mx-auto py-12 text-center space-y-6">
              <div className="h-16 w-16 mx-auto rounded-3xl bg-gradient-to-tr from-blue-600 to-brandPurple-600 text-white flex items-center justify-center shadow-xl shadow-blue-500/20">
                <Bot className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-extrabold text-navy-900">
                  Problex AI Tutor Ready
                </h3>
                <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
                  Ask any engineering topic, coding problem, or government exam question. I will explain it with clarity in Telugu and English.
                </p>
              </div>

              {/* Prompt Suggestions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                {promptSuggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(suggestion)}
                    className="p-3.5 rounded-xl bg-white border border-slate-200/90 hover:border-blue-500 hover:shadow-md text-xs font-medium text-slate-700 transition-all flex items-center justify-between group"
                  >
                    <span>{suggestion}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages Feed */}
          {activeSession.messages.map((msg) => (
            <div key={msg.id} className="max-w-4xl mx-auto">
              
              {/* User Message */}
              {msg.sender === 'user' ? (
                <div className="flex items-start gap-3 justify-end">
                  <div className="bg-navy-900 text-white px-5 py-3.5 rounded-2xl rounded-tr-sm max-w-xl text-sm leading-relaxed shadow-sm">
                    <p>{msg.text}</p>
                    <span className="text-[10px] text-slate-400 block text-right mt-1">
                      {msg.timestamp}
                    </span>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 text-xs font-bold">
                    <User className="w-4 h-4" />
                  </div>
                </div>
              ) : (
                /* AI Response Message */
                <div className="flex items-start gap-3 justify-start">
                  <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-navy-950 flex items-center justify-center shrink-0 font-bold shadow-md shadow-blue-500/10">
                    <Bot className="w-5 h-5 text-white" />
                  </div>

                  <div className="flex-1 bg-white border border-slate-200/90 rounded-2xl rounded-tl-sm p-5 sm:p-6 text-sm text-slate-800 shadow-sm space-y-4">
                    
                    {/* Header bar of response */}
                    <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-100 gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-navy-900 text-base">
                          {msg.promptData.response.title}
                        </span>
                        <span className="text-[10px] font-bold uppercase bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md">
                          {msg.promptData.category}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 font-mono">
                        {msg.timestamp}
                      </span>
                    </div>

                    {/* Mode content rendering */}
                    {formatMode === '2mark' && msg.promptData.response.examAnswers ? (
                      <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-950 text-sm space-y-2">
                        <span className="font-bold text-xs uppercase tracking-wider text-amber-800 block">
                          2-Mark Concise University Pattern:
                        </span>
                        <p>{msg.promptData.response.examAnswers.mark2}</p>
                      </div>
                    ) : formatMode === '4mark' && msg.promptData.response.examAnswers ? (
                      <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 text-indigo-950 text-sm space-y-2">
                        <span className="font-bold text-xs uppercase tracking-wider text-indigo-800 block">
                          4-Mark Structured Points:
                        </span>
                        <div className="whitespace-pre-line leading-relaxed">
                          {msg.promptData.response.examAnswers.mark4}
                        </div>
                      </div>
                    ) : formatMode === '8mark' && msg.promptData.response.examAnswers ? (
                      <div className="p-4 rounded-xl bg-slate-900 text-slate-100 border border-slate-800 text-xs sm:text-sm space-y-2">
                        <div className="flex items-center justify-between text-cyan-400 font-bold pb-2 border-b border-slate-800">
                          <span>8-Mark Comprehensive University Answer</span>
                          <span className="text-[10px] bg-cyan-500/20 px-2 py-0.5 rounded">JNTU / OU Format</span>
                        </div>
                        <div className="whitespace-pre-line font-mono text-slate-300 leading-relaxed">
                          {msg.promptData.response.examAnswers.mark8}
                        </div>
                      </div>
                    ) : (
                      /* Standard Multi-section mode */
                      <div className="space-y-4">
                        
                        {/* Telugu Section */}
                        {(language === 'both' || language === 'telugu') && (
                          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 text-slate-800 space-y-2">
                            <div className="flex items-center gap-2 text-blue-700 text-xs font-bold">
                              <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                              <span>తెలుగులో సమగ్ర వివరణ (Telugu Conceptual Breakdown):</span>
                            </div>
                            <div className="whitespace-pre-line text-xs sm:text-sm leading-relaxed font-sans text-slate-700">
                              {msg.promptData.response.telugu}
                            </div>
                          </div>
                        )}

                        {/* English Section */}
                        {(language === 'both' || language === 'english') && (
                          <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-100 text-slate-800 space-y-2">
                            <div className="flex items-center gap-2 text-brandPurple-700 text-xs font-bold">
                              <span className="h-2 w-2 rounded-full bg-brandPurple-600"></span>
                              <span>English Academic Breakdown:</span>
                            </div>
                            <div className="whitespace-pre-line text-xs sm:text-sm leading-relaxed font-sans text-slate-700">
                              {msg.promptData.response.english}
                            </div>
                          </div>
                        )}

                        {/* Code Block if any */}
                        {msg.promptData.response.code && (
                          <div>
                            <CodeBlock code={msg.promptData.response.code} language="cpp" filename="AlgorithmExample.cpp" />
                          </div>
                        )}

                      </div>
                    )}

                    {/* Bottom Action bar */}
                    <div className="flex flex-wrap items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500 gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSpeak(msg.id, msg.promptData.response.telugu)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                            speakingId === msg.id ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>{speakingId === msg.id ? 'Playing Voice...' : 'Listen Audio'}</span>
                        </button>

                        <button
                          onClick={() => handleCopy(msg.id, `${msg.promptData.response.title}\n\n${msg.promptData.response.telugu}\n\n${msg.promptData.response.english}`)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 transition-all"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-600 font-bold">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Answer</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => addSavedNote({
                            title: msg.promptData.response.title,
                            category: msg.promptData.category,
                            language: language,
                            summary: msg.promptData.question,
                            content: `${msg.promptData.response.telugu}\n\n${msg.promptData.response.english}`
                          })}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-blue-600 transition-all"
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                          <span>Save to Notes</span>
                        </button>
                      </div>

                      <span className="text-[11px] text-slate-400 italic">
                        Verified by Problex Academic Model
                      </span>
                    </div>

                  </div>
                </div>
              )}

            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="max-w-4xl mx-auto flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl px-5 py-3 text-xs text-slate-500 flex items-center gap-2 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-blue-600 animate-bounce"></span>
                <span className="h-2 w-2 rounded-full bg-purple-600 animate-bounce [animation-delay:0.2s]"></span>
                <span className="h-2 w-2 rounded-full bg-cyan-600 animate-bounce [animation-delay:0.4s]"></span>
                <span className="font-mono text-slate-600">
                  Analyzing query and crafting Telugu + English answer...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* BOTTOM MESSAGE INPUT BAR */}
        <div className="p-4 sm:p-5 bg-white border-t border-slate-200 shrink-0">
          <div className="max-w-4xl mx-auto space-y-2">
            
            {/* Quick chips */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
                Quick Prompts:
              </span>
              {promptSuggestions.slice(0, 4).map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(p)}
                  className="px-2.5 py-1 rounded-full text-xs bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 shrink-0 transition-colors border border-slate-200/80"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="relative flex items-center"
            >
              <textarea
                rows={1}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ask any question in Telugu or English (e.g. 'Binary search algorithm', 'Thermodynamics 8M answer')..."
                className="w-full bg-[#F8FAFC] text-slate-800 placeholder-slate-400 text-sm pl-4 pr-24 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all resize-none shadow-inner"
              />

              <button
                type="submit"
                disabled={!inputText.trim()}
                className="absolute right-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-brandPurple-600 hover:from-blue-700 hover:to-brandPurple-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md shadow-blue-500/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <span>Ask AI</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
              <span>Press Enter to send • Shift + Enter for new line</span>
              <span>Available in Telugu • English • Bilingual</span>
            </div>

          </div>
        </div>

      </main>

    </div>
  );
};
