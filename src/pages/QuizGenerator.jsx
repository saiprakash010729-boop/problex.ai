import React, { useState } from 'react';
import { 
  HelpCircle, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Award, 
  BookOpen, 
  Clock, 
  ChevronRight,
  TrendingUp,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';

export const QuizGenerator = () => {
  const { user, showToast } = useApp();

  const [topicInput, setTopicInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [quizData, setQuizData] = useState(null);
  
  // Quiz progress states
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { questionIndex: optionIndex }
  const [submittedQuestions, setSubmittedQuestions] = useState({}); // { questionIndex: true }
  const [quizCompleted, setQuizCompleted] = useState(false);

  const suggestedTopics = user?.course === 'B.Tech' ? [
    "Data Structures & Time Complexity",
    "Operating Systems (Process & Threads)",
    "Database Normalization & SQL Queries",
    "Digital Logic Design & Karnaugh Maps",
    "Computer Networks & Flow Control"
  ] : [
    "Indian Polity (Fundamental Rights & DPSP)",
    "Modern Indian History & Freedom Struggle",
    "Quantitative Aptitude (Time, Speed & Distance)",
    "General Science (Physics & Chemistry Fundamentals)",
    "Geography of India & River Systems"
  ];

  const handleGenerateQuiz = async (topicToUse) => {
    const topic = topicToUse || topicInput;
    if (!topic.trim()) {
      showToast("Please enter or select a topic to generate a quiz.");
      return;
    }

    setLoading(true);
    setQuizCompleted(false);
    setSelectedAnswers({});
    setSubmittedQuestions({});
    setCurrentIndex(0);

    const res = await api.generateQuiz({
      topic: topic.trim(),
      course: user?.course || 'B.Tech'
    });
    setLoading(false);

    if (res.success && res.quiz) {
      setQuizData(res.quiz);
      showToast("Interactive quiz generated! Good luck!");
    } else {
      showToast("Failed to generate quiz. Please try again.");
    }
  };

  const handleSelectOption = (qIdx, optIdx) => {
    if (submittedQuestions[qIdx]) return; // Cannot change after submit
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmitAnswer = (qIdx) => {
    if (selectedAnswers[qIdx] === undefined) {
      showToast("Please select one option before submitting.");
      return;
    }
    setSubmittedQuestions(prev => ({ ...prev, [qIdx]: true }));
  };

  const handleNextQuestion = () => {
    if (currentIndex < (quizData?.questions?.length || 0) - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setSelectedAnswers({});
    setSubmittedQuestions({});
    setCurrentIndex(0);
    setQuizCompleted(false);
  };

  // Calculate score
  const calculateScore = () => {
    if (!quizData?.questions) return 0;
    return quizData.questions.reduce((acc, q, idx) => {
      return acc + (selectedAnswers[idx] === q.correctIndex ? 1 : 0);
    }, 0);
  };

  const totalQuestions = quizData?.questions?.length || 0;
  const currentQuestion = quizData?.questions?.[currentIndex];
  const isCurrentSubmitted = submittedQuestions[currentIndex];
  const currentSelected = selectedAnswers[currentIndex];
  const score = calculateScore();
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#0A1128] text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-brandPurple-500/10 text-brandPurple-300 border border-brandPurple-500/25">
            <HelpCircle className="w-3.5 h-3.5 text-brandPurple-400" />
            AI Study Utility #2
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Interactive Quiz Generator
          </h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Test your conceptual knowledge with AI-crafted 4-option multiple-choice questions. Get immediate feedback, scores, and detailed explanations.
          </p>
        </div>

        {/* Input Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0F172A] border border-slate-700/80 shadow-2xl space-y-5">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
            Enter Quiz Topic ({user?.course} • {user?.academicLevel})
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerateQuiz()}
              placeholder="e.g. Operating Systems Processes, or Fundamental Rights Articles"
              className="flex-1 px-4 py-3.5 rounded-2xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm"
            />
            <button
              onClick={() => handleGenerateQuiz()}
              disabled={loading}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brandPurple-600 to-blue-600 hover:opacity-95 text-white font-bold text-sm shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 shrink-0 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-purple-300" />
                  <span>Generating MCQs...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Interactive Quiz</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Topic Chips */}
          <div>
            <span className="text-xs text-slate-400 font-semibold mb-2 block">
              Quick Suggestions:
            </span>
            <div className="flex flex-wrap gap-2">
              {suggestedTopics.map((t, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTopicInput(t);
                    handleGenerateQuiz(t);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:text-white transition-all text-left"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active Quiz Card */}
        {quizData && !quizCompleted && currentQuestion && (
          <div className="p-6 sm:p-10 rounded-3xl bg-[#0F172A] border border-slate-700/80 shadow-2xl space-y-6 animate-in fade-in duration-300">
            
            {/* Quiz Progress & Topic Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  Topic: {quizData.topic}
                </span>
                <div className="text-sm font-semibold text-slate-300 mt-0.5">
                  Question {currentIndex + 1} of {totalQuestions}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1.5 rounded-xl font-bold">
                  Score: {score} / {totalQuestions}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-brandPurple-500 h-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
              ></div>
            </div>

            {/* Question Stem */}
            <div className="text-lg sm:text-xl font-display font-bold text-white pt-2 leading-relaxed">
              {currentIndex + 1}. {currentQuestion.question}
            </div>

            {/* 4 Options Grid */}
            <div className="grid grid-cols-1 gap-3 pt-2">
              {currentQuestion.options.map((option, optIdx) => {
                const isSelected = currentSelected === optIdx;
                const isCorrect = optIdx === currentQuestion.correctIndex;
                const showFeedback = isCurrentSubmitted;

                let optionStyle = 'border-slate-800 bg-slate-900/60 hover:bg-slate-800/50 hover:border-slate-700 text-slate-200';
                
                if (showFeedback) {
                  if (isCorrect) {
                    optionStyle = 'border-emerald-500 bg-emerald-950/30 text-emerald-200 ring-2 ring-emerald-500/40';
                  } else if (isSelected && !isCorrect) {
                    optionStyle = 'border-rose-500 bg-rose-950/30 text-rose-200 ring-2 ring-rose-500/40';
                  } else {
                    optionStyle = 'border-slate-800/50 bg-slate-950/40 text-slate-500 opacity-60';
                  }
                } else if (isSelected) {
                  optionStyle = 'border-blue-500 bg-blue-600/20 text-white ring-2 ring-blue-500';
                }

                return (
                  <button
                    key={optIdx}
                    type="button"
                    disabled={isCurrentSubmitted}
                    onClick={() => handleSelectOption(currentIndex, optIdx)}
                    className={`p-4 sm:p-5 rounded-2xl border text-left transition-all flex items-center justify-between gap-4 ${optionStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-7 w-7 rounded-xl bg-slate-800 flex items-center justify-center text-xs font-bold shrink-0">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="text-sm font-medium">{option}</span>
                    </div>

                    {showFeedback && (
                      <div className="shrink-0">
                        {isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : isSelected ? (
                          <XCircle className="w-5 h-5 text-rose-400" />
                        ) : null}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Answer Explanation once submitted */}
            {isCurrentSubmitted && (
              <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/30 text-xs sm:text-sm text-blue-200 space-y-1.5 animate-in fade-in">
                <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  Answer Explanation:
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}

            {/* Actions Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <span className="text-xs text-slate-400">
                {!isCurrentSubmitted ? "Select an option and submit to verify." : "Reviewed explanation."}
              </span>

              {!isCurrentSubmitted ? (
                <button
                  type="button"
                  onClick={() => handleSubmitAnswer(currentIndex)}
                  disabled={currentSelected === undefined}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all disabled:opacity-50 shadow-md shadow-blue-500/20"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-brandPurple-600 hover:opacity-90 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all"
                >
                  <span>{currentIndex < totalQuestions - 1 ? "Next Question" : "View Final Results"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        )}

        {/* Final Quiz Results Screen */}
        {quizCompleted && (
          <div className="p-8 sm:p-12 rounded-3xl bg-[#0F172A] border border-slate-700/80 shadow-2xl text-center space-y-8 animate-in zoom-in-95 duration-300">
            
            <div className="h-20 w-20 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-brandPurple-600 mx-auto flex items-center justify-center text-white shadow-xl shadow-blue-500/25">
              <Award className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-display font-extrabold text-white">
                Quiz Completed!
              </h2>
              <p className="text-slate-400 text-sm">
                Topic: <strong className="text-white">{quizData?.topic}</strong>
              </p>
            </div>

            {/* Score Ring / Pill */}
            <div className="max-w-xs mx-auto p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                {score} / {totalQuestions}
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Accuracy: {percentage}%
              </div>
              <div className="text-xs font-semibold text-emerald-400 pt-1">
                {percentage >= 75 ? "🎉 Excellent Conceptual Mastery!" : percentage >= 50 ? "👍 Good effort! Review the explanations below." : "📚 Needs revision. Read the explanations and retry."}
              </div>
            </div>

            {/* Question Breakdown List */}
            <div className="text-left space-y-4 pt-4 border-t border-slate-800">
              <h3 className="text-base font-bold text-white">Review Detailed Answers:</h3>
              <div className="space-y-4">
                {quizData?.questions?.map((q, idx) => {
                  const userChoice = selectedAnswers[idx];
                  const isCorrect = userChoice === q.correctIndex;
                  return (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
                      <div className="flex items-start justify-between gap-3">
                        <span className="font-bold text-white text-sm">
                          {idx + 1}. {q.question}
                        </span>
                        {isCorrect ? (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold shrink-0">
                            Correct
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold shrink-0">
                            Incorrect
                          </span>
                        )}
                      </div>
                      <div className="text-slate-300">
                        <strong>Correct Answer:</strong> {String.fromCharCode(65 + q.correctIndex)}. {q.options[q.correctIndex]}
                      </div>
                      <div className="text-slate-400 leading-relaxed bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                        <strong>Why:</strong> {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={handleRestartQuiz}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry This Quiz</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setQuizData(null);
                  setTopicInput('');
                  setQuizCompleted(false);
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-brandPurple-600 hover:opacity-90 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Create New Topic Quiz</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
