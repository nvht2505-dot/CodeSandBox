import React, { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  FolderTree, 
  Bot, 
  Cpu, 
  ShieldCheck, 
  CloudUpload, 
  Settings, 
  FileCode2 
} from 'lucide-react';
import { ViewMode, FileItem } from '../types';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  files: FileItem[];
  onSelectFile: (fileId: string) => void;
  onNavigateView: (view: ViewMode) => void;
  onTriggerAgentPipeline: () => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  files,
  onSelectFile,
  onNavigateView,
  onTriggerAgentPipeline,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    { label: 'Run AI Agent Pipeline Loop', icon: Bot, action: () => { onTriggerAgentPipeline(); onClose(); } },
    { label: 'Open Workspace Explorer', icon: FolderTree, action: () => { onNavigateView('workspace'); onClose(); } },
    { label: 'Open Kilo Agent Command Center', icon: Bot, action: () => { onNavigateView('agents'); onClose(); } },
    { label: 'Open Command Code Studio Model Hub', icon: Cpu, action: () => { onNavigateView('models'); onClose(); } },
    { label: 'Run CodeRabbit PR Review Audit', icon: ShieldCheck, action: () => { onNavigateView('git'); onClose(); } },
    { label: 'Open Cloud Deployment Manager', icon: CloudUpload, action: () => { onNavigateView('deploy'); onClose(); } },
    { label: 'Open IDE Preferences', icon: Settings, action: () => { onNavigateView('settings'); onClose(); } },
  ];

  const filteredFiles = files.filter(f => 
    f.type === 'file' && (
      f.name.toLowerCase().includes(query.toLowerCase()) ||
      f.path.toLowerCase().includes(query.toLowerCase())
    )
  );

  const filteredActions = actions.filter(a =>
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-start justify-center pt-16 p-4 font-sans select-none animate-in fade-in duration-100">
      <div className="w-full max-w-lg bg-[#151515] border border-[#2A2A2A] rounded-lg shadow-2xl overflow-hidden flex flex-col font-mono">
        {/* Search Input Bar */}
        <div className="p-2 border-b border-[#2A2A2A] flex items-center space-x-2 bg-[#0D0D0D]">
          <Search className="w-3.5 h-3.5 text-blue-400 ml-1" />
          <input
            type="text"
            autoFocus
            placeholder="Search commands, files..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-xs text-white placeholder-[#666] outline-none font-mono"
          />
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#222] rounded text-[#666] hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Search Results List */}
        <div className="max-h-80 overflow-y-auto p-1.5 space-y-2 text-xs">
          {/* Quick Commands Section */}
          {filteredActions.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[9px] uppercase font-semibold text-[#666] tracking-wider">
                Quick Commands
              </div>
              <div className="space-y-0.5 mt-0.5">
                {filteredActions.map((act, idx) => {
                  const Icon = act.icon;
                  return (
                    <button
                      key={idx}
                      onClick={act.action}
                      className="w-full text-left px-2 py-1 rounded text-[#D1D1D1] hover:bg-[#1A1A1A] hover:text-blue-400 flex items-center justify-between transition group text-[11px]"
                    >
                      <div className="flex items-center space-x-2">
                        <Icon className="w-3.5 h-3.5 text-blue-400" />
                        <span className="font-mono">{act.label}</span>
                      </div>
                      <span className="text-[9px] text-[#555] group-hover:text-[#888] font-mono">
                        Run
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Files Section */}
          {filteredFiles.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[9px] uppercase font-semibold text-[#666] tracking-wider">
                Workspace Files
              </div>
              <div className="space-y-0.5 mt-0.5">
                {filteredFiles.map((file) => (
                  <button
                    key={file.id}
                    onClick={() => {
                      onSelectFile(file.id);
                      onNavigateView('workspace');
                      onClose();
                    }}
                    className="w-full text-left px-2 py-1 rounded text-[#D1D1D1] hover:bg-[#1A1A1A] hover:text-sky-300 flex items-center justify-between transition text-[11px]"
                  >
                    <div className="flex items-center space-x-2">
                      <FileCode2 className="w-3.5 h-3.5 text-sky-400" />
                      <span className="font-mono">{file.path}</span>
                    </div>
                    <span className="text-[9px] text-[#555] font-mono">Open</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
