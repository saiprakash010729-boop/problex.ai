import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  Bookmark, 
  Play, 
  RotateCw, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2,
  FileText,
  UploadCloud,
  Terminal,
  Calendar,
  Layers,
  HelpCircle,
  Code
} from 'lucide-react';
import { MOCK_QUIZ_QUESTIONS, MOCK_FLASHCARDS } from '../data/mockData';
import { CodeBlock } from './CodeBlock';
import { useApp } from '../context/AppContext';

export const ToolModal = ({ tool, isOpen, onClose }) => {
  const { addSavedNote, language } = useApp();
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('input'); // 'input' | 'output'

  // Tool specific state
  const [doubtText, setDoubtText] = useState("What is the difference between Synchronous and Asynchronous transmission in Computer Networks?");
  const [notesTopic, setNotesTopic] = useState("Operating Systems - Process Scheduling Algorithms (FCFS, SJF, Round Robin)");
  const [codeSnippet, setCodeSnippet] = useState(`def find_max(numbers):\n    max_val = numbers[0]\n    for num in numbers:\n        if num > max_val:\n            max_val = num\n    return max_val\n\nprint(find_max([12, 45, 2, 99, 34]))`);
  
  // Quiz tool state
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Flashcards state
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!isOpen || !tool) return null;

  const handleRunTool = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setActiveTab('output');
    }, 700);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className={`p-6 bg-gradient-to-r ${tool.color} text-white flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-white shadow-inner">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-extrabold tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                  {tool.category}
                </span>
                <span className="text-xs bg-black/20 px-2 py-0.5 rounded-full">
                  Telugu + English Enabled
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-bold mt-1">
                {tool.name}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          
          {/* Tool Description */}
          <div className="mb-6 p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-start gap-3">
            <div className="h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              i
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {tool.description}
            </p>
          </div>

          {/* Conditional Workspace according to tool ID */}
          {tool.id === 'quiz-generator' ? (
            /* Interactive Quiz Workspace */
            <div className="space-y-6">
              {!quizFinished ? (
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                    <span>Question {currentQuizIndex + 1} of {MOCK_QUIZ_QUESTIONS.length}</span>
                    <span className="text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                      Subject: {MOCK_QUIZ_QUESTIONS[currentQuizIndex].subject}
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-6">
                    <div 
                      className="h-full bg-blue-600 transition-all duration-300"
                      style={{ width: `${((currentQuizIndex + 1) / MOCK_QUIZ_QUESTIONS.length) * 100}%` }}
                    ></div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-navy-900 mb-4">
                    {MOCK_QUIZ_QUESTIONS[currentQuizIndex].question}
                  </h3>

                  <div className="space-y-3 mb-6">
                    {MOCK_QUIZ_QUESTIONS[currentQuizIndex].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedOption(idx)}
                        className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all flex items-center justify-between ${
                          selectedOption === idx
                            ? 'border-blue-600 bg-blue-50/60 text-blue-900 shadow-sm ring-1 ring-blue-600'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            selectedOption === idx ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{option}</span>
                        </div>
                        {selectedOption === idx && <CheckCircle2 className="w-5 h-5 text-blue-600" />}
                      </button>
                    ))}
                  </div>

                  {selectedOption !== null && (
                    <div className="p-4 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm space-y-2 mb-6">
                      <div className="flex items-center gap-2 font-bold text-cyan-400">
                        <span>Solution Explanation (తెలుగు & English):</span>
                      </div>
                      <p className="text-cyan-200/90">
                        {MOCK_QUIZ_QUESTIONS[currentQuizIndex].explanationTelugu}
                      </p>
                      <p className="text-slate-300 pt-1 border-t border-slate-800">
                        {MOCK_QUIZ_QUESTIONS[currentQuizIndex].explanationEnglish}
                      </p>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      disabled={selectedOption === null}
                      onClick={() => {
                        if (selectedOption === MOCK_QUIZ_QUESTIONS[currentQuizIndex].correctAnswer) {
                          setQuizScore(prev => prev + 1);
                        }
                        if (currentQuizIndex + 1 < MOCK_QUIZ_QUESTIONS.length) {
                          setCurrentQuizIndex(prev => prev + 1);
                          setSelectedOption(null);
                        } else {
                          setQuizFinished(true);
                        }
                      }}
                      className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <span>{currentQuizIndex + 1 === MOCK_QUIZ_QUESTIONS.length ? 'Finish Quiz' : 'Next Question'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <div className="h-16 w-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-2xl">
                    🎉
                  </div>
                  <h3 className="text-2xl font-bold text-navy-900">Quiz Completed!</h3>
                  <p className="text-slate-600 text-sm">
                    You scored <strong className="text-blue-600 text-base">{quizScore} / {MOCK_QUIZ_QUESTIONS.length}</strong> ({(quizScore / MOCK_QUIZ_QUESTIONS.length) * 100}%)
                  </p>
                  <button
                    onClick={() => {
                      setCurrentQuizIndex(0);
                      setSelectedOption(null);
                      setQuizScore(0);
                      setQuizFinished(false);
                    }}
                    className="px-5 py-2.5 rounded-xl text-sm font-bold bg-blue-600 text-white shadow-md"
                  >
                    Retake Quiz
                  </button>
                </div>
              )}
            </div>
          ) : tool.id === 'flashcards' ? (
            /* Interactive Flashcard Workspace */
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>Card {cardIndex + 1} of {MOCK_FLASHCARDS.length}</span>
                <span className="text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                  {MOCK_FLASHCARDS[cardIndex].category}
                </span>
              </div>

              {/* 3D Flip Flashcard */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="cursor-pointer min-h-[220px] p-8 rounded-3xl bg-gradient-to-tr from-navy-950 to-navy-900 text-white shadow-xl flex flex-col justify-between border border-slate-700/80 transition-all transform hover:scale-[1.01]"
              >
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="uppercase tracking-wider font-semibold">
                    {isFlipped ? 'Answer (సమాధానం)' : 'Question (ప్రశ్న)'}
                  </span>
                  <span className="flex items-center gap-1 text-cyan-400">
                    <RotateCw className="w-3.5 h-3.5" /> Click anywhere to flip
                  </span>
                </div>

                <div className="py-6 text-center">
                  {!isFlipped ? (
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                      {MOCK_FLASHCARDS[cardIndex].front}
                    </h3>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-base sm:text-lg font-medium text-slate-100">
                        {MOCK_FLASHCARDS[cardIndex].back}
                      </p>
                      <p className="text-sm text-cyan-300 font-sans border-t border-slate-800 pt-3">
                        {MOCK_FLASHCARDS[cardIndex].backTelugu}
                      </p>
                    </div>
                  )}
                </div>

                <div className="text-center text-[11px] text-slate-500">
                  Tap spacebar or click to reveal answer
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <button
                  disabled={cardIndex === 0}
                  onClick={() => {
                    setCardIndex(prev => Math.max(0, prev - 1));
                    setIsFlipped(false);
                  }}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs disabled:opacity-40 flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Previous
                </button>
                <button
                  disabled={cardIndex === MOCK_FLASHCARDS.length - 1}
                  onClick={() => {
                    setCardIndex(prev => Math.min(MOCK_FLASHCARDS.length - 1, prev + 1));
                    setIsFlipped(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs disabled:opacity-40 flex items-center gap-1.5"
                >
                  Next Card <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            /* General Tool Generator (Notes, Doubt, PDF, Exam, Code, Planner) */
            <div className="space-y-5">
              
              {/* Input Area */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Enter Subject / Topic / Question:
                </label>
                <textarea
                  rows={4}
                  value={
                    tool.id === 'doubt-solver' ? doubtText :
                    tool.id === 'code-explainer' || tool.id === 'programming-tutor' ? codeSnippet :
                    notesTopic
                  }
                  onChange={(e) => {
                    if (tool.id === 'doubt-solver') setDoubtText(e.target.value);
                    else if (tool.id === 'code-explainer' || tool.id === 'programming-tutor') setCodeSnippet(e.target.value);
                    else setNotesTopic(e.target.value);
                  }}
                  className="w-full p-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-sans"
                  placeholder="Type or paste your topic here..."
                ></textarea>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <span>Output Language:</span>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-bold">
                    Telugu + English
                  </span>
                </div>

                <button
                  onClick={handleRunTool}
                  disabled={isProcessing}
                  className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-blue-600 to-brandPurple-600 hover:opacity-95 shadow-md flex items-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <RotateCw className="w-4 h-4 animate-spin" />
                      <span>Generating with AI...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Generate {tool.name}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Generated Output Preview */}
              {activeTab === 'output' && (
                <div className="mt-6 p-5 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wide flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      AI Result Generated Successfully
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy("Process Scheduling in OS: FCFS executes sequentially without preemption. SJF minimizes average waiting time. Round Robin provides fair time quantum slicing.")}
                        className="p-1.5 rounded-md hover:bg-slate-800 text-xs text-slate-300 flex items-center gap-1"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>Copy</span>
                      </button>
                      <button
                        onClick={() => addSavedNote({
                          title: `${tool.name}: ${notesTopic.substring(0, 30)}`,
                          category: tool.category,
                          language: 'both',
                          summary: notesTopic,
                          content: "FCFS, SJF, and Round Robin scheduling detailed comparison with formulas."
                        })}
                        className="p-1.5 rounded-md hover:bg-slate-800 text-xs text-cyan-300 flex items-center gap-1"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>Save to Library</span>
                      </button>
                    </div>
                  </div>

                  {/* Bilingual Result Content */}
                  <div className="space-y-3 text-xs sm:text-sm">
                    <div className="p-3.5 rounded-xl bg-navy-950 border border-blue-500/20 text-slate-200">
                      <span className="font-bold text-cyan-300 block mb-1">
                        తెలుగు సారాంశం (Telugu Key Concepts):
                      </span>
                      <p className="leading-relaxed">
                        ప్రాసెస్ షెడ్యూలింగ్ అనేది CPU సమయాన్ని వివిధ ప్రాసెస్‌లకు సమర్థవంతంగా కేటాయించే పద్ధతి. FCFS లో మొదట వచ్చిన ప్రాసెస్ మొదట పూర్తవుతుంది. రౌండ్ రాబిన్ లో ప్రతి ప్రాసెస్‌కు నిర్దిష్ట సమయం (Time Quantum) కేటాయించడం వల్ల ఏ ప్రాసెస్ కూడా ఆగిపోదు.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-navy-950 border border-purple-500/20 text-slate-200">
                      <span className="font-bold text-purple-300 block mb-1">
                        English Academic Exam Points (8-Mark Ready):
                      </span>
                      <ul className="list-disc pl-5 space-y-1 text-slate-300">
                        <li><strong>FCFS (First-Come, First-Served):</strong> Non-preemptive, suffers from Convoy Effect.</li>
                        <li><strong>SJF (Shortest Job First):</strong> Provably optimal minimum average waiting time.</li>
                        <li><strong>Round Robin (RR):</strong> Preemptive, tailored for time-sharing systems with fixed time quantum q.</li>
                        <li><strong>Formulas:</strong> Turnaround Time = Completion Time - Arrival Time. Waiting Time = Turnaround Time - Burst Time.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Supported by Problex AI Dual Language Engine</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-700 font-semibold hover:bg-slate-200"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
