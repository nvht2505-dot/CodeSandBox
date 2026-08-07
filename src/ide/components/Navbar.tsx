import React, { useState } from 'react';
import { 
  Box, 
  Search, 
  GitBranch, 
  Rocket, 
  Bell, 
  ChevronDown, 
  FolderGit2, 
  Cpu, 
  CheckCircle2,
  Code2,
  FolderTree,
  Bot,
  Monitor
} from 'lucide-react';
import { ModelProvider } from '../types';

interface NavbarProps {
  currentProject: string;
  setCurrentProject: (proj: string) => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  models: ModelProvider[];
  onOpenSearch: () => void;
  onQuickDeploy: () => void;
  gitBranch: string;
  currentView?: string;
  mobileWorkspaceTab?: 'editor' | 'files' | 'ai' | 'preview';
  setMobileWorkspaceTab?: (tab: 'editor' | 'files' | 'ai' | 'preview') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentProject,
  setCurrentProject,
  selectedModel,
  setSelectedModel,
  models,
  onOpenSearch,
  onQuickDeploy,
  gitBranch,
  currentView,
  mobileWorkspaceTab,
  setMobileWorkspaceTab,
}) => {
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const [showModelMenu, setShowModelMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const projects = [
    'CodeSandBox AI Workspace',
    'Next.js Microservices Hub',
    'E-Commerce Frontend React',
    'Python AI Agent Backend',
  ];

  return (
    <header className="h-10 bg-[#151515] border-b border-[#2A2A2A] text-[#D1D1D1] px-2 sm:px-3 flex items-center justify-between text-xs font-sans select-none z-30 relative w-full max-w-full overflow-hidden flex-shrink-0">
      {/* Left section: Logo & Project Switchers */}
      <div className="flex items-center space-x-1.5 sm:space-x-2.5 min-w-0 flex-shrink-0">
        {/* Brand Logo */}
        <div className="flex items-center space-x-1.5 font-semibold text-white tracking-tight cursor-pointer hover:opacity-90 transition flex-shrink-0">
          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 rounded flex items-center justify-center text-white shadow-sm border border-blue-500/30">
            <Box className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </div>
          <span className="font-bold text-xs tracking-tight text-white flex items-center gap-1">
            <span className="hidden sm:inline">CodeSandBox</span>
            <span className="sm:hidden">CS</span>
            <span className="text-[#22C55E] font-mono text-[9px] bg-[#22C55E]/10 border border-[#22C55E]/20 px-1 py-0.2 rounded">AI</span>
          </span>
        </div>

        <div className="h-3.5 w-px bg-[#2A2A2A] hidden sm:block" />

        {/* Workspace Dropdown */}
        <div className="relative min-w-0 hidden xs:block">
          <button 
            onClick={() => setShowWorkspaceMenu(!showWorkspaceMenu)}
            className="flex items-center space-x-1 px-1.5 sm:px-2 py-0.5 bg-[#1F1F1F] hover:bg-[#252525] border border-[#2A2A2A] rounded text-[#D1D1D1] hover:text-white transition text-[10px] sm:text-[11px]"
          >
            <FolderGit2 className="w-3 h-3 text-[#22C55E] flex-shrink-0" />
            <span className="truncate max-w-[60px] sm:max-w-[130px] font-medium">{currentProject}</span>
            <ChevronDown className="w-3 h-3 text-[#666] flex-shrink-0" />
          </button>

          {showWorkspaceMenu && (
            <div className="absolute top-full left-0 mt-1 w-56 sm:w-60 bg-[#151515] border border-[#2A2A2A] rounded shadow-2xl py-1 z-50">
              <div className="px-2.5 py-1 text-[9px] uppercase font-mono font-semibold text-[#666] tracking-wider">
                Select Workspace Project
              </div>
              {projects.map((proj) => (
                <button
                  key={proj}
                  onClick={() => {
                    setCurrentProject(proj);
                    setShowWorkspaceMenu(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 flex items-center justify-between text-[11px] hover:bg-[#1F1F1F] transition ${
                    proj === currentProject ? 'text-[#22C55E] bg-[#22C55E]/10 font-medium' : 'text-[#D1D1D1]'
                  }`}
                >
                  <span className="truncate">{proj}</span>
                  {proj === currentProject && <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Git Branch Badge */}
        <div className="hidden lg:flex items-center space-x-1 px-2 py-0.5 bg-[#1F1F1F] border border-[#2A2A2A] rounded text-[#888] font-mono text-[10px]">
          <GitBranch className="w-3 h-3 text-sky-400" />
          <span>{gitBranch}</span>
        </div>
      </div>

      {/* Mobile Workspace Tabs directly in Navbar header for clean layout */}
      {currentView === 'workspace' && setMobileWorkspaceTab && (
        <div className="md:hidden flex items-center space-x-1 bg-[#111111] p-0.5 rounded border border-[#2A2A2A]">
          <button
            onClick={() => setMobileWorkspaceTab('editor')}
            className={`px-1.5 py-0.5 rounded flex items-center space-x-1 text-[10px] transition ${
              mobileWorkspaceTab === 'editor' ? 'bg-blue-600 text-white font-semibold' : 'text-[#888]'
            }`}
            title="Code Editor"
          >
            <Code2 className="w-3 h-3" />
            <span className="hidden xs:inline">Code</span>
          </button>
          <button
            onClick={() => setMobileWorkspaceTab('files')}
            className={`px-1.5 py-0.5 rounded flex items-center space-x-1 text-[10px] transition ${
              mobileWorkspaceTab === 'files' ? 'bg-blue-600 text-white font-semibold' : 'text-[#888]'
            }`}
            title="File Explorer"
          >
            <FolderTree className="w-3 h-3" />
            <span className="hidden xs:inline">Files</span>
          </button>
          <button
            onClick={() => setMobileWorkspaceTab('ai')}
            className={`px-1.5 py-0.5 rounded flex items-center space-x-1 text-[10px] transition ${
              mobileWorkspaceTab === 'ai' ? 'bg-blue-600 text-white font-semibold' : 'text-[#888]'
            }`}
            title="AI Agents"
          >
            <Bot className="w-3 h-3" />
            <span className="hidden xs:inline">AI</span>
          </button>
          <button
            onClick={() => setMobileWorkspaceTab('preview')}
            className={`px-1.5 py-0.5 rounded flex items-center space-x-1 text-[10px] transition ${
              mobileWorkspaceTab === 'preview' ? 'bg-blue-600 text-white font-semibold' : 'text-[#888]'
            }`}
            title="Live Preview"
          >
            <Monitor className="w-3 h-3" />
            <span className="hidden xs:inline">App</span>
          </button>
        </div>
      )}

      {/* Center section: Command Search Bar */}
      <div className="flex-1 max-w-sm mx-2 hidden md:block">
        <button
          onClick={onOpenSearch}
          className="w-full bg-[#111111] hover:bg-[#1A1A1A] border border-[#2A2A2A] rounded px-2.5 py-0.5 flex items-center justify-between text-[#888] text-[11px] hover:border-[#333] transition group"
        >
          <div className="flex items-center space-x-2 truncate">
            <Search className="w-3 h-3 text-[#666] group-hover:text-[#AAA] flex-shrink-0" />
            <span className="truncate">Search commands, files, agents...</span>
          </div>
          <kbd className="bg-[#1F1F1F] text-[#888] text-[9px] font-mono px-1 py-0.2 rounded border border-[#2A2A2A] flex-shrink-0">
            Ctrl + K
          </kbd>
        </button>
      </div>

      {/* Right section: Model Switcher, Deploy & Notifications */}
      <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0 ml-auto">
        {/* Active AI Model Switcher */}
        <div className="relative">
          <button
            onClick={() => setShowModelMenu(!showModelMenu)}
            className="flex items-center space-x-1 px-1.5 sm:px-2 py-0.5 bg-[#1F1F1F] hover:bg-[#252525] border border-[#2A2A2A] rounded text-[#D1D1D1] transition text-[10px] sm:text-[11px]"
            title={`Active Model: ${selectedModel}`}
          >
            <Cpu className="w-3 h-3 text-blue-400 flex-shrink-0" />
            <span className="font-medium truncate max-w-[80px] sm:max-w-[110px] hidden md:inline font-mono">{selectedModel}</span>
            <ChevronDown className="w-2.5 h-2.5 text-[#666] flex-shrink-0 hidden xs:inline" />
          </button>

          {showModelMenu && (
            <div className="absolute top-full right-0 mt-1 w-56 bg-[#151515] border border-[#2A2A2A] rounded shadow-2xl py-1 z-50">
              <div className="px-2.5 py-1 text-[9px] uppercase font-mono font-semibold text-[#666] tracking-wider flex justify-between items-center">
                <span>Active Model Router</span>
                <span className="text-[#22C55E]">Multi-Agent</span>
              </div>
              {models.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setSelectedModel(m.name);
                    setShowModelMenu(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 flex items-center justify-between text-[11px] hover:bg-[#1F1F1F] transition ${
                    m.name === selectedModel ? 'text-blue-400 bg-blue-500/10 font-medium' : 'text-[#D1D1D1]'
                  }`}
                >
                  <div>
                    <div className="font-medium text-white">{m.name}</div>
                    <div className="text-[9px] text-[#666] font-mono">{m.provider} • {m.latency}</div>
                  </div>
                  <span className="text-[8px] bg-[#1F1F1F] text-[#AAA] px-1 py-0.2 rounded border border-[#2A2A2A] font-mono">
                    {m.badge}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Deploy Button */}
        <button
          onClick={onQuickDeploy}
          className="flex items-center space-x-1 px-2 sm:px-2.5 py-0.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded shadow-sm border border-blue-400/30 transition text-[10px] sm:text-[11px] flex-shrink-0"
          title="Quick Deploy Application"
        >
          <Rocket className="w-3 h-3 flex-shrink-0" />
          <span className="hidden xs:inline">Deploy</span>
        </button>

        {/* Notifications */}
        <div className="relative flex-shrink-0">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-1 text-[#888] hover:text-white hover:bg-[#1F1F1F] rounded relative transition flex items-center justify-center"
            title="Notifications & Agent Activity"
          >
            <Bell className="w-3.5 h-3.5" />
            <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-pulse" />
          </button>

          {showNotifications && (
            <div className="absolute top-full right-0 mt-1 w-60 sm:w-64 bg-[#151515] border border-[#2A2A2A] rounded shadow-2xl p-2.5 z-50 text-[11px]">
              <div className="font-semibold text-white mb-1.5 flex justify-between items-center border-b border-[#2A2A2A] pb-1.5">
                <span>Agent Activity Log</span>
                <span className="text-[9px] text-[#22C55E] font-mono">Nominal</span>
              </div>
              <div className="space-y-1.5">
                <div className="p-1.5 bg-[#0D0D0D] border border-[#2A2A2A] rounded">
                  <div className="text-white font-medium text-[10px]">Deploy Agent Completed</div>
                  <div className="text-[9px] text-[#888] mt-0.5 font-mono">App preview updated on Cloud Run</div>
                </div>
                <div className="p-1.5 bg-[#0D0D0D] border border-[#2A2A2A] rounded">
                  <div className="text-white font-medium text-[10px]">CodeRabbit Audit Passed</div>
                  <div className="text-[9px] text-[#888] mt-0.5 font-mono">Score: 98/100 (0 security flaws)</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar */}
        <div className="w-5 h-5 rounded bg-blue-600 hidden xs:flex items-center justify-center text-white font-mono text-[9px] font-bold flex-shrink-0">
          CS
        </div>
      </div>
    </header>
  );
};
