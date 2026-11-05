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
        <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ai-tutor" element={<AiTutor />} />
              <Route path="/study-tools" element={<StudyTools />} />
              <Route path="/government-exams" element={<GovernmentExams />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              {/* Catch-all redirect to Home */}
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
