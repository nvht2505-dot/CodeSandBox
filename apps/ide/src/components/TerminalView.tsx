import React, { useState } from 'react';
import { 
  Terminal as TerminalIcon, 
  AlertTriangle, 
  GitBranch, 
  Trash2, 
  CornerDownLeft, 
  CheckCircle2, 
  XCircle,
  Play,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { TerminalLog } from '../types';

interface TerminalViewProps {
  logs: TerminalLog[];
  onAddLog: (type: 'info' | 'success' | 'warning' | 'error' | 'command', text: string) => void;
  onClearLogs: () => void;
  onRunBuild: () => void;
}

export const TerminalView: React.FC<TerminalViewProps> = ({
  logs,
  onAddLog,
  onClearLogs,
  onRunBuild,
}) => {
  const [activeTab, setActiveTab] = useState<'terminal' | 'problems' | 'git'>('terminal');
  const [commandInput, setCommandInput] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = commandInput.trim();
    if (!cmd) return;

    onAddLog('command', `$ ${cmd}`);
    setCommandInput('');

    const lower = cmd.toLowerCase();
    if (lower === 'clear') {
      onClearLogs();
      return;
    }

    if (lower === 'help') {
      onAddLog('info', 'Available commands: npm run dev, npm run build, npm test, agent status, git status, clear');
      return;
    }

    if (lower.includes('npm run build') || lower.includes('build')) {
      onRunBuild();
      return;
    }

    if (lower.includes('npm run dev')) {
      onAddLog('success', '[vite] dev server running at http://localhost:3000');
      return;
    }

    if (lower.includes('npm test')) {
      onAddLog('info', 'Running Vitest test suite...');
      setTimeout(() => {
        onAddLog('success', '✓ src/App.test.tsx (3 tests passed)');
        onAddLog('success', '✓ src/server.test.ts (2 tests passed)');
        onAddLog('success', 'Test Files 2 passed (2)');
      }, 500);
      return;
    }

    if (lower.includes('agent status')) {
      onAddLog('info', 'CodeSandBox AI Agent Matrix: 6 agents online, Planner (Active), Coder (Editing App.tsx)');
      return;
    }

    if (lower.includes('git status')) {
      onAddLog('info', 'On branch main. Your branch is up to date with "origin/main". Working tree clean.');
      return;
    }

    onAddLog('info', `Executed: ${cmd}`);
  };

  return (
    <div className={`${isCollapsed ? 'h-7' : 'h-32 sm:h-40'} bg-[#111111] border-t border-[#2A2A2A] flex flex-col font-sans select-none z-10 transition-all duration-200 flex-shrink-0`}>
      {/* Terminal Tab Bar */}
      <div className="h-7 bg-[#151515] border-b border-[#2A2A2A] flex items-center justify-between px-2 sm:px-2.5 text-[10px] sm:text-[11px] font-mono">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => {
              setActiveTab('terminal');
              if (isCollapsed) setIsCollapsed(false);
            }}
            className={`px-2 py-0.5 rounded flex items-center space-x-1 transition ${
              activeTab === 'terminal' && !isCollapsed
                ? 'bg-[#0D0D0D] text-blue-400 font-semibold border border-[#2A2A2A]'
                : 'text-[#888] hover:text-white'
            }`}
          >
            <TerminalIcon className="w-3 h-3 text-blue-400 flex-shrink-0" />
            <span>Terminal</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('problems');
              if (isCollapsed) setIsCollapsed(false);
            }}
            className={`px-2 py-0.5 rounded flex items-center space-x-1 transition ${
              activeTab === 'problems' && !isCollapsed
                ? 'bg-[#0D0D0D] text-blue-400 font-semibold border border-[#2A2A2A]'
                : 'text-[#888] hover:text-white'
            }`}
          >
            <AlertTriangle className="w-3 h-3 text-amber-400 flex-shrink-0" />
            <span className="hidden sm:inline">Problems</span>
            <span className="bg-[#1F1F1F] text-[#AAA] text-[9px] px-1 py-0.2 rounded font-mono">
              0
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab('git');
              if (isCollapsed) setIsCollapsed(false);
            }}
            className={`hidden xs:flex px-2 py-0.5 rounded items-center space-x-1 transition ${
              activeTab === 'git' && !isCollapsed
                ? 'bg-[#0D0D0D] text-blue-400 font-semibold border border-[#2A2A2A]'
                : 'text-[#888] hover:text-white'
            }`}
          >
            <GitBranch className="w-3 h-3 text-sky-400 flex-shrink-0" />
            <span>Git</span>
          </button>
        </div>

        <div className="flex items-center space-x-1 sm:space-x-1.5">
          <button
            onClick={onRunBuild}
            className="flex items-center space-x-1 px-1.5 sm:px-2 py-0.5 bg-[#1F1F1F] hover:bg-[#252525] text-[#D1D1D1] text-[9px] sm:text-[10px] rounded transition border border-[#2A2A2A]"
          >
            <Play className="w-3 h-3 text-[#22C55E] flex-shrink-0" />
            <span>Build</span>
          </button>
          <button
            onClick={onClearLogs}
            className="p-1 hover:bg-[#222] rounded text-[#666] hover:text-white transition"
            title="Clear Terminal Logs"
          >
            <Trash2 className="w-3 h-3" />
          </button>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 hover:bg-[#222] rounded text-[#888] hover:text-white transition ml-1"
            title={isCollapsed ? "Expand Terminal" : "Collapse Terminal"}
          >
            {isCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Terminal View Content */}
      {!isCollapsed && (
        <>
          {activeTab === 'terminal' && (
            <div className="flex-1 bg-[#111111] p-2 overflow-y-auto font-mono text-[11px] space-y-0.5 text-[#D1D1D1] select-text">
              {logs.map((log) => (
                <div key={log.id} className="flex items-start space-x-1.5">
                  <span className="text-[#555] text-[9px] select-none pt-0.5 font-mono">{log.timestamp}</span>
                  {log.type === 'command' && <span className="text-[#22C55E] font-semibold">{log.text}</span>}
                  {log.type === 'info' && <span className="text-[#AAA]">{log.text}</span>}
                  {log.type === 'success' && <span className="text-[#22C55E] flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-[#22C55E]" /> {log.text}</span>}
                  {log.type === 'warning' && <span className="text-amber-300">{log.text}</span>}
                  {log.type === 'error' && <span className="text-rose-400 flex items-center gap-1"><XCircle className="w-3 h-3" /> {log.text}</span>}
                </div>
              ))}

              {/* Terminal Interactive Prompt Line */}
              <form onSubmit={handleCommandSubmit} className="flex items-center space-x-1.5 pt-0.5 font-mono">
                <span className="text-[#22C55E] font-bold">$</span>
                <input
                  type="text"
                  value={commandInput}
                  onChange={(e) => setCommandInput(e.target.value)}
                  placeholder="Type command (e.g. 'npm run build', 'agent status')..."
                  className="flex-1 bg-transparent text-white outline-none font-mono text-[11px] placeholder-[#444]"
                />
                <CornerDownLeft className="w-3 h-3 text-[#555]" />
              </form>
            </div>
          )}

          {/* Problems View Content */}
          {activeTab === 'problems' && (
            <div className="flex-1 bg-[#111111] p-3 flex flex-col items-center justify-center text-[#888] text-[11px] font-mono">
              <CheckCircle2 className="w-5 h-5 text-[#22C55E] mb-1" />
              <span className="font-semibold text-white">0 Problems Found</span>
              <span className="text-[10px] text-[#666] mt-0.5">CodeSandBox Debugger Agent verified 12 modules.</span>
            </div>
          )}

          {/* Git Diffs View Content */}
          {activeTab === 'git' && (
            <div className="flex-1 bg-[#111111] p-2 overflow-y-auto font-mono text-[11px] text-[#D1D1D1] space-y-1">
              <div className="text-[#666] text-[10px]">Git Diff • Working Tree:</div>
              <div className="p-2 bg-[#151515] border border-[#2A2A2A] rounded">
                <div className="text-[#22C55E] font-semibold mb-0.5">+++ src/App.tsx</div>
                <div className="text-[#AAA] text-[10px] space-y-0.5">
                  <div className="text-rose-400">- const [counter, setCounter] = useState(0);</div>
                  <div className="text-[#22C55E]">+ const [counter, setCounter] = useState(42);</div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

