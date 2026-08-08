import React, { useState } from 'react';
import { 
  RotateCw, 
  ExternalLink, 
  Monitor, 
  Tablet, 
  Smartphone
} from 'lucide-react';

interface LivePreviewProps {
  appUrl?: string;
  isReloading?: boolean;
  onReload: () => void;
}

export const LivePreview: React.FC<LivePreviewProps> = ({
  appUrl = 'http://localhost:3000',
  isReloading = false,
  onReload,
}) => {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showConsole, setShowConsole] = useState(false);

  const getWidthClass = () => {
    switch (deviceMode) {
      case 'mobile': return 'max-w-[375px]';
      case 'tablet': return 'max-w-[768px]';
      default: return 'w-full';
    }
  };

  return (
    <div className="flex-1 min-w-0 w-full bg-[#0D0D0D] flex flex-col h-full border-l border-[#2A2A2A] font-mono select-none z-10 overflow-hidden">
      {/* Browser Bar Header */}
      <div className="h-8 bg-[#151515] border-b border-[#2A2A2A] px-2.5 flex items-center justify-between text-[11px] text-[#D1D1D1]">
        {/* Navigation & Address Bar */}
        <div className="flex items-center space-x-2 flex-1 max-w-xl">
          <button
            onClick={onReload}
            className="p-1 hover:bg-[#1F1F1F] text-[#888] hover:text-white rounded transition active:scale-[0.96]"
            title="Reload Preview"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isReloading ? 'animate-spin text-blue-400' : ''}`} />
          </button>

          <div className="flex-1 bg-[#0D0D0D] border border-[#2A2A2A] rounded px-2 py-0.5 flex items-center justify-between text-[#888] font-mono text-[10px]">
            <div className="flex items-center space-x-1.5 truncate">
              <span className="w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-pulse" />
              <span className="truncate text-[#D1D1D1]">{appUrl}</span>
            </div>
            <span className="text-[9px] text-[#22C55E] font-mono">Hot Reload</span>
          </div>
        </div>

        {/* Viewport Dimension Switchers */}
        <div className="flex items-center space-x-1.5">
          <div className="bg-[#0D0D0D] border border-[#2A2A2A] p-0.5 rounded flex items-center space-x-0.5">
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`p-1 rounded transition active:scale-[0.96] ${deviceMode === 'desktop' ? 'bg-[#1F1F1F] text-blue-400' : 'text-[#666] hover:text-white'}`}
              title="Desktop View (100%)"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDeviceMode('tablet')}
              className={`p-1 rounded transition active:scale-[0.96] ${deviceMode === 'tablet' ? 'bg-[#1F1F1F] text-blue-400' : 'text-[#666] hover:text-white'}`}
              title="Tablet View (768px)"
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`p-1 rounded transition active:scale-[0.96] ${deviceMode === 'mobile' ? 'bg-[#1F1F1F] text-blue-400' : 'text-[#666] hover:text-white'}`}
              title="Mobile View (375px)"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => setShowConsole(!showConsole)}
            className={`px-2 py-0.5 rounded text-[10px] font-mono border transition active:scale-[0.98] ${
              showConsole 
                ? 'bg-[#1F1F1F] text-blue-400 border-[#2A2A2A]' 
                : 'bg-[#0D0D0D] text-[#888] border-[#2A2A2A] hover:text-white'
            }`}
          >
            Console
          </button>

          <a
            href={appUrl}
            target="_blank"
            rel="noreferrer"
            className="p-1 hover:bg-[#1F1F1F] text-[#888] hover:text-white rounded transition active:scale-[0.96]"
            title="Open in new tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Frame Container */}
      <div className="flex-1 bg-[#0D0D0D] flex flex-col items-center justify-start p-2 overflow-hidden relative">
        <div className={`h-full border border-[#2A2A2A] rounded overflow-hidden bg-[#0D0D0D] transition-all duration-300 ${getWidthClass()}`}>
          <iframe
            src={appUrl}
            title="CodeSandBox Application Preview"
            className="w-full h-full border-none bg-[#0D0D0D]"
          />
        </div>

        {/* Console Drawer */}
        {showConsole && (
          <div className="absolute bottom-2 left-3 right-3 h-32 bg-[#151515] border border-[#2A2A2A] rounded p-2.5 font-mono text-[10px] overflow-y-auto space-y-1">
            <div className="flex justify-between items-center text-[#666] text-[9px] uppercase tracking-wider font-semibold border-b border-[#2A2A2A] pb-1 mb-1">
              <span>Browser Console Log</span>
              <span className="text-[#22C55E]">0 Errors</span>
            </div>
            <div className="text-blue-400">[CodeSandBox HMR] Connected to server hot-reload socket.</div>
            <div className="text-[#D1D1D1]">[React] App mounted in 14ms.</div>
            <div className="text-[#888]">[Agent Pipeline] Live preview synchronized with workspace files.</div>
          </div>
        )}
      </div>
    </div>
  );
};
