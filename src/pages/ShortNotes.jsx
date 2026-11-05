import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  Bookmark, 
  RefreshCw, 
  ArrowRight, 
  BookOpen, 
  Lightbulb, 
  HelpCircle,
  Clock,
  Printer
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { downloadPdfDocument, printFormattedDocument } from '../utils/pdfGenerator';

export const ShortNotes = () => {
  const { user, addSavedNote, showToast } = useApp();

  const [topicInput, setTopicInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [notesData, setNotesData] = useState(null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  // Suggested curriculum topics based on course
  const suggestedTopics = user?.course === 'B.Tech' ? [
    "Process Scheduling Algorithms (FCFS, SJF, Round Robin)",
    "Binary Search Tree & AVL Trees",
    "Normalization in DBMS (1NF, 2NF, 3NF, BCNF)",
    "Second Law of Thermodynamics & Entropy",
    "Ohm's Law & Kirchhoff's Laws (KVL & KCL)",
    "TCP/IP vs OSI Reference Model"
  ] : [
    "Fundamental Rights (Articles 12 to 35) & Writs",
    "Indus Valley Civilization & Major Sites",
    "Time and Work Shortcuts (LCM Method)",
    "Inflation: Types, Causes & RBI Monetary Policy",
    "Governor's Constitutional Powers (Article 153 to 162)",
    "Indian National Congress Sessions (1885 - 1947)"
  ];

  const handleGenerateNotes = async (topicToUse) => {
    const topic = topicToUse || topicInput;
    if (!topic.trim()) {
      showToast("Please enter or select a topic to generate short notes.");
      return;
    }

    setLoading(true);
    setSaved(false);
    const res = await api.generateShortNotes({
      topic: topic.trim(),
      course: user?.course || 'B.Tech',
      academicLevel: user?.academicLevel || '3rd Year'
    });
    setLoading(false);

    if (res.success && res.notes) {
      setNotesData(res.notes);
      showToast("Short notes generated successfully!");
    } else {
      showToast("Failed to generate notes. Please try again.");
    }
  };

  const handleCopyNotes = () => {
    if (!notesData) return;
    const text = `PROBLEX AI - SHORT NOTES: ${notesData.title}
Course: ${notesData.course} (${notesData.academicLevel})
Generated: ${notesData.generatedAt}

1. DEFINITIONS:
${notesData.definitions.map(d => `• ${d}`).join('\n')}

2. IMPORTANT POINTS:
${notesData.importantPoints.map(p => `• ${p}`).join('\n')}

3. KEY FORMULAS / CODE / RULES:
${notesData.keyFormulas.map(f => `• ${f}`).join('\n')}

4. REAL-LIFE EXAMPLES:
${notesData.examples.map(e => `• ${e}`).join('\n')}

5. QUICK REVISION SUMMARY:
${notesData.revisionSummary}
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast("Notes copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToLibrary = () => {
    if (!notesData) return;
    addSavedNote({
      title: `${notesData.title} - Short Revision Notes`,
      topic: notesData.title,
      category: `${user?.course} (${user?.academicLevel})`,
      summary: notesData.revisionSummary,
      content: notesData.definitions.join(' ')
    });
    setSaved(true);
  };

  const handleDownloadPdf = () => {
    if (!notesData) return;
    const sections = [
      { heading: "1. Short Definitions", content: notesData.definitions.map(d => `• ${d}`).join('\n') },
      { heading: "2. Important Exam Points", content: notesData.importantPoints.map(p => `• ${p}`).join('\n') },
      { heading: "3. Key Formulas & Governing Principles", content: notesData.keyFormulas.map(f => `• ${f}`).join('\n') },
      { heading: "4. Real-Life Examples & Analogies", content: notesData.examples.map(e => `• ${e}`).join('\n') },
      { heading: "5. 60-Second Quick Revision Summary", content: notesData.revisionSummary }
    ];

    downloadPdfDocument({
      title: `Short Notes: ${notesData.title}`,
      topic: notesData.title,
      studentName: user?.name,
      course: user?.course,
      academicLevel: user?.academicLevel,
      sections
    });
    showToast("PDF document downloaded successfully!");
  };

  const handlePrintPdf = () => {
    if (!notesData) return;
    const sections = [
      { heading: "1. Short Definitions", content: notesData.definitions.map(d => `• ${d}`).join('\n') },
      { heading: "2. Important Exam Points", content: notesData.importantPoints.map(p => `• ${p}`).join('\n') },
      { heading: "3. Key Formulas & Governing Principles", content: notesData.keyFormulas.map(f => `• ${f}`).join('\n') },
      { heading: "4. Real-Life Examples & Analogies", content: notesData.examples.map(e => `• ${e}`).join('\n') },
      { heading: "5. 60-Second Quick Revision Summary", content: notesData.revisionSummary }
    ];

    printFormattedDocument({
      title: `Short Notes: ${notesData.title}`,
      topic: notesData.title,
      studentName: user?.name,
      course: user?.course,
      academicLevel: user?.academicLevel,
      sections
    });
  };

  return (
    <div className="min-h-screen bg-[#0A1128] text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-blue-500/10 text-cyan-300 border border-blue-500/25">
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            AI Study Utility #1
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Short Notes Generator
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Generate concise definitions, high-weightage bullet points, core formulas, practical examples, and 60-second exam summaries for any topic.
          </p>
        </div>

        {/* Input Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0F172A] border border-slate-700/80 shadow-2xl space-y-5">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
            Enter Topic or Chapter Name ({user?.course} • {user?.academicLevel})
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerateNotes()}
              placeholder="e.g. Process Scheduling in OS, or Fundamental Rights Articles 12-35"
              className="flex-1 px-4 py-3.5 rounded-2xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-sm"
            />
            <button
              onClick={() => handleGenerateNotes()}
              disabled={loading}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-brandPurple-600 hover:opacity-95 text-white font-bold text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 shrink-0 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-cyan-300" />
                  <span>Synthesizing Notes...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Short Notes</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Suggestions */}
          <div>
            <span className="text-xs text-slate-400 font-semibold mb-2 block">
              Suggested High-Weightage Topics for You:
            </span>
            <div className="flex flex-wrap gap-2">
              {suggestedTopics.map((t, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTopicInput(t);
                    handleGenerateNotes(t);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:text-white transition-all text-left"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notes Output Card */}
        {notesData && (
          <div className="p-6 sm:p-10 rounded-3xl bg-[#0F172A] border border-slate-700/80 shadow-2xl space-y-8 animate-in fade-in duration-300">
            
            {/* Top Bar Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
              <div>
                <span className="text-xs uppercase font-bold text-cyan-400 tracking-wider">
                  {notesData.course} • {notesData.academicLevel}
                </span>
                <h2 className="text-2xl font-display font-extrabold text-white mt-0.5">
                  {notesData.title}
                </h2>
                <span className="text-xs text-slate-400">Generated on {notesData.generatedAt}</span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleCopyNotes}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>

                <button
                  onClick={handleSaveToLibrary}
                  disabled={saved}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    saved 
                      ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/30' 
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{saved ? "Saved to Library" : "Save Note"}</span>
                </button>

                <button
                  onClick={handlePrintPdf}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Preview</span>
                </button>

                <button
                  onClick={handleDownloadPdf}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-90 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-500/20 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>

            {/* 1. Short Definitions */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-cyan-300 flex items-center gap-2">
                <span className="h-6 w-6 rounded-lg bg-cyan-950/60 border border-cyan-400/40 flex items-center justify-center text-xs text-cyan-300 font-bold">1</span>
                Short Definitions
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                {notesData.definitions.map((def, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-sm text-slate-200 leading-relaxed">
                    {def}
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Important Exam Points */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-blue-300 flex items-center gap-2">
                <span className="h-6 w-6 rounded-lg bg-blue-950/60 border border-blue-400/40 flex items-center justify-center text-xs text-blue-300 font-bold">2</span>
                Important Points (Exam-Oriented)
              </h3>
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                {notesData.importantPoints.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <span className="text-blue-400 font-bold mt-0.5">•</span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Key Formulas / Code / Rules */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-brandPurple-300 flex items-center gap-2">
                <span className="h-6 w-6 rounded-lg bg-purple-950/60 border border-brandPurple-400/40 flex items-center justify-center text-xs text-purple-300 font-bold">3</span>
                Key Formulas & Governing Principles
              </h3>
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 font-mono text-xs text-cyan-200">
                {notesData.keyFormulas.map((f, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Examples & Analogies */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
                <span className="h-6 w-6 rounded-lg bg-amber-950/60 border border-amber-400/40 flex items-center justify-center text-xs text-amber-300 font-bold">4</span>
                Real-Life Examples & Practical Analogies
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {notesData.examples.map((ex, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-sm text-slate-300 flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{ex}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Quick Revision Summary */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
                <span className="h-6 w-6 rounded-lg bg-emerald-950/60 border border-emerald-400/40 flex items-center justify-center text-xs text-emerald-300 font-bold">5</span>
                60-Second Quick Revision Notes
              </h3>
              <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-200 text-sm leading-relaxed">
                {notesData.revisionSummary}
              </div>
            </div>

            {/* Bottom Download Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900/30 via-indigo-900/30 to-purple-900/30 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-sm font-bold text-white block">Save this document for offline exam preparation?</span>
                <span className="text-xs text-slate-400">Download formatted PDF with clear headings, topic title, and formulas.</span>
              </div>
              <button
                onClick={handleDownloadPdf}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 shrink-0 shadow-lg shadow-blue-500/20"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF Document</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
