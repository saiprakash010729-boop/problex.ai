import React, { useState } from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  FileText, 
  FileCode2, 
  GraduationCap, 
  CheckSquare, 
  Layers, 
  Terminal, 
  Code, 
  BookOpen, 
  Calendar, 
  ArrowRight, 
  Search, 
  Filter,
  CheckCircle2
} from 'lucide-react';
import { STUDY_TOOLS_LIST } from '../data/mockData';
import { ToolModal } from '../components/ToolModal';

export const StudyTools = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalTool, setActiveModalTool] = useState(null);

  const categories = ['All', 'Academic Support', 'Study Efficiency', 'Coding & Tech', 'Productivity', 'Assessment'];

  const iconMap = {
    HelpCircle: HelpCircle,
    FileText: FileText,
    FileCode2: FileCode2,
    GraduationCap: GraduationCap,
    CheckSquare: CheckSquare,
    Layers: Layers,
    Terminal: Terminal,
    Code: Code,
    BookOpen: BookOpen,
    Calendar: Calendar,
  };

  const filteredTools = STUDY_TOOLS_LIST.filter(tool => {
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200 inline-block mb-3">
            10 Intelligent Study Utilities
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-navy-900 tracking-tight">
            AI Study Tools Suite
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Supercharge your study sessions with our specialized AI utilities. From Telugu code explanations to automated 8-mark university answers and Cornell notes.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-white text-slate-600 hover:text-navy-900 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools..."
              className="w-full bg-white text-slate-800 text-xs sm:text-sm pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>

        </div>

        {/* Tools Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredTools.map((tool) => {
            const IconComponent = iconMap[tool.icon] || Sparkles;
            return (
              <div
                key={tool.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`h-14 w-14 rounded-2xl bg-gradient-to-tr ${tool.color} text-white flex items-center justify-center shadow-lg shadow-navy-900/10 group-hover:scale-105 transition-transform`}>
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                      {tool.badge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-display font-bold text-navy-900 group-hover:text-blue-600 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs font-semibold text-blue-600 mt-1">
                    {tool.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                    {tool.description}
                  </p>

                  {/* Key Features Bullets */}
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5">
                    {tool.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-500">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Card Action */}
                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-400">
                    Telugu & English Ready
                  </span>
                  <button
                    onClick={() => setActiveModalTool(tool)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-navy-900 hover:bg-blue-600 shadow-sm transition-all group-hover:shadow-md"
                  >
                    <span>Open Tool</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Empty state if search has no results */}
        {filteredTools.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
            <p className="text-slate-500 text-sm">
              No study tools found matching "{searchQuery}".
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-3 text-xs font-bold text-blue-600 hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}

      </div>

      {/* Interactive Tool Modal */}
      <ToolModal
        tool={activeModalTool}
        isOpen={Boolean(activeModalTool)}
        onClose={() => setActiveModalTool(null)}
      />
    </div>
  );
};
