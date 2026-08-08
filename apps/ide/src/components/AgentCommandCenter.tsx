import React, { useState } from 'react';
import { 
  Bot, 
  Play, 
  RotateCw, 
  CheckCircle2, 
  ListChecks, 
  Code2, 
  Hammer, 
  Bug, 
  ShieldCheck, 
  CloudUpload,
  ChevronDown,
  ChevronRight,
  Eye,
  FileCode
} from 'lucide-react';
import { AgentInfo, TimelineStep } from '../types';

interface AgentCommandCenterProps {
  agents: AgentInfo[];
  timeline: TimelineStep[];
  onTriggerPipeline: () => void;
  onRunSingleAgent: (agentId: string) => void;
  onOpenLivePreview: () => void;
}

export const AgentCommandCenter: React.FC<AgentCommandCenterProps> = ({
  agents,
  timeline,
  onTriggerPipeline,
  onRunSingleAgent,
  onOpenLivePreview,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'matrix' | 'timeline'>('matrix');
  const [expandedStepId, setExpandedStepId] = useState<string | null>('step-02');
  const [isRunningPipeline, setIsRunningPipeline] = useState(false);

  const getAgentIcon = (iconName: string) => {
    switch (iconName) {
      case 'ListChecks': return <ListChecks className="w-3.5 h-3.5 text-[#22C55E]" />;
      case 'Code2': return <Code2 className="w-3.5 h-3.5 text-sky-400" />;
      case 'Hammer': return <Hammer className="w-3.5 h-3.5 text-indigo-400" />;
      case 'Bug': return <Bug className="w-3.5 h-3.5 text-amber-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />;
      case 'CloudUpload': return <CloudUpload className="w-3.5 h-3.5 text-violet-400" />;
      default: return <Bot className="w-3.5 h-3.5 text-blue-400" />;
    }
  };

  const handleRunPipelineClick = () => {
    setIsRunningPipeline(true);
    onTriggerPipeline();
    setTimeout(() => {
      setIsRunningPipeline(false);
    }, 2000);
  };

  return (
    <div className="w-full lg:w-80 flex-shrink-0 bg-[#0F0F0F] border-l border-[#2A2A2A] flex flex-col h-full font-sans text-xs select-none z-10 overflow-hidden">
      {/* Panel Header */}
      <div className="p-2.5 border-b border-[#2A2A2A] flex items-center justify-between bg-[#111111]">
        <div className="flex items-center space-x-2">
          <div className="p-1 bg-blue-600/20 border border-blue-500/30 rounded text-blue-400">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <div>
            <h2 className="font-mono font-semibold text-white text-xs tracking-tight">AI Command Center</h2>
            <p className="text-[10px] font-mono text-[#666]">Agent Orchestrator</p>
          </div>
        </div>

        <button
          onClick={handleRunPipelineClick}
          disabled={isRunningPipeline}
          className="flex items-center space-x-1 px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white font-mono font-medium rounded transition text-[11px] disabled:opacity-50"
        >
          {isRunningPipeline ? (
            <>
              <RotateCw className="w-3 h-3 animate-spin" />
              <span>Running...</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 fill-current" />
              <span>Run Loop</span>
            </>
          )}
        </button>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="h-7 bg-[#151515] border-b border-[#2A2A2A] flex items-center px-1.5 space-x-1 font-mono text-[11px]">
        <button
          onClick={() => setActiveSubTab('matrix')}
          className={`flex-1 py-0.5 text-center font-medium rounded transition ${
            activeSubTab === 'matrix'
              ? 'bg-[#0D0D0D] text-blue-400 border border-[#2A2A2A]'
              : 'text-[#888] hover:text-white'
          }`}
        >
          Agent Matrix ({agents.length})
        </button>
        <button
          onClick={() => setActiveSubTab('timeline')}
          className={`flex-1 py-0.5 text-center font-medium rounded transition ${
            activeSubTab === 'timeline'
              ? 'bg-[#0D0D0D] text-blue-400 border border-[#2A2A2A]'
              : 'text-[#888] hover:text-white'
          }`}
        >
          Agent Timeline
        </button>
      </div>

      {/* Agent Status Matrix View */}
      {activeSubTab === 'matrix' && (
        <div className="flex-1 overflow-y-auto p-2.5 space-y-2">
          <div className="text-[10px] uppercase font-mono font-semibold text-[#666] tracking-wider flex items-center justify-between mb-1">
            <span>Agent Status Overview</span>
            <span className="text-[#22C55E]">6 Connected</span>
          </div>

          {agents.map((agent) => (
            <div
              key={agent.id}
              className="p-2.5 bg-[#151515] border border-[#2A2A2A] hover:border-[#3A3A3A] rounded transition group"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-1.5">
                  {getAgentIcon(agent.iconName)}
                  <span className="font-mono font-semibold text-white text-[11px]">{agent.name}</span>
                </div>

                <div className="flex items-center space-x-1">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      agent.status === 'running' || agent.status === 'editing' || agent.status === 'building'
                        ? 'bg-[#22C55E] animate-pulse'
                        : 'bg-[#555]'
                    }`}
                  />
                  <span className="text-[10px] font-mono text-[#D1D1D1]">
                    {agent.status}
                  </span>
                </div>
              </div>

              <p className="text-[10px] font-mono text-[#888] mb-1.5 truncate">
                {agent.activity}
              </p>

              <div className="flex items-center justify-between pt-1.5 border-t border-[#2A2A2A] text-[9px] font-mono text-[#666]">
                <span className="bg-[#0D0D0D] px-1 py-0.2 rounded text-[#AAA]">
                  {agent.assignedModel}
                </span>
                <button
                  onClick={() => onRunSingleAgent(agent.id)}
                  className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 group-hover:underline"
                >
                  <Play className="w-2.5 h-2.5" />
                  <span>Trigger</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Agent Timeline View */}
      {activeSubTab === 'timeline' && (
        <div className="flex-1 overflow-y-auto p-2.5 space-y-2.5">
          <div className="text-[10px] uppercase font-mono font-semibold text-[#666] tracking-wider mb-1 flex justify-between items-center">
            <span>Execution Timeline</span>
            <span className="text-[#888]">100% Verified</span>
          </div>

          <div className="relative border-l border-[#2A2A2A] ml-2 space-y-2.5 pl-3">
            {timeline.map((step) => {
              const isExpanded = expandedStepId === step.id;
              return (
                <div key={step.id} className="relative group">
                  {/* Circle Node on Timeline */}
                  <div className="absolute -left-[17px] top-1 w-2.5 h-2.5 rounded-full bg-[#111111] border border-[#22C55E] flex items-center justify-center">
                    <CheckCircle2 className="w-2 h-2 text-[#22C55E]" />
                  </div>

                  {/* Step Card */}
                  <div
                    onClick={() => setExpandedStepId(isExpanded ? null : step.id)}
                    className="p-2 bg-[#151515] border border-[#2A2A2A] hover:border-[#3A3A3A] rounded cursor-pointer transition font-mono"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-[9px] text-[#666]">{step.time}</span>
                        <span className="font-semibold text-white text-[11px]">{step.title}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-[#666] text-[9px]">
                        {step.duration && <span>{step.duration}</span>}
                        {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                      </div>
                    </div>

                    <p className="text-[10px] text-[#888] mt-1 line-clamp-2 leading-tight">
                      {step.details}
                    </p>

                    {/* Expandable Step Details & Generated Code */}
                    {isExpanded && (
                      <div className="mt-2 pt-1.5 border-t border-[#2A2A2A] text-[10px] space-y-1.5 animate-in fade-in duration-100">
                        {step.tokensUsed && (
                          <div className="flex justify-between text-[#666] text-[9px]">
                            <span>Token Consumption:</span>
                            <span className="text-[#22C55E]">{step.tokensUsed} tokens</span>
                          </div>
                        )}

                        {step.codeSnippet && (
                          <div className="bg-[#0D0D0D] p-1.5 rounded border border-[#2A2A2A] text-[9px] text-[#D1D1D1] overflow-x-auto">
                            <div className="text-blue-400 mb-0.5 font-semibold flex items-center gap-1">
                              <FileCode className="w-2.5 h-2.5" /> Log
                            </div>
                            <pre className="whitespace-pre-wrap">{step.codeSnippet}</pre>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer Shortcut to Live Preview */}
      <div className="p-2 border-t border-[#2A2A2A] bg-[#111111] flex items-center justify-between text-[11px] font-mono">
        <span className="text-[#666] text-[10px]">Server: Active</span>
        <button
          onClick={onOpenLivePreview}
          className="flex items-center space-x-1 px-2 py-0.5 bg-[#1F1F1F] hover:bg-[#252525] text-blue-400 border border-[#2A2A2A] rounded transition text-[10px] font-medium"
        >
          <Eye className="w-3 h-3" />
          <span>Live Preview</span>
        </button>
      </div>
    </div>
  );
};

