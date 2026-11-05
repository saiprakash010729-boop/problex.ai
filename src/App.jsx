import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { AiTutor } from './pages/AiTutor';
import { StudyTools } from './pages/StudyTools';
import { GovernmentExams } from './pages/GovernmentExams';
import { Dashboard } from './pages/Dashboard';
import { AboutUs } from './pages/AboutUs';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { AcademicLevelSelect } from './pages/AcademicLevelSelect';
import { ShortNotes } from './pages/ShortNotes';
import { QuizGenerator } from './pages/QuizGenerator';
import { PdfTool } from './pages/PdfTool';
import { TimeAssistance } from './pages/TimeAssistance';
import { AppProvider } from './context/AppContext';

// Helper component to scroll to top on navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const App = () => {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-[#0A1128] text-slate-100">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/ai-tutor" element={<AiTutor />} />
              <Route path="/short-notes" element={<ShortNotes />} />
              <Route path="/quiz" element={<QuizGenerator />} />
              <Route path="/pdf-generator" element={<PdfTool />} />
              <Route path="/time-assistance" element={<TimeAssistance />} />
              <Route path="/select-standard" element={<AcademicLevelSelect />} />
              <Route path="/study-tools" element={<StudyTools />} />
              <Route path="/government-exams" element={<GovernmentExams />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              {/* Catch-all redirect to Dashboard if logged in or Home */}
              <Route path="*" element={<Home />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
