import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AppContext = createContext();

const INITIAL_USER = {
  id: "user-1",
  name: "Rahul Reddy",
  mobile: "9876543210",
  email: "rahul.reddy@student.ac.in",
  avatar: "RR",
  course: "B.Tech",
  academicLevel: "3rd Year",
  branch: "Computer Science & Engineering",
  category: "B.Tech • 3rd Year (CSE)",
  targetExam: "GATE 2027 & TCS NQT",
  preferredLanguage: "both", // 'telugu' | 'english' | 'both'
  studyStreakDays: 14,
  doubtsResolved: 48,
  savedNotesCount: 12,
  weeklyGoalHours: 25,
  completedHours: 15.5,
  isAuthenticated: true
};

const DEFAULT_SAVED_NOTES = [
  {
    id: "note-1",
    title: "Binary Search Algorithm - Time Complexity & Implementation",
    topic: "Binary Search Algorithm",
    category: "Data Structures (B.Tech 2nd/3rd Year)",
    language: "both",
    date: "Nov 04, 2026",
    summary: "O(log n) search algorithm. Explained with Telugu analogies and dry run in C++.",
    content: "Binary Search requires sorted array. Mid element is compared with target key. If target < mid, search left; else search right."
  },
  {
    id: "note-2",
    title: "Indian Constitution - Fundamental Rights (Articles 12 to 35)",
    topic: "Fundamental Rights",
    category: "Competitive Exams (Indian Polity)",
    language: "telugu",
    date: "Nov 02, 2026",
    summary: "భారత రాజ్యాంగం ప్రాథమిక హక్కులు - 6 రకాల హక్కుల పూర్తి వివరణ మరియు రిట్ అధికారాలు.",
    content: "భారత రాజ్యాంగంలో 3వ భాగంలో అధికరణలు 12 నుండి 35 వరకు ప్రాథమిక హక్కులను పొందుపరిచారు."
  },
  {
    id: "note-3",
    title: "Second Law of Thermodynamics - 8-Mark University Answer",
    topic: "Thermodynamics & Carnot Cycle",
    category: "Mechanical & Core Engineering",
    language: "english",
    date: "Oct 29, 2026",
    summary: "Kelvin-Planck statement, Clausius statement, Carnot cycle, and equivalence proof.",
    content: "Kelvin-Planck statement states that it is impossible for any device operating in a cycle to receive heat from a single reservoir and produce equivalent net work."
  }
];

const DEFAULT_SCHEDULE = {
  dailyTargetHours: 4,
  weeklyTargetHours: 25,
  completedHoursToday: 2.5,
  tasks: [
    { id: "t1", subject: "Operating Systems (Virtual Memory & Paging)", durationMinutes: 60, completed: true, timeSlot: "09:00 AM - 10:00 AM" },
    { id: "t2", subject: "Data Structures (Binary Search Trees & AVL)", durationMinutes: 90, completed: true, timeSlot: "11:00 AM - 12:30 PM" },
    { id: "t3", subject: "Computer Networks (TCP/IP & Flow Control)", durationMinutes: 60, completed: false, timeSlot: "04:00 PM - 05:00 PM" },
    { id: "t4", subject: "Aptitude & Reasoning Practice (Quantitative)", durationMinutes: 45, completed: false, timeSlot: "07:30 PM - 08:15 PM" }
  ],
  revisionSchedule: [
    { id: "r1", topic: "DBMS Normalization (1NF to BCNF)", dueDate: "Tomorrow", status: "pending" },
    { id: "r2", topic: "Digital Logic (K-Maps & Multiplexers)", dueDate: "In 3 Days", status: "pending" },
    { id: "r3", topic: "Theory of Computation (DFA Minimization)", dueDate: "In 5 Days", status: "pending" }
  ]
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('problex_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('problex_lang') || 'both';
  });

  const [savedNotes, setSavedNotes] = useState(() => {
    const saved = localStorage.getItem('problex_notes');
    return saved ? JSON.parse(saved) : DEFAULT_SAVED_NOTES;
  });

  const [studySchedule, setStudySchedule] = useState(() => {
    const saved = localStorage.getItem('problex_schedule');
    return saved ? JSON.parse(saved) : DEFAULT_SCHEDULE;
  });

  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    localStorage.setItem('problex_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('problex_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('problex_notes', JSON.stringify(savedNotes));
  }, [savedNotes]);

  useEffect(() => {
    localStorage.setItem('problex_schedule', JSON.stringify(studySchedule));
  }, [studySchedule]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const loginUser = (userData) => {
    const updated = {
      ...INITIAL_USER,
      ...userData,
      avatar: (userData.name ? userData.name.substring(0, 2).toUpperCase() : "ST"),
      isAuthenticated: true
    };
    setUser(updated);
    showToast(`Welcome back, ${updated.name}!`);
  };

  const logoutUser = () => {
    setUser({ ...INITIAL_USER, isAuthenticated: false });
    showToast("Logged out successfully.");
  };

  const updateCourseAndLevel = async (course, academicLevel, branch = '', targetExam = '') => {
    const category = `${course} • ${academicLevel}${branch ? ` (${branch})` : ''}`;
    const updated = {
      ...user,
      course,
      academicLevel,
      branch: branch || user.branch,
      targetExam: targetExam || user.targetExam,
      category
    };
    setUser(updated);
    showToast(`Academic level updated to: ${category}`);

    // Sync to backend
    try {
      await api.updateProfile({
        userId: user.id || "user-1",
        course,
        academicLevel,
        branch,
        targetExam
      });
    } catch (e) {
      // Ignored
    }
  };

  const addSavedNote = (note) => {
    const newNote = {
      id: `note-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      ...note
    };
    setSavedNotes(prev => [newNote, ...prev]);
    showToast(`Note saved: "${newNote.title.substring(0, 30)}..."`);
  };

  const removeSavedNote = (id) => {
    setSavedNotes(prev => prev.filter(n => n.id !== id));
    showToast("Note removed from library.");
  };

  const updateSchedule = (newSchedule) => {
    setStudySchedule(newSchedule);
    api.saveStudySchedule(user.id || "user-1", newSchedule).catch(() => {});
  };

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      loginUser,
      logoutUser,
      updateCourseAndLevel,
      language,
      setLanguage,
      savedNotes,
      addSavedNote,
      removeSavedNote,
      studySchedule,
      updateSchedule,
      showToast,
      toastMessage
    }}>
      {children}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-navy-950 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-blue-500/40 animate-bounce">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
