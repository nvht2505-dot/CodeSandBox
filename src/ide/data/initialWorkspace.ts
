import { FileItem, AgentInfo, TimelineStep, ModelProvider, GitBranch } from '../types';

export const INITIAL_FILES: FileItem[] = [
  {
    id: 'root-src',
    name: 'src',
    path: 'src',
    type: 'folder',
    isOpen: true,
    parentId: null,
  },
  {
    id: 'file-app-tsx',
    name: 'App.tsx',
    path: 'src/App.tsx',
    type: 'file',
    language: 'typescript',
    parentId: 'root-src',
    isModified: false,
    content: `import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Terminal, Cpu, Layers, Rocket, CheckCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'metrics'>('overview');
  const [counter, setCounter] = useState(42);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6">
      <header className="max-w-5xl mx-auto flex items-center justify-between border-b border-slate-800 pb-4 mb-8">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-white">CodeSandBox Application</h1>
            <p className="text-xs text-slate-400">Deployed via CodeSandBox AI Multi-Agent Pipeline</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('overview')}
            className={\`px-3 py-1.5 text-xs font-medium rounded-md transition-all \${
              activeTab === 'overview' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-slate-200'
            }\`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('metrics')}
            className={\`px-3 py-1.5 text-xs font-medium rounded-md transition-all \${
              activeTab === 'metrics' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-slate-200'
            }\`}
          >
            Agent Metrics
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <Rocket className="w-4 h-4 text-emerald-400" />
              Live Workspace State
            </h2>
            <span className="text-xs font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
              ● Live Hot Reload
            </span>
          </div>

          <p className="text-sm text-slate-400 leading-relaxed mb-6">
            This live application was built and validated by the <strong>CodeSandBox AI Agent Matrix</strong>. 
            Modifications made in the editor reflect instantly in this preview canvas.
          </p>

          <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-mono block mb-1">State Counter</span>
                <span className="text-2xl font-bold text-white font-mono">{counter}</span>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setCounter(c => c - 1)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition"
                >
                  Decrement
                </button>
                <button 
                  onClick={() => setCounter(c => c + 1)}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium rounded-lg shadow-sm transition"
                >
                  Increment
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl">
              <span className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> CodeRabbit Score
              </span>
              <span className="text-lg font-semibold text-white">98/100</span>
            </div>
            <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl">
              <span className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                <Cpu className="w-3.5 h-3.5 text-sky-400" /> Active Model
              </span>
              <span className="text-lg font-semibold text-white">Gemini 2.5 Flash</span>
            </div>
          </div>
        </motion.div>

        <div className="space-y-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" /> Active Agent Loop
            </h3>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center justify-between text-slate-300">
                <span>Planner</span>
                <span className="text-emerald-400 font-mono">● Ready</span>
              </li>
              <li className="flex items-center justify-between text-slate-300">
                <span>Coder</span>
                <span className="text-sky-400 font-mono">● Active</span>
              </li>
              <li className="flex items-center justify-between text-slate-300">
                <span>Builder</span>
                <span className="text-emerald-400 font-mono">● Verified</span>
              </li>
              <li className="flex items-center justify-between text-slate-300">
                <span>Reviewer</span>
                <span className="text-amber-400 font-mono">● CodeRabbit</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
`,
  },
  {
    id: 'file-main-tsx',
    name: 'main.tsx',
    path: 'src/main.tsx',
    type: 'file',
    language: 'typescript',
    parentId: 'root-src',
    content: `import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);`,
  },
  {
    id: 'file-server-ts',
    name: 'server.ts',
    path: 'server.ts',
    type: 'file',
    language: 'typescript',
    parentId: null,
    content: `import express from 'express';
import { GoogleGenAI } from '@google/genai';

const app = express();
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', server: 'CodeSandBox AI' });
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Server running on port 3000');
});`,
  },
  {
    id: 'file-package-json',
    name: 'package.json',
    path: 'package.json',
    type: 'file',
    language: 'json',
    parentId: null,
    content: `{
  "name": "codesandbox-ai-app",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "tsx server.ts",
    "build": "vite build",
    "test": "vitest run"
  },
  "dependencies": {
    "react": "^19.0.0",
    "motion": "^12.0.0",
    "lucide-react": "^0.500.0"
  }
}`,
  },
  {
    id: 'file-tailwind-css',
    name: 'index.css',
    path: 'src/index.css',
    type: 'file',
    language: 'css',
    parentId: 'root-src',
    content: `@import "tailwindcss";`,
  },
];

