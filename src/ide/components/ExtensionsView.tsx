import React, { useState } from 'react';
import { Puzzle, Star } from 'lucide-react';

export const ExtensionsView: React.FC = () => {
  const [installed, setInstalled] = useState<Record<string, boolean>>({
    'ext-1': true,
    'ext-2': true,
  });

  const extensions = [
    { id: 'ext-1', name: 'CodeRabbit AI Reviewer', desc: 'Automated PR code auditing and safety checks', rating: '4.9', downloads: '120k' },
    { id: 'ext-2', name: 'Tailwind CSS IntelliSense', desc: 'Auto-completion and syntax highlight for Tailwind v4', rating: '4.8', downloads: '340k' },
    { id: 'ext-3', name: 'Kilo Agent Protocol Sync', desc: 'Connects local agent swarms to CodeSandBox Command Center', rating: '5.0', downloads: '45k' },
    { id: 'ext-4', name: 'Prettier Code Formatter', desc: 'Opinionated code formatting for TypeScript & JSX', rating: '4.7', downloads: '500k' },
  ];

  return (
    <div className="p-4 bg-[#0D0D0D] text-[#D1D1D1] h-full space-y-4 overflow-y-auto font-sans">
      <div className="bg-[#151515] border border-[#2A2A2A] rounded-lg p-4 font-mono">
        <div className="flex items-center space-x-1.5 text-[11px] text-blue-400 mb-0.5">
          <Puzzle className="w-3.5 h-3.5" />
          <span>Extension Marketplace</span>
        </div>
        <h2 className="text-base font-bold text-white tracking-tight">Extensions & AI Tools</h2>
        <p className="text-[11px] text-[#888] mt-0.5 max-w-xl">
          Enhance your cloud IDE with linting tools, AI agent protocols, formatters, and themes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {extensions.map((ext) => (
          <div key={ext.id} className="p-3 bg-[#151515] border border-[#2A2A2A] rounded-lg flex justify-between items-start font-mono">
            <div className="space-y-1">
              <h3 className="font-bold text-white text-xs">{ext.name}</h3>
              <p className="text-[10px] text-[#888] max-w-sm">{ext.desc}</p>
              <div className="flex items-center space-x-3 text-[10px] text-[#666] pt-1">
                <span className="flex items-center gap-1 text-amber-400"><Star className="w-3 h-3 fill-current" /> {ext.rating}</span>
                <span>{ext.downloads} downloads</span>
              </div>
            </div>

            <button
              onClick={() => setInstalled(prev => ({ ...prev, [ext.id]: !prev[ext.id] }))}
              className={`px-2.5 py-1 rounded text-[11px] font-mono transition active:scale-[0.98] ${
                installed[ext.id]
                  ? 'bg-[#1F1F1F] text-[#AAA] border border-[#2A2A2A]'
                  : 'bg-blue-600 hover:bg-blue-500 text-white font-medium border border-blue-400/30'
              }`}
            >
              {installed[ext.id] ? 'Installed' : 'Install'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};