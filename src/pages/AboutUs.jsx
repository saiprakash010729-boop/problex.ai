import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Bot, 
  Languages, 
  Heart, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  ShieldCheck,
  Target,
  Zap,
  GraduationCap
} from 'lucide-react';
import { FAQS_LIST } from '../data/mockData';

export const AboutUs = () => {
  const [openFaq, setOpenFaq] = useState(0);

  const pillars = [
    {
      title: "Radical Accessibility",
      desc: "Quality tutoring should not depend on whether a student can afford ₹50,000 coaching fees or lives near coaching centers in Hyderabad or Vijayawada.",
      icon: Heart,
      color: "text-rose-500 bg-rose-50"
    },
    {
      title: "Dual Language Fluency",
      desc: "Mastering complex concepts first in mother tongue (Telugu) creates deep neural retention, while parallel English answers ensure top marks in university exams.",
      icon: Languages,
      color: "text-blue-500 bg-blue-50"
    },
    {
      title: "Exam & Career Relevance",
      desc: "Every AI feature is engineered around real exam rubrics—2, 4, and 8-mark structures for engineering and speed math for competitive government exams.",
      icon: Target,
      color: "text-purple-500 bg-purple-50"
    },
    {
      title: "Zero Intimidation",
      desc: "A warm, patient AI tutor that never gets frustrated, never judges you for asking basic questions, and explains line-by-line until you feel confident.",
      icon: Zap,
      color: "text-amber-500 bg-amber-50"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Mission Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Our Founding Mission</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-navy-900 tracking-tight leading-tight">
            Democratizing World-Class AI Education for Every Student
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Problex AI was created with a bold purpose: to make state-of-the-art AI learning tools, conceptual mastery, and bilingual academic guidance in Telugu and English accessible to every aspiring engineer, college student, and government exam aspirant.
          </p>
        </div>

        {/* The Problex AI Story Section */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brandPurple-600">
              Why We Built Problex AI
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-navy-900">
              Breaking the Language & Tuition Barrier
            </h2>
            <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
              <p>
                Millions of talented students across Andhra Pradesh, Telangana, and regional India join engineering and degree colleges every year. Many have strong technical intuition, but struggle when complex subjects like Algorithms, Network Theory, or Thermodynamics are presented in dense, intimidating textbook English.
              </p>
              <p>
                Generic AI tools offer answers, but their English is often overly academic or Americanized, and their Telugu is robotic and unnatural.
              </p>
              <p className="font-semibold text-navy-900">
                Problex AI solves this by combining natural, conversational Telugu explanations with precise, exam-ready English university answer formatting.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-navy-950 p-6 sm:p-8 rounded-3xl text-white border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-lg font-display font-bold text-cyan-400">
              Our Educational Motto
            </h3>
            <p className="text-sm font-sans italic text-slate-200 border-l-2 border-cyan-400 pl-4 py-1 leading-relaxed">
              "భాష అనేది అడ్డంకి కాదు, జ్ఞానాన్ని సులభంగా అర్థం చేసుకోవడానికి ఒక వారధి."
            </p>
            <p className="text-xs text-slate-400">
              (Language is never a barrier; it is the bridge to master concepts with confidence.)
            </p>
            <div className="pt-4 border-t border-slate-800 flex items-center gap-4 text-xs">
              <div>
                <span className="text-xl font-bold text-white block">45,000+</span>
                <span className="text-slate-400">Active Learners</span>
              </div>
              <div className="h-8 w-px bg-slate-800"></div>
              <div>
                <span className="text-xl font-bold text-cyan-400 block">98%</span>
                <span className="text-slate-400">Doubt Resolution</span>
              </div>
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-navy-900">
              The 4 Pillars of Problex AI
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              How our design philosophy shapes every feature we develop.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3">
                  <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${p.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-navy-900">{p.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive FAQs Accordion */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-navy-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3 pt-4">
            {FAQS_LIST.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between text-sm sm:text-base font-bold text-navy-900 hover:text-blue-600 transition-colors"
                >
                  <span>{faq.question}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-600 to-navy-900 text-white text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-display font-bold">
            Join the Next Generation of AI Learning
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto">
            Experience our bilingual AI tutor and specialized study tools for yourself today.
          </p>
          <div className="pt-2">
            <Link
              to="/ai-tutor"
              className="px-6 py-3 rounded-xl bg-white text-navy-950 font-bold text-xs sm:text-sm shadow-lg hover:bg-slate-100 transition-all inline-flex items-center gap-2"
            >
              <span>Start Learning Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
