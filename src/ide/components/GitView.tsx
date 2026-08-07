import React, { useState } from 'react';
import { 
  GitBranch, 
  GitCommit, 
  ShieldCheck, 
  MessageSquareCode
} from 'lucide-react';
import { GitBranch as GitBranchType, FileItem } from '../types';

interface GitViewProps {
  branches: GitBranchType[];
  currentBranch: string;
  onSwitchBranch: (branchName: string) => void;
  activeFile: FileItem | null;
  onRunCodeRabbitAudit: (code: string) => void;
}

export const GitView: React.FC<GitViewProps> = ({
  branches,
  currentBranch,
  onSwitchBranch,
  activeFile,
}) => {
  const [commitMessage, setCommitMessage] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<string | null>(null);

  const handleAuditClick = async () => {
    setIsAuditing(true);
    try {
      const res = await fetch('/api/ai/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: activeFile?.content || '',
          filename: activeFile?.name || 'App.tsx',
        }),
      });
      const data = await res.json();
      setAuditResult(data.review);
    } catch (e) {
      console.error('Audit error:', e);
    } finally {
      setIsAuditing(false);
    }
  };

  return (
    <div className="p-4 bg-[#0D0D0D] text-[#D1D1D1] h-full space-y-4 overflow-y-auto font-sans">
      {/* Header */}
      <div className="flex justify-between items-center bg-[#151515] border border-[#2A2A2A] rounded-lg p-4 font-mono">
        <div>
          <div className="flex items-center space-x-1.5 text-[11px] text-rose-400 mb-0.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>CodeRabbit AI Automated Code Reviewer</span>
          </div>
          <h2 className="text-base font-bold text-white tracking-tight">Git & CodeRabbit Audit Studio</h2>
          <p className="text-[11px] text-[#888] mt-0.5 max-w-xl">
            Branch manager, commit staging, and CodeRabbit security analysis engine for pull requests.
          </p>
        </div>

        <button
          onClick={handleAuditClick}
          disabled={isAuditing}
          className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-mono font-medium rounded border border-rose-400/30 text-[11px] flex items-center gap-1.5 transition active:scale-[0.98] disabled:opacity-50"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{isAuditing ? 'Auditing Code...' : 'Run CodeRabbit Audit'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Branch & Commit Panel */}
        <div className="space-y-3 font-mono">
          <div className="bg-[#151515] border border-[#2A2A2A] rounded-lg p-3.5">
            <h3 className="text-[10px] font-bold text-[#666] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <GitBranch className="w-3.5 h-3.5 text-sky-400" /> Git Branches
            </h3>

            <div className="space-y-1.5">
              {branches.map((b) => (
                <div
                  key={b.name}
                  onClick={() => onSwitchBranch(b.name)}
                  className={`p-2 rounded border cursor-pointer transition ${
                    b.name === currentBranch
                      ? 'bg-sky-500/15 border-sky-500/40 text-sky-300 font-medium'
                      : 'bg-[#0D0D0D] border-[#2A2A2A] text-[#888] hover:bg-[#1F1F1F]'
                  }`}
                >
                  <div className="flex justify-between items-center mb-0.5 text-xs">
                    <span className="font-semibold flex items-center gap-1 text-white">
                      <GitBranch className="w-3 h-3 text-sky-400" />
                      {b.name}
                    </span>
                    {b.name === currentBranch && (
                      <span className="text-[9px] bg-sky-500/20 text-sky-300 px-1 py-0.2 rounded font-mono">
                        Active
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-[#666] truncate">{b.lastCommit}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#151515] border border-[#2A2A2A] rounded-lg p-3.5">
            <h3 className="text-[10px] font-bold text-[#666] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <GitCommit className="w-3.5 h-3.5 text-[#22C55E]" /> Stage & Commit Changes
            </h3>

            <textarea
              rows={3}
              value={commitMessage}
              onChange={(e) => setCommitMessage(e.target.value)}
              placeholder="Commit summary (e.g. 'feat: implement Agent Command Center')..."
              className="w-full bg-[#0D0D0D] border border-[#2A2A2A] rounded p-2 text-[11px] font-mono text-[#D1D1D1] placeholder-[#555] outline-none focus:border-blue-500/50 mb-2"
            />

            <button
              onClick={() => {
                alert(`Committed to ${currentBranch}: "${commitMessage || 'chore: workspace update'}"`);
                setCommitMessage('');
              }}
              className="w-full py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-mono rounded text-[11px] font-medium transition active:scale-[0.98]"
            >
              Commit & Sync
            </button>
          </div>
        </div>

        {/* CodeRabbit Review Output Panel */}
        <div className="lg:col-span-2 bg-[#151515] border border-[#2A2A2A] rounded-lg p-4 font-mono">
          <div className="flex justify-between items-center mb-3 border-b border-[#2A2A2A] pb-2">
            <div className="flex items-center space-x-1.5">
              <MessageSquareCode className="w-3.5 h-3.5 text-rose-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">CodeRabbit PR Audit Output</h3>
            </div>
            <span className="text-[11px] text-rose-400 font-mono font-semibold">
              Score: 98/100
            </span>
          </div>

          {auditResult ? (
            <div className="max-w-none text-[11px] text-[#D1D1D1] space-y-2 leading-relaxed font-mono bg-[#0D0D0D] p-3 rounded border border-[#2A2A2A]">
              <pre className="whitespace-pre-wrap font-mono text-[11px]">{auditResult}</pre>
            </div>
          ) : (
            <div className="bg-[#0D0D0D] p-5 rounded border border-[#2A2A2A] text-center space-y-2">
              <ShieldCheck className="w-8 h-8 text-rose-400 mx-auto" />
              <h4 className="font-semibold text-white text-xs">CodeRabbit Automated Review Engine</h4>
              <p className="text-[11px] text-[#888] max-w-md mx-auto">
                Click <strong>"Run CodeRabbit Audit"</strong> to scan active file <span className="text-white font-mono">{activeFile?.name || 'App.tsx'}</span> for memory leaks, security vulnerabilities, and code formatting standards.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};