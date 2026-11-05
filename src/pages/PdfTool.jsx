import React, { useState } from 'react';
import { 
  FileDown, 
  Sparkles, 
  Download, 
  Printer, 
  Plus, 
  Trash2, 
  BookOpen, 
  CheckCircle2, 
  FileText,
  Bookmark
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { downloadPdfDocument, printFormattedDocument } from '../utils/pdfGenerator';

export const PdfTool = () => {
  const { user, savedNotes, showToast } = useApp();

  const [documentTitle, setDocumentTitle] = useState("University Examination Revision Guide");
  const [topicName, setTopicName] = useState("Binary Search Trees & AVL Balancing");
  const [sections, setSections] = useState([
    {
      id: "s1",
      heading: "1. Core Conceptual Definition",
      content: "A Binary Search Tree (BST) is a node-based binary tree data structure with the property that the left subtree contains only nodes with keys less than the node's key, and the right subtree contains only nodes with keys greater than the node's key. AVL trees extend this by guaranteeing O(log n) height through balancing rotations."
    },
    {
      id: "s2",
      heading: "2. Governing Equations & Time Complexity",
      content: "Time Complexity Analysis:\n- Search Operation: Best O(1), Average O(log n), Worst O(n) for skewed BST, O(log n) for AVL.\n- Insertion / Deletion: O(log n) with at most 2 rotations in AVL.\n- Balance Factor: BF = Height(Left Subtree) - Height(Right Subtree) ∈ {-1, 0, 1}."
    },
    {
      id: "s3",
      heading: "3. Real-World Applications & Exam Takeaways",
      content: "1. Operating System Memory Allocation: Maintaining free memory blocks with optimal best-fit searches.\n2. Database Indexing: Fast retrieval of records across primary keys.\n3. Exam Tip: In university 8-mark questions, always draw the 4 AVL rotation cases (LL, RR, LR, RL) with balance factors clearly marked."
    }
  ]);

  const handleAddSection = () => {
    const newSec = {
      id: `s-${Date.now()}`,
      heading: `Section ${sections.length + 1}: Key Notes`,
      content: "Enter your structured notes, formulas, or Telugu explanations here."
    };
    setSections([...sections, newSec]);
  };

  const handleUpdateSection = (id, field, value) => {
    setSections(sections.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleRemoveSection = (id) => {
    if (sections.length === 1) {
      showToast("At least one section is required.");
      return;
    }
    setSections(sections.filter(s => s.id !== id));
  };

  const handleLoadSavedNote = (note) => {
    setDocumentTitle(note.title);
    setTopicName(note.topic || note.category);
    setSections([
      {
        id: "s-loaded-1",
        heading: "Summary & Core Understanding",
        content: note.summary || note.content
      },
      {
        id: "s-loaded-2",
        heading: "Detailed Explanation",
        content: note.content || note.summary
      }
    ]);
    showToast(`Loaded "${note.title.substring(0, 25)}..." into PDF creator!`);
  };

  const handleDownload = () => {
    downloadPdfDocument({
      title: documentTitle,
      topic: topicName,
      studentName: user?.name,
      course: user?.course,
      academicLevel: user?.academicLevel,
      sections
    });
    showToast("PDF document downloaded successfully!");
  };

  const handlePrint = () => {
    printFormattedDocument({
      title: documentTitle,
      topic: topicName,
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/25">
            <FileDown className="w-3.5 h-3.5 text-cyan-400" />
            AI Study Utility #3
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Academic PDF Generator
          </h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Convert AI answers, short notes, and revision summaries into high-quality, formatted printable PDF documents.
          </p>
        </div>

        {/* Quick Load From Library */}
        {savedNotes?.length > 0 && (
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0F172A] border border-slate-700/80 space-y-2">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5 text-blue-400" /> Load Saved Note from Library:
            </span>
            <div className="flex flex-wrap gap-2">
              {savedNotes.map((note) => (
                <button
                  key={note.id}
                  onClick={() => handleLoadSavedNote(note)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:text-white transition-all text-left truncate max-w-xs"
                >
                  📄 {note.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* PDF Metadata Configuration Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0F172A] border border-slate-700/80 shadow-2xl space-y-5">
          <h2 className="text-lg font-display font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            Document Metadata
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Document Title
              </label>
              <input
                type="text"
                value={documentTitle}
                onChange={(e) => setDocumentTitle(e.target.value)}
                placeholder="e.g. University Examination Revision Guide"
                className="w-full text-sm px-4 py-3 rounded-xl border border-slate-700 bg-slate-900 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Topic Name
              </label>
              <input
                type="text"
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
                placeholder="e.g. Binary Search Trees & AVL Balancing"
                className="w-full text-sm px-4 py-3 rounded-xl border border-slate-700 bg-slate-900 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <div>
              Student: <strong className="text-slate-200">{user?.name}</strong> • Course: <strong className="text-slate-200">{user?.course} ({user?.academicLevel})</strong>
            </div>
            <span className="text-cyan-400 font-bold">Auto-Included in PDF Header</span>
          </div>
        </div>

        {/* Sections Builder Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0F172A] border border-slate-700/80 shadow-2xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-display font-bold text-white">
                Formatted Headings & Paragraphs
              </h2>
              <p className="text-xs text-slate-400">Add or edit sections to be rendered in the PDF document.</p>
            </div>
            <button
              onClick={handleAddSection}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Section</span>
            </button>
          </div>

          <div className="space-y-4">
            {sections.map((sec, idx) => (
              <div key={sec.id} className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <input
                    type="text"
                    value={sec.heading}
                    onChange={(e) => handleUpdateSection(sec.id, 'heading', e.target.value)}
                    className="font-bold text-sm text-cyan-300 bg-transparent border-b border-slate-700 focus:border-cyan-400 focus:outline-none flex-1 pb-1"
                  />
                  <button
                    onClick={() => handleRemoveSection(sec.id)}
                    className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <textarea
                  rows={4}
                  value={sec.content}
                  onChange={(e) => handleUpdateSection(sec.id, 'content', e.target.value)}
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-800 bg-slate-950 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-mono leading-relaxed resize-y"
                ></textarea>
              </div>
            ))}
          </div>

          {/* Action Download Buttons */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-400">
              Ready to generate formatted PDF with header, topic, and watermark.
            </span>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handlePrint}
                className="flex-1 sm:flex-none px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>Print Preview</span>
              </button>

              <button
                onClick={handleDownload}
                className="flex-1 sm:flex-none px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-brandPurple-600 hover:opacity-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xl shadow-blue-500/25 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF Button</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
