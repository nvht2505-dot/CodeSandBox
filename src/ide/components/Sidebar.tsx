import React from 'react';
import { 
  LayoutDashboard, 
  FolderTree, 
  MessageSquare, 
  Bot, 
  Cpu, 
  GitPullRequest, 
  CloudUpload, 
  Puzzle, 
  Settings 
} from 'lucide-react';
import { ViewMode } from '../types';

interface SidebarProps {
  currentView: ViewMode;
  setCurrentView: (view: ViewMode) => void;
  unreadCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  setCurrentView,
}) => {
  const items: { id: ViewMode; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'workspace', label: 'Workspace Explorer', icon: FolderTree },
    { id: 'aichat', label: 'AI Pair Chat', icon: MessageSquare },
    { id: 'agents', label: 'Agent Command', icon: Bot, badge: '6' },
    { id: 'models', label: 'Model Hub', icon: Cpu },
    { id: 'git', label: 'Git & CodeRabbit', icon: GitPullRequest },
    { id: 'deploy', label: 'Cloud Deploy', icon: CloudUpload },
    { id: 'extensions', label: 'Extensions', icon: Puzzle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-10 sm:w-12 flex-shrink-0 bg-[#111111] border-r border-[#2A2A2A] flex flex-col justify-between py-2 items-center z-20 select-none">
      <div className="space-y-1 w-full flex flex-col items-center">
        {items.slice(0, 8).map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              title={item.label}
              className={`relative w-8 h-8 rounded flex items-center justify-center transition-all group ${
                isActive
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 shadow-sm'
                  : 'text-[#888] hover:text-white hover:bg-[#1A1A1A] border border-transparent'
              }`}
            >
              <Icon className="w-4 h-4" />

              {/* Tooltip on hover */}
              <div className="absolute left-full ml-2 px-2 py-0.5 bg-[#1F1F1F] text-white text-[10px] font-mono rounded shadow-xl border border-[#2A2A2A] whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50">
                {item.label}
              </div>

              {/* Active bar indicator */}
              {isActive && (
                <div className="absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-blue-500 rounded-r" />
              )}

              {/* Badge if exists */}
              {item.badge && (
                <span className="absolute -top-0.5 -right-0.5 px-1 py-0.2 bg-[#22C55E] text-[#0D0D0D] text-[8px] font-bold rounded font-mono">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Settings at bottom */}
      <div className="w-full flex flex-col items-center">
        <button
          onClick={() => setCurrentView('settings')}
          title="Settings"
          className={`relative w-8 h-8 rounded flex items-center justify-center transition-all group ${
            currentView === 'settings'
              ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40'
              : 'text-[#888] hover:text-white hover:bg-[#1A1A1A]'
          }`}
        >
          <Settings className="w-4 h-4" />
          <div className="absolute left-full ml-2 px-2 py-0.5 bg-[#1F1F1F] text-white text-[10px] font-mono rounded shadow-xl border border-[#2A2A2A] whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50">
            Settings
          </div>
        </button>
      </div>
    </aside>
  );
};
