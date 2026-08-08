import React from 'react';
import { 
  GitBranch, 
  CheckCircle2, 
  HardDrive, 
  Bot
} from 'lucide-react';

interface StatusBarProps {
  gitBranch: string;
  buildStatus: 'Success' | 'Building' | 'Failed';
  memoryUsage: string;
  activeAgentsCount: number;
  selectedModel: string;
  onModelClick: (modelName: string) => void;
  onToggleTerminal: () => void;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  gitBranch,
  buildStatus,
  memoryUsage,
  activeAgentsCount,
  selectedModel,
  onModelClick,
  onToggleTerminal,
}) => {
  const modelBarItems = [
    { name: 'GPT-5', label: 'GPT-5' },
    { name: 'Claude 3.7 Sonnet', label: 'Claude' },
    { name: 'Gemini 2.5 Pro', label: 'Gemini' },
    { name: 'Qwen 2.5 Coder', label: 'Qwen' },
    { name: 'OpenRouter Smart Router', label: 'OpenRouter' },
    { name: 'OpenClaw Engine', label: 'OpenClaw' },
  ];

  return (
    <footer className="h-6 bg-[#151515] border-t border-[#2A2A2A] text-[#888] px-2 sm:px-2.5 flex items-center justify-between text-[9px] sm:text-[10px] font-mono select-none z-30 w-full max-w-full overflow-hidden flex-shrink-0">
      {/* Left: Model Quick Router Bar */}
      <div className="hidden md:flex items-center space-x-1 overflow-hidden">
        <span className="text-[#555] mr-1 flex-shrink-0">Engines:</span>
        {modelBarItems.map((item, idx) => {
          const isActive = selectedModel.includes(item.label) || selectedModel === item.name;
          return (
            <React.Fragment key={item.name}>
              {idx > 0 && <span className="text-[#333]">│</span>}
              <button
                onClick={() => onModelClick(item.name)}
                className={`px-1.5 py-0.2 rounded transition flex-shrink-0 ${
                  isActive
                    ? 'text-blue-400 font-bold bg-blue-600/20 border border-blue-500/30'
                    : 'text-[#888] hover:text-white'
                }`}
              >
                {item.label}
              </button>
            </React.Fragment>
          );
        })}
      </div>

      {/* Mobile left indicator */}
      <div className="md:hidden flex items-center space-x-1.5 text-[#22C55E]">
        <span className="w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-pulse" />
        <span className="font-semibold text-white truncate max-w-[100px]">{selectedModel}</span>
      </div>

      {/* Right: Telemetry & Branch Info */}
      <div className="flex items-center space-x-2 sm:space-x-3 text-[9px] sm:text-[10px] flex-shrink-0">
        {/* Branch Info */}
        <div className="hidden sm:flex items-center space-x-1 text-[#D1D1D1]">
          <GitBranch className="w-3 h-3 text-sky-400" />
          <span>{gitBranch}</span>
        </div>

        <span className="hidden sm:inline text-[#333]">│</span>

        {/* Build Status */}
        <div className="flex items-center space-x-1 text-[#22C55E]">
          <CheckCircle2 className="w-3 h-3" />
          <span>{buildStatus}</span>
        </div>

        <span className="text-[#333]">│</span>

        {/* RAM Metric */}
        <div className="hidden xs:flex items-center space-x-1 text-[#D1D1D1]">
          <HardDrive className="w-3 h-3 text-indigo-400" />
          <span>{memoryUsage}</span>
        </div>

        <span className="hidden xs:inline text-[#333]">│</span>

        {/* Agent Count */}
        <button 
          onClick={onToggleTerminal}
          className="flex items-center space-x-1 text-[#22C55E] hover:underline"
        >
          <Bot className="w-3 h-3" />
          <span>Agents: {activeAgentsCount}</span>
        </button>
      </div>
    </footer>
  );
};

