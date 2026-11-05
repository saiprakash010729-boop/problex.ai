import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Calendar, 
  Target, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Play, 
  Pause, 
  RotateCcw, 
  Bell, 
  Flame, 
  TrendingUp, 
  BookOpen, 
  Coffee,
  Sparkles,
  Save
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TimeAssistance = () => {
  const { user, studySchedule, updateSchedule, showToast } = useApp();

  const [scheduleData, setScheduleData] = useState(studySchedule);
  
  // New task form state
  const [newSubject, setNewSubject] = useState('');
  const [newDuration, setNewDuration] = useState('60');
  const [newTimeSlot, setNewTimeSlot] = useState('06:00 PM - 07:00 PM');

  // New revision form state
  const [newRevisionTopic, setNewRevisionTopic] = useState('');
  const [newRevisionDue, setNewRevisionDue] = useState('Tomorrow');

  // Pomodoro timer state
  const [timerMode, setTimerMode] = useState('study'); // 'study' (25 min) | 'break' (5 min)
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [breakNotification, setBreakNotification] = useState(false);

  // Sync state when context changes
  useEffect(() => {
    if (studySchedule) {
      setScheduleData(studySchedule);
    }
  }, [studySchedule]);

  // Pomodoro countdown effect
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timeLeftSeconds > 0) {
      interval = setInterval(() => {
        setTimeLeftSeconds(prev => prev - 1);
      }, 1000);
    } else if (timeLeftSeconds === 0) {
      setIsTimerRunning(false);
      // Play alert chime
      if ('speechSynthesis' in window) {
        const msg = timerMode === 'study' 
          ? "Great job! Your study block is finished. Time for a five-minute break!" 
          : "Break is over! Time to focus on your next study goal.";
        const utterance = new SpeechSynthesisUtterance(msg);
        window.speechSynthesis.speak(utterance);
      }
      setBreakNotification(true);
      showToast(timerMode === 'study' ? "🎉 Study block completed! Take a 5-min break." : "⚡ Break completed! Ready to focus?");
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeftSeconds, timerMode]);

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = (mode = timerMode) => {
    setIsTimerRunning(false);
    setTimerMode(mode);
    setTimeLeftSeconds(mode === 'study' ? 25 * 60 : 5 * 60);
    setBreakNotification(false);
  };

  // Handle task completion toggle
  const handleToggleTask = (taskId) => {
    const updatedTasks = scheduleData.tasks.map(t => {
      if (t.id === taskId) {
        const nextCompleted = !t.completed;
        return { ...t, completed: nextCompleted };
      }
      return t;
    });

    // Recompute completed hours
    const completedMinutes = updatedTasks
      .filter(t => t.completed)
      .reduce((acc, t) => acc + (t.durationMinutes || 0), 0);
    const completedHoursToday = Math.round((completedMinutes / 60) * 10) / 10;

    const newSchedule = {
      ...scheduleData,
      tasks: updatedTasks,
      completedHoursToday
    };

    setScheduleData(newSchedule);
    updateSchedule(newSchedule);
    showToast("Progress updated!");
  };

  // Add new task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newSubject.trim()) return;

    const newTask = {
      id: `t-${Date.now()}`,
      subject: newSubject.trim(),
      durationMinutes: parseInt(newDuration, 10) || 60,
      timeSlot: newTimeSlot,
      completed: false
    };

    const newSchedule = {
      ...scheduleData,
      tasks: [...scheduleData.tasks, newTask]
    };

    setScheduleData(newSchedule);
    updateSchedule(newSchedule);
    setNewSubject('');
    showToast("Study task added to schedule!");
  };

  // Delete task
  const handleDeleteTask = (taskId) => {
    const updatedTasks = scheduleData.tasks.filter(t => t.id !== taskId);
    const newSchedule = { ...scheduleData, tasks: updatedTasks };
    setScheduleData(newSchedule);
    updateSchedule(newSchedule);
    showToast("Task removed.");
  };

  // Add revision item
  const handleAddRevision = (e) => {
    e.preventDefault();
    if (!newRevisionTopic.trim()) return;

    const newRev = {
      id: `r-${Date.now()}`,
      topic: newRevisionTopic.trim(),
      dueDate: newRevisionDue,
      status: 'pending'
    };

    const newSchedule = {
      ...scheduleData,
      revisionSchedule: [...scheduleData.revisionSchedule, newRev]
    };

    setScheduleData(newSchedule);
    updateSchedule(newSchedule);
    setNewRevisionTopic('');
    showToast("Topic added to revision schedule!");
  };

  const handleDeleteRevision = (revId) => {
    const updated = scheduleData.revisionSchedule.filter(r => r.id !== revId);
    const newSchedule = { ...scheduleData, revisionSchedule: updated };
    setScheduleData(newSchedule);
    updateSchedule(newSchedule);
  };

  // Format MM:SS
  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const progressPercent = Math.min(
    100,
    Math.round(((scheduleData.completedHoursToday || 0) / (scheduleData.dailyTargetHours || 4)) * 100)
  );

  return (
    <div className="min-h-screen bg-[#0A1128] text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-blue-500/10 text-cyan-300 border border-blue-500/25">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            Study Efficiency & Time Management
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Study Time Assistance & Schedule Manager
          </h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Design daily study schedules, configure Pomodoro break reminders, set weekly targets, and follow spaced repetition revision for {user?.course}.
          </p>
        </div>

        {/* Top Progress & Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Daily Goal Card */}
          <div className="p-6 rounded-3xl bg-[#0F172A] border border-slate-700/80 shadow-xl flex items-center gap-5">
            <div className="relative h-18 w-18 flex items-center justify-center shrink-0">
              <svg className="w-18 h-18 -rotate-90 transform" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-cyan-400 transition-all duration-500"
                  strokeDasharray={`${progressPercent}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute font-bold text-xs text-white">{progressPercent}%</span>
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-slate-400">Daily Study Target</span>
              <div className="text-2xl font-display font-extrabold text-white mt-0.5">
                {scheduleData.completedHoursToday} / {scheduleData.dailyTargetHours} <span className="text-xs font-normal text-slate-400">hrs</span>
              </div>
              <span className="text-[11px] text-cyan-300 font-semibold">
                {progressPercent >= 100 ? "🎯 Daily goal achieved!" : `${Math.max(0, scheduleData.dailyTargetHours - scheduleData.completedHoursToday)} hrs remaining today`}
              </span>
            </div>
          </div>

          {/* Weekly Target Card */}
          <div className="p-6 rounded-3xl bg-[#0F172A] border border-slate-700/80 shadow-xl flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-brandPurple-950/60 border border-brandPurple-500/30 flex items-center justify-center text-brandPurple-400 shrink-0">
              <Target className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-slate-400">Weekly Target Goal</span>
              <div className="text-2xl font-display font-extrabold text-white mt-0.5">
                {scheduleData.weeklyTargetHours} <span className="text-xs font-normal text-slate-400">hrs / week</span>
              </div>
              <span className="text-[11px] text-brandPurple-300 font-semibold">
                Bilingual syllabus completion track
              </span>
            </div>
          </div>

          {/* Study Streak Card */}
          <div className="p-6 rounded-3xl bg-[#0F172A] border border-slate-700/80 shadow-xl flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-amber-950/60 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Flame className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-slate-400">Active Study Streak</span>
              <div className="text-2xl font-display font-extrabold text-white mt-0.5 flex items-center gap-1.5">
                {user?.studyStreakDays || 14} <span className="text-xs font-normal text-slate-400">Days</span>
              </div>
              <span className="text-[11px] text-amber-300 font-semibold">
                Consistency builds rank in exams!
              </span>
            </div>
          </div>

        </div>

        {/* Study Break Reminder / Pomodoro Timer Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950/50 via-[#0F172A] to-purple-950/50 border border-blue-500/40 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                <Bell className="w-3.5 h-3.5" /> Study-Break Reminder & Pomodoro Focus
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                {timerMode === 'study' ? "Deep Study Session (25 Min Focus)" : "Healthy Brain Break (5 Min Rest)"}
              </h2>
              <p className="text-xs text-slate-400">
                Study in 25-minute sprints with automatic 5-minute break reminders to maximize long-term retention.
              </p>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
              <button
                type="button"
                onClick={() => resetTimer('study')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  timerMode === 'study' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                25m Focus
              </button>
              <button
                type="button"
                onClick={() => resetTimer('break')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  timerMode === 'break' ? 'bg-brandPurple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                5m Break
              </button>
            </div>
          </div>

          {/* Break Notification Alert Banner */}
          {breakNotification && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-center justify-between animate-bounce">
              <div className="flex items-center gap-2">
                <Coffee className="w-5 h-5 text-amber-400" />
                <span>
                  <strong>Reminder:</strong> Time for a 5-minute break! Step away from the screen, stretch, and hydrate.
                </span>
              </div>
              <button
                onClick={() => resetTimer('break')}
                className="px-3 py-1 rounded-lg bg-amber-500 text-navy-950 font-bold text-xs"
              >
                Start 5m Break
              </button>
            </div>
          )}

          {/* Timer Display & Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="text-5xl sm:text-6xl font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 tracking-wider">
              {formatTimer(timeLeftSeconds)}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggleTimer}
                className={`px-6 py-3.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg transition-all ${
                  isTimerRunning
                    ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/20'
                    : 'bg-gradient-to-r from-blue-600 to-cyan-500 text-navy-950 shadow-cyan-500/20 font-extrabold'
                }`}
              >
                {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isTimerRunning ? "Pause Timer" : "Start Focus Session"}</span>
              </button>

              <button
                type="button"
                onClick={() => resetTimer(timerMode)}
                className="p-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Reset Timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Section: Daily Study Schedule & Revision Schedules */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Column 1: Daily Study Schedule */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0F172A] border border-slate-700/80 shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-display font-bold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  Today's Study Schedule
                </h2>
                <p className="text-xs text-slate-400">Check off completed subjects to update your daily hours.</p>
              </div>
            </div>

            {/* Tasks List */}
            <div className="space-y-3">
              {scheduleData.tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => handleToggleTask(task.id)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    task.completed
                      ? 'border-emerald-500/40 bg-emerald-950/20 text-emerald-200'
                      : 'border-slate-800 bg-slate-900/60 hover:bg-slate-800/40 text-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      className={`h-5 w-5 rounded-md flex items-center justify-center border mt-0.5 transition-colors ${
                        task.completed ? 'bg-emerald-500 border-emerald-400 text-navy-950' : 'border-slate-600'
                      }`}
                    >
                      {task.completed && <CheckCircle2 className="w-4 h-4" />}
                    </button>
                    <div>
                      <div className={`text-sm font-semibold ${task.completed ? 'line-through opacity-70 text-slate-400' : 'text-white'}`}>
                        {task.subject}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {task.timeSlot} • <strong className="text-cyan-400">{task.durationMinutes} mins</strong>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteTask(task.id);
                    }}
                    className="text-slate-500 hover:text-rose-400 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Subject to Schedule Form */}
            <form onSubmit={handleAddTask} className="pt-4 border-t border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Add Subject & Study Duration
              </span>
              <input
                type="text"
                required
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                placeholder="e.g. Compiler Design (LR Parsing)"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTimeSlot}
                  onChange={(e) => setNewTimeSlot(e.target.value)}
                  placeholder="08:00 PM - 09:00 PM"
                  className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white focus:outline-none focus:border-blue-500"
                />
                <select
                  value={newDuration}
                  onChange={(e) => setNewDuration(e.target.value)}
                  className="w-28 text-xs px-2.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white focus:outline-none"
                >
                  <option value="30">30 Mins</option>
                  <option value="45">45 Mins</option>
                  <option value="60">60 Mins</option>
                  <option value="90">90 Mins</option>
                  <option value="120">120 Mins</option>
                </select>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shrink-0 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </form>

          </div>

          {/* Column 2: Revision Schedules (Spaced Repetition) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0F172A] border border-slate-700/80 shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-display font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-brandPurple-400" />
                  Revision Schedules (Spaced Repetition)
                </h2>
                <p className="text-xs text-slate-400">1-Day, 3-Day & 7-Day revision prompts to lock into memory.</p>
              </div>
            </div>

            {/* Revision List */}
            <div className="space-y-3">
              {scheduleData.revisionSchedule.map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-brandPurple-400 animate-pulse"></span>
                    <div>
                      <div className="text-sm font-semibold text-white">{rev.topic}</div>
                      <div className="text-[11px] text-brandPurple-300 font-semibold mt-0.5">
                        Due: {rev.dueDate}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteRevision(rev.id)}
                    className="text-slate-500 hover:text-rose-400 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Revision Form */}
            <form onSubmit={handleAddRevision} className="pt-4 border-t border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Schedule a Topic for Revision
              </span>
              <input
                type="text"
                required
                value={newRevisionTopic}
                onChange={(e) => setNewRevisionTopic(e.target.value)}
                placeholder="e.g. Fundamental Rights Articles or K-Maps"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white placeholder-slate-500 focus:outline-none focus:border-brandPurple-500"
              />
              <div className="flex gap-2">
                <select
                  value={newRevisionDue}
                  onChange={(e) => setNewRevisionDue(e.target.value)}
                  className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white focus:outline-none"
                >
                  <option value="Tomorrow">Tomorrow (1-Day Interval)</option>
                  <option value="In 3 Days">In 3 Days (Spaced Memory)</option>
                  <option value="In 7 Days">In 7 Days (Weekly Review)</option>
                  <option value="Weekend">This Weekend</option>
                </select>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-brandPurple-600 hover:bg-brandPurple-500 text-white font-bold text-xs shrink-0 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Schedule</span>
                </button>
              </div>
            </form>

          </div>

        </div>

      </div>
    </div>
  );
};
