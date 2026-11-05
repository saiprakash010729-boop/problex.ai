import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Bot, 
  Wrench, 
  Languages, 
  CheckCircle, 
  CheckCircle2,
  GraduationCap, 
  BookOpen, 
  Code2, 
  Landmark, 
  Zap, 
  ShieldCheck, 
  Users, 
  Award, 
  HelpCircle,
  FileText,
  Clock,
  TrendingUp,
  MessageSquare,
  Star
} from 'lucide-react';
import { InteractiveHeroTutor } from '../components/InteractiveHeroTutor';
import { STUDY_TOOLS_LIST } from '../data/mockData';

export const Home = () => {
  const learningCategories = [
    {
      title: "B.Tech & Engineering",
      subtitle: "CSE, ECE, EEE, Mech, Civil & IT",
      desc: "Data Structures, Algorithms, Operating Systems, Thermodynamics, Network Theory with 2, 4 & 8-mark university answer formats.",
      icon: GraduationCap,
      color: "from-blue-600 to-indigo-600",
      pill: "JNTU • OU • AU • Autonomous",
      popular: "Binary Search, OS Scheduling, DBMS Normalization"
    },
    {
      title: "College & Intermediate",
      subtitle: "MPC, BiPC, Degree & Commerce",
      desc: "Master Physics, Chemistry, Mathematics, Accounts, and Biology with simplified concepts in conversational Telugu and English.",
      icon: BookOpen,
      color: "from-purple-600 to-pink-600",
      pill: "Inter 1st & 2nd Year • Degree",
      popular: "Thermodynamics, Organic Chemistry, Calculus"
    },
    {
      title: "Government Job Aspirants",
      subtitle: "UPSC, SSC, Banking, Railways & State PSCs",
      desc: "Daily bilingual current affairs capsules, Indian Polity articles, shortcut math tricks for quantitative aptitude and reasoning.",
      icon: Landmark,
      color: "from-emerald-600 to-teal-600",
      pill: "APPSC • TSPSC • SSC CGL • IBPS",
      popular: "Fundamental Rights, Work & Time, Modern History"
    },
    {
      title: "Coding & Technology Beginners",
      subtitle: "Python, Java, C++, Web Development & AI",
      desc: "Zero to hero coding lessons with line-by-line Telugu explanations, dry-run traces, and practical programming projects.",
      icon: Code2,
      color: "from-sky-500 to-blue-700",
      pill: "Zero Coding Background Needed",
      popular: "Python Lists, OOP Concepts, Java Loops"
    }
  ];

  const whyChooseFeatures = [
    {
      title: "Bilingual Telugu & English AI Engine",
      desc: "Stop struggling with complicated textbook English. Understand tough concepts first in clear Telugu, then get exam-ready English notes to score maximum marks.",
      icon: Languages,
      tag: "Our Superpower"
    },
    {
      title: "Exam-Oriented Answer Formats",
      desc: "Specifically tailored for Indian university patterns. Generate concise 2-mark definitions, structured 4-mark answers, or comprehensive 8-mark explanations.",
      icon: Award,
      tag: "Full Marks Strategy"
    },
    {
      title: "24/7 Personal One-on-One Tutor",
      desc: "No fear of asking 'silly' doubts. Ask as many questions as you need, repeat explanations until you understand completely, anytime day or night.",
      icon: Bot,
      tag: "Patience Guaranteed"
    },
    {
      title: "Built for Tier-2 & Tier-3 Students",
      desc: "Affordable, accessible, and fast. Designed to run smoothly on budget smartphones and low-bandwidth connections across India.",
      icon: Zap,
      tag: "Accessible to All"
    }
  ];

  const howItWorksSteps = [
    {
      step: "01",
      title: "Ask or Upload",
      desc: "Type your academic question, paste complex code, or upload textbook problems.",
      icon: HelpCircle
    },
    {
      step: "02",
      title: "Choose Language & Format",
      desc: "Select Telugu, English, or Both. Choose whether you need a quick concept or an 8-mark university answer.",
      icon: Languages
    },
    {
      step: "03",
      title: "Understand Deeply",
      desc: "Get instant step-by-step reasoning with relatable local analogies, diagrams, and formulas.",
      icon: Bot
    },
    {
      step: "04",
      title: "Save & Ace Exams",
      desc: "Save notes to your dashboard library, generate practice quizzes, and revise before exams.",
      icon: Award
    }
  ];

  const testimonials = [
    {
      name: "Sravani K.",
      role: "B.Tech CSE 3rd Year, Hyderabad",
      text: "Data Structures used to be a nightmare for me. Problex AI explained Binary Trees and Recursion in Telugu with such simple examples that I scored 85% in my semester exams!",
      rating: 5,
      avatar: "SK"
    },
    {
      name: "Venkatesh Naidu",
      role: "APPSC Group-2 Aspirant, Vijayawada",
      text: "The bilingual Indian Polity notes and daily current affairs in Telugu are gold. It saves me at least 3 hours of newspaper reading every day.",
      rating: 5,
      avatar: "VN"
    },
    {
      name: "Pooja Reddy",
      role: "B.Tech ECE, Warangal",
      text: "Being able to generate 8-mark university answers according to the JNTU marking scheme is unbelievable. It gives you the exact headings and points examiners look for.",
      rating: 5,
      avatar: "PR"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden">
        {/* Background ambient glow circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-blue-500/15 via-purple-500/10 to-cyan-400/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Main Hero Header */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Announcement Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200/80 shadow-sm text-xs sm:text-sm font-semibold text-blue-700 animate-in fade-in slide-in-from-top-4 duration-500">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-ping"></span>
              <span className="font-bold">Next-Gen AI Learning:</span>
              <span className="text-slate-600">Master Concepts in Telugu & English</span>
              <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-navy-900 leading-[1.12]">
              Learn Smarter. Grow Faster.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-brandPurple-600 to-electric-cyan">
                Achieve More.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
              Your personal AI learning companion. Understand difficult topics, solve doubts, learn programming and prepare for your future in <strong className="text-navy-900 font-semibold">Telugu and English</strong>.
            </p>

            {/* Call to Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/ai-tutor"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-blue-600 via-navy-800 to-brandPurple-600 shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Sparkles className="w-5 h-5 text-cyan-300" />
                <span>Start Learning Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/study-tools"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-navy-900 bg-white border border-slate-200/90 hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all"
              >
                <Wrench className="w-4 h-4 text-slate-500" />
                <span>Explore AI Tools</span>
              </Link>
            </div>

            {/* Trust metrics pill bar */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-semibold text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>45,000+ Students</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500" />
                <span>Bilingual Telugu + English</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brandPurple-500" />
                <span>2, 4 & 8-Mark Answers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                <span>100% Free to Try</span>
              </div>
            </div>

          </div>

          {/* Interactive Live Hero Widget */}
          <div className="mt-12 lg:mt-16">
            <InteractiveHeroTutor />
          </div>

        </div>
      </section>

      {/* POPULAR AI TOOLS PREVIEW SECTION */}
      <section className="py-20 bg-white border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 block mb-2">
                Purpose-Built AI Tools
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-900 tracking-tight">
                Popular AI Tools for Every Student
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
                From instant 8-mark exam answers to line-by-line coding assistance, explore our most popular student tools.
              </p>
            </div>
            <Link
              to="/study-tools"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 font-bold text-sm text-blue-600 hover:text-blue-700 transition-colors group"
            >
              <span>View All 10 AI Tools</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Tool Grid (First 6 popular tools) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STUDY_TOOLS_LIST.slice(0, 6).map((tool) => (
              <div
                key={tool.id}
                className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-r ${tool.color} text-white flex items-center justify-center font-bold shadow-md shadow-navy-900/10 group-hover:scale-105 transition-transform`}>
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                      {tool.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-display font-bold text-navy-900 group-hover:text-blue-600 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 mt-1">
                    {tool.tagline}
                  </p>
                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                    {tool.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-400">
                    Telugu + English
                  </span>
                  <Link
                    to="/study-tools"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span>Open Tool</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* WHY CHOOSE PROBLEX AI SECTION */}
      <section className="py-20 bg-gradient-to-b from-[#F8FAFC] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brandPurple-600 block mb-2">
              The Problex AI Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-900 tracking-tight">
              Why Choose Problex AI Over Ordinary Platforms?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Standard AI chatbots speak in generic English. Problex AI is deeply engineered for Indian syllabus, state exams, and bilingual comprehension.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-11 w-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {feat.tag}
                      </span>
                    </div>
                    <h3 className="text-base font-display font-bold text-navy-900 mb-2">
                      {feat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Comparison table banner */}
          <div className="mt-12 p-8 rounded-3xl bg-navy-950 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
              <div className="border-b md:border-b-0 md:border-r border-slate-800 pb-6 md:pb-0 md:pr-6">
                <span className="text-cyan-400 font-bold text-xs uppercase tracking-wider block mb-1">
                  1. Regional Context
                </span>
                <h4 className="font-bold text-lg text-white mb-2">Authentic Telugu Script & Nuances</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Natural Telugu phrasing with relatable real-world analogies, not robotic literal Google translations.
                </p>
              </div>
              <div className="border-b md:border-b-0 md:border-r border-slate-800 pb-6 md:pb-0 md:pr-6">
                <span className="text-brandPurple-400 font-bold text-xs uppercase tracking-wider block mb-1">
                  2. Academic Accuracy
                </span>
                <h4 className="font-bold text-lg text-white mb-2">Direct University Scheme Alignment</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Answers formatted with headings, bullet points, and formulas matching JNTU, OU, AU, and CBSE evaluation patterns.
                </p>
              </div>
              <div>
                <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider block mb-1">
                  3. Competitive Edge
                </span>
                <h4 className="font-bold text-lg text-white mb-2">Specialized Govt Job Modules</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  APPSC & TSPSC special focus, Quantitative Aptitude shortcuts, and daily bilingual Current Affairs.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* LEARNING CATEGORIES SECTION */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 block mb-2">
              Who Is Problex AI For?
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-900 tracking-tight">
              Tailored Learning Categories
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Whether you are preparing for semester finals, competitive civil exams, or starting your first coding project, we have dedicated modules for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {learningCategories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <div className={`h-12 w-12 rounded-2xl bg-gradient-to-r ${cat.color} text-white flex items-center justify-center font-bold shadow-md`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-slate-600 bg-white border border-slate-200 px-3 py-1 rounded-full">
                        {cat.pill}
                      </span>
                    </div>

                    <h3 className="text-xl font-display font-bold text-navy-900">
                      {cat.title}
                    </h3>
                    <span className="text-xs font-bold text-blue-600 block mb-3">
                      {cat.subtitle}
                    </span>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <span className="text-slate-500">
                      <strong>Popular topics:</strong> {cat.popular}
                    </span>
                    <Link
                      to="/ai-tutor"
                      className="font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 group"
                    >
                      <span>Explore Hub</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 bg-gradient-to-b from-[#F8FAFC] via-blue-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 block mb-2">
              Simple 4-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-900 tracking-tight">
              How Problex AI Works
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Mastering any complex engineering or competitive exam concept takes less than 30 seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorksSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="relative p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="text-3xl font-display font-black text-blue-100 mb-3">
                    {step.step}
                  </div>
                  <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-navy-900 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* STUDENT SUCCESS & TESTIMONIALS SECTION */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 block mb-2">
              Real Student Reviews
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-900 tracking-tight">
              Loved by Students Across Andhra Pradesh & Telangana
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Here is what students and government job aspirants say about their learning experience with Problex AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-200/90 flex flex-col justify-between shadow-sm hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-6">
                    "{t.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-600 to-brandPurple-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-navy-900">{t.name}</h4>
                    <span className="text-[11px] text-slate-500 block">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* BOTTOM HERO CTA BANNER */}
      <section className="py-16 bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-electric-blue/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 inline-block">
            Start Your Journey Today
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Ready to Experience the Future of AI Learning in Telugu & English?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            No credit card required. Free instant access to our AI Tutor, Study Tools, and Government Exam modules.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/ai-tutor"
              className="px-8 py-3.5 rounded-xl font-bold text-sm text-navy-950 bg-cyan-400 hover:bg-cyan-300 shadow-xl shadow-cyan-400/20 transition-all flex items-center gap-2"
            >
              <span>Launch AI Tutor Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/signup"
              className="px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-navy-800 hover:bg-navy-700 border border-slate-700 transition-all"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