export const INITIAL_AGENTS: AgentInfo[] = [
  {
    id: 'agent-planner',
    name: 'Planner',
    role: 'Decomposes instructions into architectural plans and dependency charts',
    status: 'running',
    activity: 'Analyzing task graph...',
    iconName: 'ListChecks',
    color: 'emerald',
    assignedModel: 'Gemini 2.5 Pro',
  },
  {
    id: 'agent-coder',
    name: 'Coder',
    role: 'Writes React, TypeScript, Express, and CSS code cleanly',
    status: 'editing',
    activity: 'Editing App.tsx...',
    iconName: 'Code2',
    color: 'sky',
    assignedModel: 'Claude 3.7 Sonnet',
  },
  {
    id: 'agent-builder',
    name: 'Builder',
    role: 'Executes npm builds, type checks, and asset bundling',
    status: 'building',
    activity: 'npm build...',
    iconName: 'Hammer',
    color: 'indigo',
    assignedModel: 'Qwen 2.5 Coder',
  },
  {
    id: 'agent-debugger',
    name: 'Debugger',
    role: 'Scans runtime exceptions, console warnings, and syntax bugs',
    status: 'scanning',
    activity: 'Scanning memory...',
    iconName: 'Bug',
    color: 'amber',
    assignedModel: 'GPT-5 (Preview)',
  },
  {
    id: 'agent-reviewer',
    name: 'Reviewer',
    role: 'CodeRabbit engine performing automated security and PR review',
    status: 'waiting',
    activity: 'Waiting for diff...',
    iconName: 'ShieldCheck',
    color: 'rose',
    assignedModel: 'CodeRabbit AI',
  },
  {
    id: 'agent-deployer',
    name: 'Deploy',
    role: 'Orchestrates Cloud Run, Vercel & container image sync',
    status: 'idle',
    activity: 'Idle (Ready)',
    iconName: 'CloudUpload',
    color: 'violet',
    assignedModel: 'OpenClaw Engine',
  },
];

export const INITIAL_TIMELINE: TimelineStep[] = [
  {
    id: 'step-01',
    time: '09:20',
    agent: 'Planner',
    agentIcon: 'ListChecks',
    status: 'success',
    title: 'Planner ✓',
    details: 'Decomposed layout into 6 core panels: Dashboard, Editor, Terminal, AI Command Center, Agent Matrix, and Live Preview.',
    duration: '0.4s',
    tokensUsed: 420,
    codeSnippet: `Task Graph:
1. Initialize Workspace tree
2. Mount Monaco Editor & Terminal
3. Setup Agent Matrix & Command Center
4. Start hot-reload server`,
  },
  {
    id: 'step-02',
    time: '09:21',
    agent: 'Coder',
    agentIcon: 'Code2',
    status: 'success',
    title: 'Coder ✓',
    details: 'Created App.tsx and updated layout styling with Tailwind CSS v4 and Motion components.',
    duration: '1.2s',
    tokensUsed: 1250,
    codeSnippet: `// Applied layout updates in App.tsx
import { motion } from 'motion/react';
export default function App() { ... }`,
  },
  {
    id: 'step-03',
    time: '09:22',
    agent: 'Builder',
    agentIcon: 'Hammer',
    status: 'success',
    title: 'Builder ✓',
    details: 'Ran `npm run build` cleanly. Vite output compiled in 1.1s with zero bundle warnings.',
    duration: '1.1s',
    tokensUsed: 180,
  },
  {
    id: 'step-04',
    time: '09:23',
    agent: 'Debugger',
    agentIcon: 'Bug',
    status: 'success',
    title: 'Debugger ✓',
    details: 'Scanned 12 TypeScript modules. Confirmed 0 type errors, 0 unused imports, and safe memory usage.',
    duration: '0.6s',
    tokensUsed: 310,
  },
  {
    id: 'step-05',
    time: '09:24',
    agent: 'Reviewer',
    agentIcon: 'ShieldCheck',
    status: 'success',
    title: 'Reviewer ✓',
    details: 'CodeRabbit automated audit completed. Code Quality Score: 98/100. Security check passed.',
    duration: '0.9s',
    tokensUsed: 890,
    codeSnippet: `[CodeRabbit Pass]
- No hardcoded API keys detected
- Safe DOM handling verified
- WCAG AA accessibility contrast standard met`,
  },
  {
    id: 'step-06',
    time: '09:25',
    agent: 'Deploy',
    agentIcon: 'CloudUpload',
    status: 'success',
    title: 'Deploy ✓',
    details: 'Live preview hot-reloaded successfully on http://localhost:3000 with 0 latency.',
    duration: '0.3s',
    tokensUsed: 95,
  },
];

