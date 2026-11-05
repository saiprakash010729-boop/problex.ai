import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Volume2, 
  Copy, 
  Check, 
  ArrowUpRight, 
  Languages, 
  Code2, 
  BookOpen,
  Bookmark
} from 'lucide-react';
import { AI_PRESET_PROMPTS } from '../data/mockData';
import { CodeBlock } from './CodeBlock';
import { useApp } from '../context/AppContext';

export const InteractiveHeroTutor = () => {
  const { addSavedNote } = useApp();
  const [selectedPromptIndex, setSelectedPromptIndex] = useState(0);
  const [activeLang, setActiveLang] = useState('both'); // 'both' | 'telugu' | 'english'
  const [activeFormat, setActiveFormat] = useState('both'); // 'both' | '8mark' | 'code'
  const [copied, setCopied] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const currentPrompt = AI_PRESET_PROMPTS[selectedPromptIndex];

  const handleSelectPrompt = (index) => {
    setIsLoading(true);
    setSelectedPromptIndex(index);
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // cycle or match
      setSelectedPromptIndex((prev) => (prev + 1) % AI_PRESET_PROMPTS.length);
      setCustomInput('');
    }, 600);
  };

  const handleCopy = () => {
    const textToCopy = `${currentPrompt.response.title}\n\n${currentPrompt.response.telugu}\n\n${currentPrompt.response.english}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      if (speaking) {
        window.speechSynthesis.cancel();
        setSpeaking(false);
        return;
      }
      setSpeaking(true);
      const text = activeLang === 'telugu' 
        ? "బైనరీ సెర్చ్ అనేది ఒక క్రమబద్ధీకరించబడిన జాబితాలో ఎలిమెంట్ కనుగొనే వేగవంతమైన అల్గారిథమ్." 
        : `Binary Search is an efficient divide and conquer search algorithm with O(log n) time complexity.`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech audio demo activated for this explanation!");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl bg-navy-950/95 border border-slate-700/60 shadow-2xl overflow-hidden backdrop-blur-2xl text-slate-100">
      
      {/* Top Bar with AI Status */}
      <div className="flex flex-wrap items-center justify-between px-5 py-3.5 bg-navy-900/90 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose-500/80"></span>
            <span className="h-3 w-3 rounded-full bg-amber-500/80"></span>
            <span className="h-3 w-3 rounded-full bg-emerald-500/80"></span>
          </div>
          <div className="h-4 w-px bg-slate-800"></div>
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-blue-600/30 text-cyan-400 flex items-center justify-center font-bold">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-slate-200">
              Problex AI Tutor 2.0 (Dual Telugu + English Engine)
            </span>
          </div>
        </div>

        {/* Live Language Selector Pills */}
        <div className="flex items-center gap-1.5 bg-navy-950 p-1 rounded-xl border border-slate-800 my-1">
          <span className="text-[11px] text-slate-400 px-2 font-medium hidden sm:inline">
            <Languages className="w-3 h-3 inline mr-1" /> Language:
          </span>
          <button
            onClick={() => setActiveLang('both')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeLang === 'both' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Both
          </button>
          <button
            onClick={() => setActiveLang('telugu')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeLang === 'telugu' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            తెలుగు
          </button>
          <button
            onClick={() => setActiveLang('english')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeLang === 'english' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            English
          </button>
        </div>
      </div>

      {/* Preset Prompt Pills */}
      <div className="px-5 py-3 bg-navy-900/40 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold shrink-0">
          Try Live Prompts:
        </span>
        {AI_PRESET_PROMPTS.map((prompt, idx) => (
          <button
            key={prompt.title}
            onClick={() => handleSelectPrompt(idx)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 transition-all ${
              selectedPromptIndex === idx
                ? 'bg-blue-600/30 text-cyan-300 border border-cyan-400/50 shadow-glow-sm'
                : 'bg-navy-900/90 text-slate-400 border border-slate-800 hover:bg-slate-800/80 hover:text-slate-200'
            }`}
          >
            {prompt.title}
          </button>
        ))}
      </div>

      {/* Main Interactive Chat Window */}
      <div className="p-5 sm:p-6 space-y-5 max-h-[440px] overflow-y-auto">
        
        {/* User Question Bubble */}
        <div className="flex items-start gap-3 justify-end">
          <div className="bg-gradient-to-r from-blue-600 to-brandPurple-600 text-white px-4 py-3 rounded-2xl rounded-tr-sm max-w-lg shadow-md text-sm leading-relaxed">
            <p className="font-medium">{currentPrompt.question}</p>
            <div className="flex items-center gap-2 mt-2 text-[11px] text-blue-100">
              <span className="px-1.5 py-0.5 rounded bg-white/20 font-bold">
                {currentPrompt.category}
              </span>
              <span>• Target: Telugu & English Explanation</span>
            </div>
          </div>
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center shrink-0 text-white font-bold text-xs shadow-sm">
            <User className="w-4 h-4" />
          </div>
        </div>

        {/* AI Tutor Response Bubble */}
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center shrink-0 text-navy-950 font-black shadow-md shadow-cyan-500/20">
            <Bot className="w-5 h-5 text-navy-950" />
          </div>

          <div className="flex-1 bg-navy-900/90 border border-slate-800 rounded-2xl rounded-tl-sm p-5 text-sm space-y-4 shadow-xl">
            {isLoading ? (
              <div className="py-8 flex flex-col items-center justify-center gap-3 text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce"></span>
                  <span className="h-2 w-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="h-2 w-2 rounded-full bg-purple-500 animate-bounce [animation-delay:0.4s]"></span>
                </div>
                <span className="text-xs font-mono">Generating bilingual response in Telugu & English...</span>
              </div>
            ) : (
              <>
                {/* Title & Format Controls */}
                <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-800/80 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-400/20 text-xs font-bold">
                      {currentPrompt.response.title}
                    </span>
                  </div>

                  {/* Format Pills */}
                  <div className="flex items-center gap-1 text-[11px] bg-navy-950 p-0.5 rounded-lg border border-slate-800">
                    <button
                      onClick={() => setActiveFormat('both')}
                      className={`px-2 py-0.5 rounded ${activeFormat === 'both' ? 'bg-slate-800 text-white' : 'text-slate-400'}`}
                    >
                      Full Solution
                    </button>
                    <button
                      onClick={() => setActiveFormat('8mark')}
                      className={`px-2 py-0.5 rounded ${activeFormat === '8mark' ? 'bg-slate-800 text-cyan-300' : 'text-slate-400'}`}
                    >
                      8-Mark Format
                    </button>
                    {currentPrompt.response.code && (
                      <button
                        onClick={() => setActiveFormat('code')}
                        className={`px-2 py-0.5 rounded ${activeFormat === 'code' ? 'bg-slate-800 text-emerald-300' : 'text-slate-400'}`}
                      >
                        Code Snippet
                      </button>
                    )}
                  </div>
                </div>

                {/* Content based on format & language */}
                {activeFormat === '8mark' ? (
                  <div className="bg-navy-950 p-4 rounded-xl border border-amber-500/20 text-slate-200 font-sans text-xs leading-relaxed space-y-2">
                    <div className="flex items-center justify-between text-amber-400 text-xs font-bold pb-2 border-b border-slate-800">
                      <span>🏛️ University Exam Pattern (JNTU / OU / AU 8-Mark Model)</span>
                      <span className="text-[10px] bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                        Exam Answer Key
                      </span>
                    </div>
                    <div className="whitespace-pre-line font-mono text-slate-300 text-xs">
                      {currentPrompt.response.examAnswers.mark8}
                    </div>
                  </div>
                ) : activeFormat === 'code' && currentPrompt.response.code ? (
                  <div>
                    <p className="text-xs text-slate-400 mb-1">
                      Ready-to-run implementation with optimal time complexity:
                    </p>
                    <CodeBlock code={currentPrompt.response.code} language="cpp" filename="OptimalImplementation.cpp" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Telugu Section */}
                    {(activeLang === 'both' || activeLang === 'telugu') && (
                      <div className="bg-navy-950/70 p-4 rounded-xl border border-blue-500/20 space-y-2">
                        <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">
                          <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
                          <span>తెలుగులో సులభమైన వివరణ (Telugu Conceptual Breakdown):</span>
                        </div>
                        <div className="text-slate-300 text-xs sm:text-sm whitespace-pre-line leading-relaxed font-sans">
                          {currentPrompt.response.telugu}
                        </div>
                      </div>
                    )}

                    {/* English Section */}
                    {(activeLang === 'both' || activeLang === 'english') && (
                      <div className="bg-navy-950/70 p-4 rounded-xl border border-purple-500/20 space-y-2">
                        <div className="flex items-center gap-2 text-brandPurple-400 text-xs font-bold">
                          <span className="h-2 w-2 rounded-full bg-brandPurple-400"></span>
                          <span>English Academic & Exam Preparation Note:</span>
                        </div>
                        <div className="text-slate-300 text-xs sm:text-sm whitespace-pre-line leading-relaxed font-sans">
                          {currentPrompt.response.english}
                        </div>
                      </div>
                    )}

                    {/* Code block preview if available and in 'both' mode */}
                    {currentPrompt.response.code && activeLang === 'both' && (
                      <div className="mt-2">
                        <CodeBlock code={currentPrompt.response.code} language="cpp" filename="Solution.cpp" />
                      </div>
                    )}
                  </div>
                )}

                {/* Bottom Action Bar */}
                <div className="flex flex-wrap items-center justify-between pt-3 border-t border-slate-800 text-xs text-slate-400 gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSpeak}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700/80 transition-all ${
                        speaking ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400' : 'hover:bg-slate-800 hover:text-white'
                      }`}
                      title="Audio Pronunciation / Voice Explainer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{speaking ? 'Playing Audio...' : 'Listen Audio'}</span>
                    </button>

                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700/80 hover:bg-slate-800 hover:text-white transition-all"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>

                    <button
                      onClick={() => addSavedNote({
                        title: currentPrompt.title,
                        category: currentPrompt.category,
                        language: activeLang,
                        summary: currentPrompt.question,
                        content: `${currentPrompt.response.telugu}\n\n${currentPrompt.response.english}`
                      })}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700/80 hover:bg-slate-800 hover:text-cyan-300 transition-all"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>Save Note</span>
                    </button>
                  </div>

                  <Link
                    to="/ai-tutor"
                    className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold group ml-auto"
                  >
                    <span>Open in Full AI Tutor Workspace</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

      </div>

      {/* Bottom Mock Input Bar */}
      <div className="p-4 bg-navy-900 border-t border-slate-800">
        <form onSubmit={handleCustomSubmit} className="relative flex items-center">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Ask anything in Telugu or English (e.g. 'Explain QuickSort', 'Article 21 details')..."
            className="w-full bg-navy-950 text-white placeholder-slate-500 text-xs sm:text-sm pl-4 pr-24 py-3 rounded-xl border border-slate-700/80 focus:outline-none focus:border-cyan-400 transition-all"
          />
          <button
            type="submit"
            className="absolute right-1.5 px-4 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-navy-950 font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-md transition-all"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

    </div>
  );
};
