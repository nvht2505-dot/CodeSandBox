import React, { useState } from 'react';
import { 
  Cpu, 
  Key, 
  Sliders, 
  CheckCircle2, 
  Check
} from 'lucide-react';
import { ModelProvider } from '../types';

interface ModelsViewProps {
  models: ModelProvider[];
  selectedModel: string;
  setSelectedModel: (m: string) => void;
}

export const ModelsView: React.FC<ModelsViewProps> = ({
  models,
  selectedModel,
  setSelectedModel,
}) => {
  const [temperature, setTemperature] = useState(0.2);
  const [maxTokens, setMaxTokens] = useState(8192);
  const [savedKeys, setSavedKeys] = useState<Record<string, boolean>>({
    'Google AI': true,
    'OpenAI': true,
    'Anthropic': true,
  });

  const handleSaveKey = (provider: string) => {
    setSavedKeys(prev => ({ ...prev, [provider]: true }));
  };

  return (
    <div className="p-4 bg-[#0D0D0D] text-[#D1D1D1] h-full space-y-4 overflow-y-auto font-sans">
      {/* Header */}
      <div className="flex justify-between items-center bg-[#151515] border border-[#2A2A2A] rounded-lg p-4">
        <div>
          <div className="flex items-center space-x-1.5 text-[11px] font-mono text-blue-400 mb-0.5">
            <Cpu className="w-3.5 h-3.5" />
            <span>Agent & Command Code Studio Model Router</span>
          </div>
          <h2 className="text-base font-bold text-white tracking-tight font-mono">Model Hub & Provider Configuration</h2>
          <p className="text-[11px] text-[#888] mt-0.5 max-w-xl font-mono">
            Configure default model routing, API keys, context window limits, and reasoning parameters.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-[#0D0D0D] border border-[#2A2A2A] px-2.5 py-1 rounded text-[11px] font-mono">
          <span className="text-[#888]">Active:</span>
          <span className="text-blue-400 font-bold">{selectedModel}</span>
        </div>
      </div>

      {/* Grid of Models */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {models.map((m) => {
          const isSelected = selectedModel === m.name;
          return (
            <div
              key={m.id}
              onClick={() => setSelectedModel(m.name)}
              className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-blue-600/10 border-blue-500/50 shadow-sm'
                  : 'bg-[#151515] border-[#2A2A2A] hover:border-[#3A3A3A]'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-mono font-bold text-white text-xs">{m.name}</h3>
                  <span className="text-[10px] text-[#888] font-mono">{m.provider}</span>
                </div>
                <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${
                  isSelected 
                    ? 'bg-blue-600/20 text-blue-400 border-blue-500/30 font-bold' 
                    : 'bg-[#1E1E1E] text-[#888] border-[#2A2A2A]'
                }`}>
                  {m.badge}
                </span>
              </div>

              <div className="space-y-1 text-[11px] font-mono mb-3 text-[#D1D1D1]">
                <div className="flex justify-between">
                  <span className="text-[#666]">Context Window:</span>
                  <span>{m.contextWindow}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666]">Avg Latency:</span>
                  <span className="text-[#22C55E]">{m.latency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666]">Cost / 1K Tokens:</span>
                  <span>{m.costPer1k}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#2A2A2A] flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#22C55E] text-[10px] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Ready
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedModel(m.name);
                  }}
                  className={`px-2.5 py-0.5 rounded text-[10px] font-medium transition ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : 'bg-[#1F1F1F] text-[#D1D1D1] hover:bg-[#252525]'
                  }`}
                >
                  {isSelected ? 'Active Model' : 'Select'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Model Parameter Controls */}
      <div className="bg-[#151515] border border-[#2A2A2A] rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
        <div>
          <h3 className="text-xs font-bold text-white mb-3 flex items-center gap-1.5 uppercase tracking-wider">
            <Sliders className="w-3.5 h-3.5 text-blue-400" />
            Generation Parameters
          </h3>

          <div className="space-y-3 text-[11px]">
            <div>
              <div className="flex justify-between text-[#AAA] mb-1">
                <span>Temperature</span>
                <span className="text-blue-400 font-bold">{temperature}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-[#AAA] mb-1">
                <span>Max Output Tokens</span>
                <span className="text-blue-400 font-bold">{maxTokens}</span>
              </div>
              <input
                type="range"
                min="1024"
                max="16384"
                step="1024"
                value={maxTokens}
                onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-white mb-3 flex items-center gap-1.5 uppercase tracking-wider">
            <Key className="w-3.5 h-3.5 text-amber-400" />
            API Key Vault
          </h3>

          <div className="space-y-1.5">
            {['Google AI', 'OpenAI', 'Anthropic', 'OpenRouter'].map((prov) => (
              <div key={prov} className="p-2 bg-[#0D0D0D] border border-[#2A2A2A] rounded flex items-center justify-between text-[11px]">
                <span className="font-semibold text-white">{prov} Key</span>
                {savedKeys[prov] ? (
                  <span className="text-[#22C55E] text-[10px] flex items-center gap-1">
                    <Check className="w-3 h-3" /> Configured
                  </span>
                ) : (
                  <button
                    onClick={() => handleSaveKey(prov)}
                    className="px-2 py-0.5 bg-[#1F1F1F] hover:bg-[#252525] text-white rounded text-[10px]"
                  >
                    Add Key
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

