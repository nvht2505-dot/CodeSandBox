import React from 'react';
import { 
  Cpu, 
  HardDrive, 
  Activity, 
  Bot, 
  Zap, 
  Sparkles,
  ShieldCheck,
  FolderGit2
} from 'lucide-react';
import { AgentInfo, ModelProvider } from '../types';

interface DashboardViewProps {
  agents: AgentInfo[];
  models: ModelProvider[];
  currentProject: string;
  onNavigateToWorkspace: () => void;
  onNavigateToAgents: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  agents,
  models,
  currentProject,
  onNavigateToWorkspace,
  onNavigateToAgents,
}) => {
  return (
    <div className="p-4 bg-[#0D0D0D] text-[#D1D1D1] h-full space-y-4 overflow-y-auto font-sans">
      {/* Top Banner / Hero Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between bg-[#151515] border border-[#2A2A2A] rounded-lg p-4">
        <div>
          <div className="flex items-center space-x-1.5 text-[11px] font-mono text-blue-400 mb-0.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Command Code Studio Engine Active</span>
          </div>
          <h2 className="text-base font-bold text-white tracking-tight font-mono">CodeSandBox Workspace Command Center</h2>
          <p className="text-[11px] text-[#888] mt-0.5 max-w-xl font-mono">
            Multi-agent orchestrator managing <span className="text-white font-semibold">{currentProject}</span>. Real-time telemetry, model routing, and automated CodeRabbit code safety audit.
          </p>
        </div>

        <div className="mt-3 md:mt-0 flex items-center space-x-2">
          <button
            onClick={onNavigateToWorkspace}
            className="px-3 py-1 bg-[#1F1F1F] hover:bg-[#252525] text-white text-[11px] font-mono rounded border border-[#2A2A2A] flex items-center gap-1.5 transition"
          >
            <FolderGit2 className="w-3.5 h-3.5 text-blue-400" />
            <span>Open Files</span>
          </button>
          <button
            onClick={onNavigateToAgents}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-mono font-medium rounded flex items-center gap-1.5 transition"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Agent Matrix ({agents.length})</span>
          </button>
        </div>
      </div>

      {/* Top Telemetry KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3 bg-[#151515] border border-[#2A2A2A] rounded-lg flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-mono text-[#888]">CPU Load</span>
            <div className="p-1 bg-blue-600/20 rounded text-blue-400">
              <Activity className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl font-bold font-mono text-white">12.4%</div>
            <div className="text-[10px] text-[#22C55E] font-mono mt-0.5">
              ● 8 VCPU Cores Nominal
            </div>
          </div>
        </div>

        <div className="p-3 bg-[#151515] border border-[#2A2A2A] rounded-lg flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-mono text-[#888]">RAM Allocation</span>
            <div className="p-1 bg-sky-500/20 rounded text-sky-400">
              <HardDrive className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl font-bold font-mono text-white">256 MB <span className="text-[10px] text-[#666]">/ 2 GB</span></div>
            <div className="text-[10px] text-[#888] font-mono mt-0.5">
              Vite Hot Reload Active
            </div>
          </div>
        </div>

        <div className="p-3 bg-[#151515] border border-[#2A2A2A] rounded-lg flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-mono text-[#888]">CodeRabbit Audit Score</span>
            <div className="p-1 bg-rose-500/20 rounded text-rose-400">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl font-bold font-mono text-white">98 <span className="text-[10px] text-[#22C55E]">/ 100</span></div>
            <div className="text-[10px] text-[#22C55E] font-mono mt-0.5">
              Passes Security Standard
            </div>
          </div>
        </div>

        <div className="p-3 bg-[#151515] border border-[#2A2A2A] rounded-lg flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[11px] font-mono text-[#888]">Active AI Models</span>
            <div className="p-1 bg-indigo-500/20 rounded text-indigo-400">
              <Cpu className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl font-bold font-mono text-white">7 Engines</div>
            <div className="text-[10px] text-indigo-300 font-mono mt-0.5">
              GPT-5 • Claude • Gemini
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section: Active Agents Status Grid + Model Hub Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Agent Command Status */}
        <div className="lg:col-span-2 bg-[#151515] border border-[#2A2A2A] rounded-lg p-4">
          <div className="flex items-center justify-between mb-3 border-b border-[#2A2A2A] pb-2">
            <div className="flex items-center space-x-2">
              <Bot className="w-4 h-4 text-blue-400" />
              <h3 className="text-xs font-mono font-semibold text-white uppercase tracking-wider">Active Agent Matrix</h3>
            </div>
            <span className="text-[10px] font-mono text-[#22C55E] bg-[#0D0D0D] px-2 py-0.5 rounded border border-[#2A2A2A]">
              6 Agents Online
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {agents.map((agent) => (
              <div 
                key={agent.id}
                className="p-2.5 bg-[#0D0D0D] border border-[#2A2A2A] rounded flex items-center justify-between"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[11px] font-mono font-semibold text-white">{agent.name}</span>
                    <span className="text-[9px] font-mono bg-[#1E1E1E] text-[#888] px-1 py-0.2 rounded">
                      {agent.assignedModel}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-[#888] truncate max-w-[180px]">
                    {agent.activity}
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    agent.status === 'running' || agent.status === 'editing' || agent.status === 'building'
                      ? 'bg-[#22C55E] animate-pulse'
                      : 'bg-[#555]'
                  }`} />
                  <span className="text-[10px] font-mono text-[#D1D1D1] capitalize">{agent.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Model Router Latency Overview */}
        <div className="bg-[#151515] border border-[#2A2A2A] rounded-lg p-4">
          <div className="flex items-center justify-between mb-3 border-b border-[#2A2A2A] pb-2">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-mono font-semibold text-white uppercase tracking-wider">Model Router Performance</h3>
            </div>
            <span className="text-[10px] text-amber-400 font-mono">Real-time</span>
          </div>

          <div className="space-y-2">
            {models.slice(0, 5).map((model) => (
              <div key={model.id} className="p-2 bg-[#0D0D0D] border border-[#2A2A2A] rounded flex items-center justify-between text-[11px] font-mono">
                <div>
                  <div className="font-semibold text-white">{model.name}</div>
                  <div className="text-[9px] text-[#666]">{model.provider}</div>
                </div>
                <div className="text-right">
                  <div className="text-[#22C55E] font-semibold">{model.latency}</div>
                  <div className="text-[9px] text-[#666]">{model.contextWindow}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

