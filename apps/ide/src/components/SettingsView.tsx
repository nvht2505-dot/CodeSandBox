import React, { useState } from 'react';
import { 
  Settings, 
  Sliders, 
  ShieldCheck, 
  Bot, 
  Palette, 
  Keyboard, 
  Check
} from 'lucide-react';
import { SettingsState } from '../types';

interface SettingsViewProps {
  settings: SettingsState;
  onUpdateSettings: (newSettings: Partial<SettingsState>) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  onUpdateSettings,
}) => {
  const [activeGroup, setActiveGroup] = useState<'editor' | 'agents' | 'coderabbit' | 'theme' | 'keys'>('editor');
  const [savedNotice, setSavedNotice] = useState(false);

  const groups = [
    { id: 'editor', label: 'Monaco Editor', icon: Sliders },
    { id: 'agents', label: 'Agent Command Rules', icon: Bot },
    { id: 'coderabbit', label: 'CodeRabbit Auditing', icon: ShieldCheck },
    { id: 'theme', label: 'Theme & Styling', icon: Palette },
    { id: 'keys', label: 'Keybindings & Shortcuts', icon: Keyboard },
  ];

  const handleToggle = (key: keyof SettingsState) => {
    onUpdateSettings({ [key]: !settings[key] });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <div className="p-4 bg-[#0D0D0D] text-[#D1D1D1] h-full space-y-4 overflow-y-auto font-sans">
      {/* Header */}
      <div className="flex justify-between items-center bg-[#151515] border border-[#2A2A2A] rounded-lg p-4 font-mono">
        <div>
          <div className="flex items-center space-x-1.5 text-[11px] text-blue-400 mb-0.5">
            <Settings className="w-3.5 h-3.5" />
            <span>CodeRabbit & CodeSandBox System Preferences</span>
          </div>
          <h2 className="text-base font-bold text-white tracking-tight">CodeSandBox Settings Studio</h2>
          <p className="text-[11px] text-[#888] mt-0.5 max-w-xl">
            Configure Monaco editor rules, agent execution limits, CodeRabbit security auditing, keybindings, and color themes.
          </p>
        </div>

        {savedNotice && (
          <div className="px-2.5 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded text-[11px] font-mono flex items-center gap-1 animate-in fade-in">
            <Check className="w-3.5 h-3.5 text-blue-400" />
            <span>Saved</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono">
        {/* Settings Group Navigation Sidebar */}
        <div className="bg-[#151515] border border-[#2A2A2A] rounded-lg p-2 space-y-0.5">
          {groups.map((grp) => {
            const Icon = grp.icon;
            const isActive = activeGroup === grp.id;
            return (
              <button
                key={grp.id}
                onClick={() => setActiveGroup(grp.id as any)}
                className={`w-full text-left px-2.5 py-1.5 rounded text-[11px] font-medium flex items-center space-x-2 transition active:scale-[0.98] ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold'
                    : 'text-[#888] hover:text-white hover:bg-[#1A1A1A]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{grp.label}</span>
              </button>
            );
          })}
        </div>

        {/* Settings Detail Pane */}
        <div className="md:col-span-3 bg-[#151515] border border-[#2A2A2A] rounded-lg p-4 space-y-4">
          {activeGroup === 'editor' && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-[#2A2A2A] pb-1.5">
                Monaco Code Editor Configuration
              </h3>

              <div className="space-y-2 text-[11px]">
                <div className="flex items-center justify-between p-2.5 bg-[#0D0D0D] border border-[#2A2A2A] rounded">
                  <div>
                    <div className="font-semibold text-white">Word Wrap</div>
                    <div className="text-[10px] text-[#888]">Wrap long lines to editor viewport</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.wordWrap}
                    onChange={() => handleToggle('wordWrap')}
                    className="w-3.5 h-3.5 accent-blue-600 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-2.5 bg-[#0D0D0D] border border-[#2A2A2A] rounded">
                  <div>
                    <div className="font-semibold text-white">Auto Save Files</div>
                    <div className="text-[10px] text-[#888]">Automatically save on editor blur</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.autoSave}
                    onChange={() => handleToggle('autoSave')}
                    className="w-3.5 h-3.5 accent-blue-600 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-2.5 bg-[#0D0D0D] border border-[#2A2A2A] rounded">
                  <div>
                    <div className="font-semibold text-white">Show Minimap</div>
                    <div className="text-[10px] text-[#888]">Render code minimap column on right</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.minimap}
                    onChange={() => handleToggle('minimap')}
                    className="w-3.5 h-3.5 accent-blue-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {activeGroup === 'coderabbit' && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-[#2A2A2A] pb-1.5 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                CodeRabbit Security & Audit Rules
              </h3>

              <div className="space-y-2 text-[11px]">
                <div className="flex items-center justify-between p-2.5 bg-[#0D0D0D] border border-[#2A2A2A] rounded">
                  <div>
                    <div className="font-semibold text-white">Automatic CodeRabbit Audit on Save</div>
                    <div className="text-[10px] text-[#888]">Trigger security review scan on file modification</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.codeRabbitAutoReview}
                    onChange={() => handleToggle('codeRabbitAutoReview')}
                    className="w-3.5 h-3.5 accent-rose-600 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-2.5 bg-[#0D0D0D] border border-[#2A2A2A] rounded">
                  <div>
                    <div className="font-semibold text-white">Auto-Fix Syntax Warnings</div>
                    <div className="text-[10px] text-[#888]">Allow Debugger Agent to apply non-breaking syntax patches</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.agentAutoFix}
                    onChange={() => handleToggle('agentAutoFix')}
                    className="w-3.5 h-3.5 accent-rose-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {activeGroup === 'agents' && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-[#2A2A2A] pb-1.5">
                Kilo Agent Swarm Protocol Settings
              </h3>
              <p className="text-[10px] text-[#888]">
                Configure maximum sub-task execution recursion depth and parallel agent threads.
              </p>
              <div className="p-3 bg-[#0D0D0D] border border-[#2A2A2A] rounded text-[11px] space-y-1.5">
                <div className="flex justify-between text-[#AAA]">
                  <span>Max Agent Threads:</span>
                  <span className="text-[#22C55E]">6 Agents Parallel</span>
                </div>
                <div className="flex justify-between text-[#AAA]">
                  <span>Agent Safety Sandbox:</span>
                  <span className="text-[#22C55E]">CONTAINER_STRICT</span>
                </div>
              </div>
            </div>
          )}

          {activeGroup === 'theme' && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-[#2A2A2A] pb-1.5">
                UI & Color Palette Theme
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {['dark', 'synth-dark', 'light'].map((thm) => (
                  <button
                    key={thm}
                    onClick={() => {
                      onUpdateSettings({ theme: thm as any });
                      setSavedNotice(true);
                      setTimeout(() => setSavedNotice(false), 2000);
                    }}
                    className={`p-2 rounded border text-[11px] font-semibold capitalize transition active:scale-[0.98] ${
                      settings.theme === thm
                        ? 'bg-blue-600/20 text-blue-300 border-blue-500/40'
                        : 'bg-[#0D0D0D] text-[#888] border-[#2A2A2A] hover:text-white'
                    }`}
                  >
                    {thm} Theme
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeGroup === 'keys' && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-[#2A2A2A] pb-1.5">
                Keybindings & Shortcuts
              </h3>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between p-2 bg-[#0D0D0D] border border-[#2A2A2A] rounded">
                  <span className="text-[#AAA]">Quick Command Search:</span>
                  <span className="bg-[#1A1A1A] px-1.5 py-0.2 rounded text-blue-400 border border-[#2A2A2A]">Ctrl + K</span>
                </div>
                <div className="flex justify-between p-2 bg-[#0D0D0D] border border-[#2A2A2A] rounded">
                  <span className="text-[#AAA]">Run Agent Loop:</span>
                  <span className="bg-[#1A1A1A] px-1.5 py-0.2 rounded text-blue-400 border border-[#2A2A2A]">Ctrl + Shift + R</span>
                </div>
                <div className="flex justify-between p-2 bg-[#0D0D0D] border border-[#2A2A2A] rounded">
                  <span className="text-[#AAA]">CodeRabbit Audit:</span>
                  <span className="bg-[#1A1A1A] px-1.5 py-0.2 rounded text-blue-400 border border-[#2A2A2A]">Ctrl + Shift + C</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
