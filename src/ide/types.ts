export type ViewMode = 
  | 'dashboard'
  | 'workspace'
  | 'aichat'
  | 'agents'
  | 'models'
  | 'git'
  | 'deploy'
  | 'extensions'
  | 'settings';

export interface FileItem {
  id: string;
  name: string;
  path: string;
  type: 'file' | 'folder';
  content?: string;
  language?: string;
  parentId?: string | null;
  isOpen?: boolean;
  isModified?: boolean;
}

export type AgentStatusType = 'idle' | 'running' | 'editing' | 'building' | 'scanning' | 'waiting' | 'success' | 'error';

export interface AgentInfo {
  id: string;
  name: string;
  role: string;
  status: AgentStatusType;
  activity: string;
  iconName: string;
  color: string;
  assignedModel: string;
}

export interface TimelineStep {
  id: string;
  time: string;
  agent: string;
  agentIcon: string;
  status: 'success' | 'running' | 'pending' | 'failed';
  title: string;
  details: string;
  codeSnippet?: string;
  duration?: string;
  tokensUsed?: number;
}

export interface ModelProvider {
  id: string;
  name: string;
  provider: string;
  badge: string;
  contextWindow: string;
  latency: string;
  costPer1k: string;
  isActive: boolean;
  isCustomKey?: boolean;
  apiKeySet?: boolean;
}

export interface GitBranch {
  name: string;
  isCurrent: boolean;
  lastCommit: string;
  ahead: number;
  behind: number;
}

export interface TerminalLog {
  id: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'command';
  text: string;
}

export interface SettingsState {
  theme: 'dark' | 'synth-dark' | 'light';
  fontSize: number;
  tabSize: number;
  wordWrap: boolean;
  autoSave: boolean;
  minimap: boolean;
  lineNumbers: boolean;
  codeRabbitAutoReview: boolean;
  agentAutoFix: boolean;
  telemetry: boolean;
  defaultModel: string;
}