export const MODEL_PROVIDERS: ModelProvider[] = [
  {
    id: 'gpt-5',
    name: 'GPT-5 (Preview)',
    provider: 'OpenAI',
    badge: 'Flagship',
    contextWindow: '200K tokens',
    latency: '340ms',
    costPer1k: '$0.003',
    isActive: true,
  },
  {
    id: 'claude-3-7',
    name: 'Claude 3.7 Sonnet',
    provider: 'Anthropic',
    badge: 'Code Leader',
    contextWindow: '200K tokens',
    latency: '290ms',
    costPer1k: '$0.003',
    isActive: true,
  },
  {
    id: 'gemini-2-5-pro',
    name: 'Gemini 2.5 Pro',
    provider: 'Google AI',
    badge: '1M Context',
    contextWindow: '1,000K tokens',
    latency: '180ms',
    costPer1k: '$0.00125',
    isActive: true,
  },
  {
    id: 'gemini-2-5-flash',
    name: 'Gemini 2.5 Flash',
    provider: 'Google AI',
    badge: 'Ultra Fast',
    contextWindow: '1,000K tokens',
    latency: '95ms',
    costPer1k: '$0.0003',
    isActive: true,
  },
  {
    id: 'qwen-2-5-coder',
    name: 'Qwen 2.5 Coder',
    provider: 'Alibaba AI',
    badge: 'Open Weight',
    contextWindow: '128K tokens',
    latency: '210ms',
    costPer1k: '$0.0008',
    isActive: true,
  },
  {
    id: 'openrouter',
    name: 'OpenRouter Smart Router',
    provider: 'OpenRouter',
    badge: 'Multi-Cloud',
    contextWindow: 'Dynamic',
    latency: '150ms',
    costPer1k: 'Variable',
    isActive: true,
  },
  {
    id: 'openclaw',
    name: 'OpenClaw Engine',
    provider: 'Kilo / Local',
    badge: 'Agentic Native',
    contextWindow: '500K tokens',
    latency: '120ms',
    costPer1k: 'Free/Local',
    isActive: true,
  },
];

export const INITIAL_GIT_BRANCHES: GitBranch[] = [
  { name: 'main', isCurrent: true, lastCommit: 'feat: agent command center layout', ahead: 0, behind: 0 },
  { name: 'feature/kilo-agent-matrix', isCurrent: false, lastCommit: 'add multi-agent timeline step detail', ahead: 2, behind: 0 },
  { name: 'fix/coderabbit-review-hook', isCurrent: false, lastCommit: 'update security scanning rule', ahead: 1, behind: 1 },
];
