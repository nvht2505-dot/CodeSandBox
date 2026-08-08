import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { WorkspaceExplorer } from './components/WorkspaceExplorer';
import { CodeEditor } from './components/CodeEditor';
import { TerminalView } from './components/TerminalView';
import { AgentCommandCenter } from './components/AgentCommandCenter';
import { LivePreview } from './components/LivePreview';
import { AIChatView } from './components/AIChatView';
import { ModelsView } from './components/ModelsView';
import { GitView } from './components/GitView';
import { DeployView } from './components/DeployView';
import { ExtensionsView } from './components/ExtensionsView';
import { SettingsView } from './components/SettingsView';
import { StatusBar } from './components/StatusBar';
import { QuickSearchModal } from './components/QuickSearchModal';
import { Code2, FolderTree, Bot, Monitor } from 'lucide-react';

import { 
  INITIAL_FILES, 
  INITIAL_AGENTS, 
  INITIAL_TIMELINE, 
  MODEL_PROVIDERS, 
  INITIAL_GIT_BRANCHES 
} from './data/initialWorkspace';
import { 
  ViewMode, 
  FileItem, 
  AgentInfo, 
  TimelineStep, 
  ModelProvider, 
  SettingsState,
  TerminalLog 
} from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('workspace');
  const [currentProject, setCurrentProject] = useState('CodeSandBox AI Workspace');
  const [selectedModel, setSelectedModel] = useState('Gemini 2.5 Flash');
  const [gitBranch, setGitBranch] = useState('main');

  // Files & Tabs State
  const [files, setFiles] = useState<FileItem[]>(INITIAL_FILES);
  const [openFileIds, setOpenFileIds] = useState<string[]>(['file-app-tsx', 'file-main-tsx', 'file-server-ts']);
  const [activeFileId, setActiveFileId] = useState<string | null>('file-app-tsx');

  // Agents & Timeline State
  const [agents, setAgents] = useState<AgentInfo[]>(INITIAL_AGENTS);
  const [timeline, setTimeline] = useState<TimelineStep[]>(INITIAL_TIMELINE);
  const [models] = useState<ModelProvider[]>(MODEL_PROVIDERS);

  // Right Panel Display Mode: 'agent-center' or 'live-preview'
  const [rightPanelMode, setRightPanelMode] = useState<'agent-center' | 'live-preview'>('agent-center');
  // Mobile Tab in Workspace View: 'editor' | 'files' | 'ai' | 'preview'
  const [mobileWorkspaceTab, setMobileWorkspaceTab] = useState<'editor' | 'files' | 'ai' | 'preview'>('editor');

  // Terminal Logs State
  const [terminalLogs, setTerminalLogs] = useState<TerminalLog[]>([
    { id: '1', timestamp: '09:20:00', type: 'info', text: 'CodeSandBox AI Studio initialized.' },
    { id: '2', timestamp: '09:20:01', type: 'success', text: '[vite] dev server running on http://localhost:3000' },
    { id: '3', timestamp: '09:20:02', type: 'info', text: 'Agent Command Center active. 6 agents online.' },
  ]);

  // Settings State
  const [settings, setSettings] = useState<SettingsState>({
    theme: 'dark',
    fontSize: 13,
    tabSize: 2,
    wordWrap: true,
    autoSave: true,
    minimap: true,
    lineNumbers: true,
    codeRabbitAutoReview: true,
    agentAutoFix: true,
    telemetry: true,
    defaultModel: 'Gemini 2.5 Flash',
  });

  // Modal State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isReloadingPreview, setIsReloadingPreview] = useState(false);

  // Handlers for File Management
  const handleSelectFile = (fileId: string) => {
    if (activeFileId === fileId) {
      // Click again on active file to hide / close its tab
      handleCloseTab(fileId);
    } else {
      if (!openFileIds.includes(fileId)) {
        setOpenFileIds(prev => [...prev, fileId]);
      }
      setActiveFileId(fileId);
    }
  };

  const handleCloseTab = (fileId: string) => {
    const updated = openFileIds.filter(id => id !== fileId);
    setOpenFileIds(updated);
    if (activeFileId === fileId) {
      setActiveFileId(updated.length > 0 ? updated[updated.length - 1] : null);
    }
  };

  const handleContentChange = (fileId: string, newContent: string) => {
    setFiles(prev => prev.map(f => f.id === fileId ? { ...f, content: newContent, isModified: true } : f));
  };

  const handleCreateFile = (name: string, isFolder: boolean) => {
    const newFile: FileItem = {
      id: `file-${Date.now()}`,
      name,
      path: isFolder ? name : `src/${name}`,
      type: isFolder ? 'folder' : 'file',
      language: name.endsWith('.tsx') || name.endsWith('.ts') ? 'typescript' : 'javascript',
      parentId: isFolder ? null : 'root-src',
      content: isFolder ? undefined : `// New ${name} created in CodeSandBox AI\n`,
    };
    setFiles(prev => [...prev, newFile]);
    if (!isFolder) {
      handleSelectFile(newFile.id);
    }
  };

  const handleDeleteFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    handleCloseTab(fileId);
  };

  // Handlers for Agent Pipeline Loop
  const handleTriggerPipeline = async () => {
    addTerminalLog('command', '$ agent run pipeline');
    addTerminalLog('info', 'CodeSandBox AI Agent Matrix executing step-by-step task loop...');

    const newStep: TimelineStep = {
      id: `step-${Date.now()}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      agent: 'Coder',
      agentIcon: 'Code2',
      status: 'success',
      title: 'Agent Loop Execution ✓',
      details: `Executed multi-agent code optimization on ${activeFile?.name || 'App.tsx'}. Hot reload re-verified.`,
      duration: '0.8s',
      tokensUsed: 620,
    };

    setTimeline(prev => [newStep, ...prev]);

    try {
      const res = await fetch('/api/ai/agent-run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: 'Execute CodeSandBox optimization loop',
          agentName: 'Coder',
          activeFile: activeFile?.path,
        }),
      });
      const data = await res.json();
      addTerminalLog('success', `Agent ${data.agent || 'Coder'} completed task in ${data.time}.`);
    } catch (e) {
      console.error(e);
      addTerminalLog('success', 'Agent Matrix loop completed successfully.');
    }
  };

  const handleRunSingleAgent = (agentId: string) => {
    const ag = agents.find(a => a.id === agentId);
    if (!ag) return;
    addTerminalLog('info', `Triggered ${ag.name} agent manually. Running analysis...`);
    setTimeout(() => {
      addTerminalLog('success', `${ag.name} agent completed analysis with 0 errors.`);
    }, 600);
  };

  // Terminal Log helper
  const addTerminalLog = (type: 'info' | 'success' | 'warning' | 'error' | 'command', text: string) => {
    const newLog: TerminalLog = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      type,
      text,
    };
    setTerminalLogs(prev => [...prev, newLog]);
  };

  // CodeRabbit Audit Trigger
  const handleTriggerCodeRabbitReview = async (code: string) => {
    addTerminalLog('info', 'CodeRabbit AI Review Engine analyzing active file...');
    setCurrentView('git');
  };

  // Active File object
  const openFiles = files.filter(f => openFileIds.includes(f.id));
  const activeFile = files.find(f => f.id === activeFileId) || null;

  return (
    <div className="flex flex-col h-screen w-screen bg-[#0D0D0D] text-[#D1D1D1] font-sans overflow-hidden">
      {/* Top Header Navbar */}
      <Navbar
        currentProject={currentProject}
        setCurrentProject={setCurrentProject}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        models={models}
        onOpenSearch={() => setIsSearchOpen(true)}
        onQuickDeploy={() => setCurrentView('deploy')}
        gitBranch={gitBranch}
        currentView={currentView}
        mobileWorkspaceTab={mobileWorkspaceTab}
        setMobileWorkspaceTab={setMobileWorkspaceTab}
      />

      {/* Central Workspace Canvas Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Primary Sidebar */}
        <Sidebar currentView={currentView} setCurrentView={setCurrentView} />

        {/* Dynamic View Switcher */}
        {currentView === 'workspace' && (
          <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden min-w-0">
            {/* Workspace Explorer File Tree */}
            <div className={`h-full ${mobileWorkspaceTab === 'files' ? 'flex w-full' : 'hidden'} md:flex md:w-52 lg:w-56 flex-shrink-0 min-w-0 overflow-hidden`}>
              <WorkspaceExplorer
                files={files}
                activeFileId={activeFileId}
                onSelectFile={(fId) => {
                  handleSelectFile(fId);
                  setMobileWorkspaceTab('editor');
                }}
                onCreateFile={handleCreateFile}
                onDeleteFile={handleDeleteFile}
                onAskAIToModify={(file) => {
                  handleSelectFile(file.id);
                  setCurrentView('aichat');
                }}
              />
            </div>

            {/* Middle IDE Pane: Code Editor + Terminal / Problems */}
            <div className={`flex-1 flex-col h-full min-w-0 overflow-hidden ${mobileWorkspaceTab === 'editor' ? 'flex w-full' : 'hidden md:flex'}`}>
              <CodeEditor
                openFiles={openFiles}
                activeFile={activeFile}
                onSelectTab={setActiveFileId}
                onCloseTab={handleCloseTab}
                onContentChange={handleContentChange}
                onRunAgentOnCode={(prompt) => {
                  handleTriggerPipeline();
                }}
                onTriggerCodeRabbitReview={handleTriggerCodeRabbitReview}
              />

              <TerminalView
                logs={terminalLogs}
                onAddLog={addTerminalLog}
                onClearLogs={() => setTerminalLogs([])}
                onRunBuild={() => {
                  addTerminalLog('command', '$ npm run build');
                  addTerminalLog('info', 'Compiling TypeScript and bundling Vite assets...');
                  setTimeout(() => {
                    addTerminalLog('success', '✓ Build completed in 1.2s. 0 errors.');
                  }, 800);
                }}
              />
            </div>

            {/* Right Pane: AI Command Center (Agent Matrix & Timeline) OR Live Preview Toggle */}
            <div className={`flex-col h-full border-l border-[#2A2A2A] min-w-0 overflow-hidden ${
              mobileWorkspaceTab === 'ai' || mobileWorkspaceTab === 'preview' 
                ? 'flex w-full' 
                : 'hidden lg:flex lg:w-80 flex-shrink-0'
            }`}>
              {/* Top Toggle Switcher for Right Pane */}
              <div className="h-8 bg-[#0D0D0D] border-b border-[#2A2A2A] px-2 flex items-center justify-between text-xs font-sans flex-shrink-0">
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => {
                      setRightPanelMode('agent-center');
                      setMobileWorkspaceTab('ai');
                    }}
                    className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition ${
                      (rightPanelMode === 'agent-center' && mobileWorkspaceTab !== 'preview') || mobileWorkspaceTab === 'ai'
                        ? 'bg-[#1F1F1F] text-blue-400 font-semibold'
                        : 'text-[#888] hover:text-[#D1D1D1]'
                    }`}
                  >
                    AI Command Center
                  </button>
                  <button
                    onClick={() => {
                      setRightPanelMode('live-preview');
                      setMobileWorkspaceTab('preview');
                    }}
                    className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition ${
                      rightPanelMode === 'live-preview' || mobileWorkspaceTab === 'preview'
                        ? 'bg-[#1F1F1F] text-blue-400 font-semibold'
                        : 'text-[#888] hover:text-[#D1D1D1]'
                    }`}
                  >
                    Live Preview
                  </button>
                </div>
              </div>

              {/* Panel Content */}
              <div className="flex-1 flex overflow-hidden min-w-0">
                {((rightPanelMode === 'agent-center' && mobileWorkspaceTab !== 'preview') || mobileWorkspaceTab === 'ai') ? (
                  <AgentCommandCenter
                    agents={agents}
                    timeline={timeline}
                    onTriggerPipeline={handleTriggerPipeline}
                    onRunSingleAgent={handleRunSingleAgent}
                    onOpenLivePreview={() => {
                      setRightPanelMode('live-preview');
                      setMobileWorkspaceTab('preview');
                    }}
                  />
                ) : (
                  <LivePreview
                    appUrl="http://localhost:3000"
                    isReloading={isReloadingPreview}
                    onReload={() => {
                      setIsReloadingPreview(true);
                      setTimeout(() => setIsReloadingPreview(false), 600);
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {currentView === 'dashboard' && (
          <div className="flex-1 h-full overflow-hidden">
            <DashboardView
              agents={agents}
              models={models}
              currentProject={currentProject}
              onNavigateToWorkspace={() => setCurrentView('workspace')}
              onNavigateToAgents={() => setCurrentView('agents')}
            />
          </div>
        )}

        {currentView === 'aichat' && (
          <div className="flex-1 h-full overflow-hidden">
            <AIChatView
              models={models}
              selectedModel={selectedModel}
              setSelectedModel={setSelectedModel}
              activeFile={activeFile}
              onApplyCodeToFile={(newCode) => {
                if (activeFileId) {
                  handleContentChange(activeFileId, newCode);
                  setCurrentView('workspace');
                }
              }}
            />
          </div>
        )}

        {currentView === 'agents' && (
          <div className="flex-1 h-full overflow-hidden flex bg-[#0D0D0D]">
            <AgentCommandCenter
              agents={agents}
              timeline={timeline}
              onTriggerPipeline={handleTriggerPipeline}
              onRunSingleAgent={handleRunSingleAgent}
              onOpenLivePreview={() => {
                setCurrentView('workspace');
                setRightPanelMode('live-preview');
              }}
            />
          </div>
        )}

        {currentView === 'models' && (
          <div className="flex-1 h-full overflow-hidden">
            <ModelsView
              models={models}
              selectedModel={selectedModel}
              setSelectedModel={setSelectedModel}
            />
          </div>
        )}

        {currentView === 'git' && (
          <div className="flex-1 h-full overflow-hidden">
            <GitView
              branches={INITIAL_GIT_BRANCHES}
              currentBranch={gitBranch}
              onSwitchBranch={setGitBranch}
              activeFile={activeFile}
              onRunCodeRabbitAudit={handleTriggerCodeRabbitReview}
            />
          </div>
        )}

        {currentView === 'deploy' && (
          <div className="flex-1 h-full overflow-hidden">
            <DeployView />
          </div>
        )}

        {currentView === 'extensions' && (
          <div className="flex-1 h-full overflow-hidden">
            <ExtensionsView />
          </div>
        )}

        {currentView === 'settings' && (
          <div className="flex-1 h-full overflow-hidden">
            <SettingsView
              settings={settings}
              onUpdateSettings={(newSt) => setSettings(prev => ({ ...prev, ...newSt }))}
            />
          </div>
        )}
      </div>

      {/* Bottom Status Bar */}
      <StatusBar
        gitBranch={gitBranch}
        buildStatus="Success"
        memoryUsage="256 MB"
        activeAgentsCount={6}
        selectedModel={selectedModel}
        onModelClick={(mName) => setSelectedModel(mName)}
        onToggleTerminal={() => setCurrentView('workspace')}
      />

      {/* Global Quick Search Modal (Ctrl+K) */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        files={files}
        onSelectFile={handleSelectFile}
        onNavigateView={setCurrentView}
        onTriggerAgentPipeline={handleTriggerPipeline}
      />
    </div>
  );
}
