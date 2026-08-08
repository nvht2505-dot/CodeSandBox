import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  Copy, 
  Check, 
  Code2, 
  FileCode2,
  Wand2
} from 'lucide-react';
import { FileItem } from '../types';

interface CodeEditorProps {
  openFiles: FileItem[];
  activeFile: FileItem | null;
  onSelectTab: (fileId: string) => void;
  onCloseTab: (fileId: string) => void;
  onContentChange: (fileId: string, newContent: string) => void;
  onRunAgentOnCode: (prompt: string, code: string) => void;
  onTriggerCodeRabbitReview: (code: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  openFiles,
  activeFile,
  onSelectTab,
  onCloseTab,
  onContentChange,
  onRunAgentOnCode,
  onTriggerCodeRabbitReview,
}) => {
  const [copied, setCopied] = useState(false);
  const [inlinePrompt, setInlinePrompt] = useState('');
  const [showInlineAI, setShowInlineAI] = useState(false);

  if (!activeFile) {
    return (
      <div className="flex-1 bg-[#0D0D0D] flex flex-col items-center justify-center text-[#666] font-sans p-6">
        <div className="w-10 h-10 bg-[#151515] rounded flex items-center justify-center text-blue-400 mb-2 border border-[#2A2A2A]">
          <Code2 className="w-5 h-5" />
        </div>
        <h3 className="text-xs font-mono font-semibold text-[#AAA]">No File Selected</h3>
        <p className="text-[11px] font-mono text-[#666] mt-1 max-w-xs text-center">
          Select a file from the Workspace Explorer or trigger an AI Agent.
        </p>
      </div>
    );
  }

  const lines = (activeFile.content || '').split('\n');

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeFile.content || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInlineAISubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inlinePrompt.trim()) return;
    onRunAgentOnCode(inlinePrompt, activeFile.content || '');
    setInlinePrompt('');
    setShowInlineAI(false);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0D0D0D] h-full select-none overflow-hidden font-sans border-r border-[#2A2A2A]">
      {/* File Tabs Bar */}
      <div className="h-8 bg-[#111111] border-b border-[#2A2A2A] flex items-center overflow-x-auto text-[11px] scrollbar-none font-mono">
        {openFiles.map((file) => {
          const isActive = activeFile.id === file.id;
          return (
            <div
              key={file.id}
              onClick={() => onSelectTab(file.id)}
              className={`h-full flex items-center space-x-1.5 px-2.5 border-r border-[#2A2A2A] cursor-pointer transition ${
                isActive
                  ? 'bg-[#0D0D0D] text-blue-400 font-semibold border-t-2 border-t-blue-500'
                  : 'bg-[#151515] text-[#888] hover:text-[#D1D1D1] hover:bg-[#1A1A1A]'
              }`}
            >
              <FileCode2 className="w-3.5 h-3.5 text-sky-400" />
              <span className="truncate max-w-[120px]">{file.name}</span>
              {file.isModified && <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseTab(file.id);
                }}
                className="p-0.5 hover:bg-[#222] rounded text-[#666] hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Editor Sub-Header Toolbar */}
      <div className="h-7 bg-[#151515] border-b border-[#2A2A2A] px-2 sm:px-2.5 flex items-center justify-between text-[10px] sm:text-[11px] text-[#888] font-mono overflow-hidden flex-shrink-0">
        <div className="flex items-center space-x-1.5 sm:space-x-2 truncate min-w-0">
          <span className="text-white font-semibold truncate max-w-[100px] sm:max-w-[200px]">{activeFile.name}</span>
          <span className="text-[#444]">•</span>
          <span className="flex-shrink-0">{lines.length} L</span>
          <span className="text-[#444] hidden xs:inline">•</span>
          <span className="text-[#22C55E] uppercase hidden xs:inline flex-shrink-0">{activeFile.language || 'ts'}</span>
        </div>

        <div className="flex items-center space-x-1 sm:space-x-1.5 flex-shrink-0">
          {/* Quick AI Refactor / Instruction */}
          <button
            onClick={() => setShowInlineAI(!showInlineAI)}
            className="flex items-center space-x-1 px-1.5 sm:px-2 py-0.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 rounded text-[9px] sm:text-[10px] font-medium transition"
            title="Ask AI Agent to modify code"
          >
            <Sparkles className="w-3 h-3 text-blue-400 flex-shrink-0" />
            <span className="hidden sm:inline">Ask AI Agent</span>
            <span className="sm:hidden">AI</span>
          </button>

          {/* CodeRabbit Review Trigger */}
          <button
            onClick={() => onTriggerCodeRabbitReview(activeFile.content || '')}
            className="flex items-center space-x-1 px-1.5 sm:px-2 py-0.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 rounded text-[9px] sm:text-[10px] transition"
            title="CodeRabbit Audit"
          >
            <ShieldCheck className="w-3 h-3 text-rose-400 flex-shrink-0" />
            <span className="hidden sm:inline">Audit</span>
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopyCode}
            className="p-1 hover:bg-[#222] rounded text-[#888] hover:text-white transition flex-shrink-0"
            title="Copy file code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Inline AI Agent Prompt Box */}
      {showInlineAI && (
        <form 
          onSubmit={handleInlineAISubmit}
          className="bg-[#151515] border-b border-blue-500/30 p-1.5 flex items-center space-x-2 animate-in fade-in duration-150"
        >
          <Wand2 className="w-3.5 h-3.5 text-blue-400 ml-1" />
          <input
            type="text"
            autoFocus
            placeholder={`Instruct AI Agent to edit ${activeFile.name}...`}
            value={inlinePrompt}
            onChange={(e) => setInlinePrompt(e.target.value)}
            className="flex-1 bg-[#0D0D0D] border border-[#2A2A2A] rounded px-2.5 py-0.5 text-[11px] text-white placeholder-[#555] focus:outline-none focus:border-blue-500/50 font-mono"
          />
          <button
            type="submit"
            className="px-2.5 py-0.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-[10px] font-mono font-medium transition"
          >
            Execute
          </button>
        </form>
      )}

      {/* Code Editor Body with Line Numbers */}
      <div className="flex-1 flex overflow-hidden font-mono text-[13px] leading-relaxed bg-[#0D0D0D] text-[#D1D1D1]">
        {/* Line Numbers Column */}
        <div className="w-10 bg-[#0F0F0F] border-r border-[#222] text-[#444] text-right pr-2 py-2 select-none flex flex-col font-mono text-[11px] leading-relaxed">
          {lines.map((_, idx) => (
            <div key={idx} className="h-5 flex items-center justify-end">
              {idx + 1}
            </div>
          ))}
        </div>

        {/* Editable Code Area */}
        <textarea
          value={activeFile.content || ''}
          onChange={(e) => onContentChange(activeFile.id, e.target.value)}
          spellCheck={false}
          className="flex-1 bg-[#0D0D0D] text-[#FFFFFF] p-2 outline-none resize-none font-mono text-[13px] leading-relaxed selection:bg-blue-600/30 whitespace-pre scrollbar-thin scrollbar-thumb-[#222]"
        />
      </div>
    </div>
  );
};

