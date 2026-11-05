import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const INITIAL_USER = {
  name: "Rahul Reddy",
  email: "rahul.reddy@student.ac.in",
  avatar: "RR",
  category: "B.Tech Computer Science (3rd Year)",
  targetExam: "GATE 2027 & TCS NQT",
  preferredLanguage: "both", // 'telugu' | 'english' | 'both'
  studyStreakDays: 14,
  doubtsResolved: 48,
  savedNotesCount: 12,
  weeklyGoalHours: 20,
  completedHours: 15.5
};

const DEFAULT_SAVED_NOTES = [
  {
    id: "note-1",
    title: "Binary Search Algorithm - Time Complexity & Implementation",
    category: "Data Structures",
    language: "both",
    date: "Nov 04, 2026",
    summary: "O(log n) search algorithm. Explained with Telugu analogies and dry run in C++.",
    content: "Binary Search requires sorted array. Mid element is compared with target key. If target < mid, search left; else search right."
  },
  {
    id: "note-2",
    title: "Indian Constitution - Fundamental Rights (Articles 12 to 35)",
    category: "Government Exams (Polity)",
    language: "telugu",
    date: "Nov 02, 2026",
    summary: "భారత రాజ్యాంగం ప్రాథమిక హక్కులు - 6 రకాల హక్కుల పూర్తి వివరణ మరియు రిట్ అధికారాలు.",
    content: "భారత రాజ్యాంగంలో 3వ భాగంలో అధికరణలు 12 నుండి 35 వరకు ప్రాథమిక హక్కులను పొందుపరిచారు."
  },
  {
    id: "note-3",
    title: "Second Law of Thermodynamics - 8-Mark University Answer",
    category: "Mechanical Engineering",
    language: "english",
    date: "Oct 29, 2026",
    summary: "Kelvin-Planck statement, Clausius statement, Carnot cycle, and equivalence proof.",
    content: "Kelvin-Planck statement states that it is impossible for any device operating in a cycle to receive heat from a single reservoir and produce equivalent net work."
  }
];

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

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
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
    showToast("Note removed from library");
  };

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      language,
      setLanguage,
      savedNotes,
      addSavedNote,
      removeSavedNote,
      showToast,
      toastMessage
    }}>
      {children}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-navy-900 text-white px-5 py-3.5 rounded-xl shadow-2xl border border-blue-500/30 animate-bounce">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
