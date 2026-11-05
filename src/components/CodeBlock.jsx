import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

export const CodeBlock = ({ code, language = 'cpp', filename = 'Solution.cpp' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-slate-700/80 bg-navy-950 my-4 shadow-xl">
      <div className="flex items-center justify-between px-4 py-2 bg-navy-900 border-b border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-mono text-slate-300 font-medium">{filename}</span>
          <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] uppercase font-mono text-slate-400">
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 hover:text-white transition-colors bg-navy-850 px-2.5 py-1 rounded-md text-xs font-medium"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto text-xs sm:text-sm font-mono text-emerald-300/90 leading-relaxed">
        <pre>{code}</pre>
      </div>
    </div>
  );
};
