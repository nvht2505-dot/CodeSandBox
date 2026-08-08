import React, { useState } from 'react';
import { 
  CloudUpload, 
  Terminal,
  Server
} from 'lucide-react';

export const DeployView: React.FC = () => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployTarget, setDeployTarget] = useState<'cloudrun' | 'vercel' | 'railway'>('cloudrun');
  const [deployLogs, setDeployLogs] = useState<string[]>([
    '[Cloud Run] Container image built successfully.',
    '[Cloud Run] Pushing image to gcr.io/codesandbox-ai/app:latest...',
    '[Cloud Run] Route mapped to https://ais-dev-d5yqbbvzjgbuhghclqggop.run.app',
    '[Cloud Run] SSL certificate provisioned. Status: HEALTHY',
  ]);

  const handleTriggerDeploy = () => {
    setIsDeploying(true);
    setDeployLogs(prev => [...prev, `[${deployTarget.toUpperCase()}] Initiating new build deployment trigger...`]);

    setTimeout(() => {
      setDeployLogs(prev => [...prev, `[${deployTarget.toUpperCase()}] Compiling TypeScript modules...`]);
    }, 800);

    setTimeout(() => {
      setDeployLogs(prev => [...prev, `[${deployTarget.toUpperCase()}] Deployment SUCCESS! App reloaded.`]);
      setIsDeploying(false);
    }, 2000);
  };

  return (
    <div className="p-4 bg-[#0D0D0D] text-[#D1D1D1] h-full space-y-4 overflow-y-auto font-sans">
      {/* Header */}
      <div className="flex justify-between items-center bg-[#151515] border border-[#2A2A2A] rounded-lg p-4 font-mono">
        <div>
          <div className="flex items-center space-x-1.5 text-[11px] text-blue-400 mb-0.5">
            <CloudUpload className="w-3.5 h-3.5" />
            <span>Cloud Infrastructure Engine</span>
          </div>
          <h2 className="text-base font-bold text-white tracking-tight">Cloud Deployment & Domain Center</h2>
          <p className="text-[11px] text-[#888] mt-0.5 max-w-xl">
            Deploy with zero-downtime container management to Cloud Run, Vercel, or Railway.
          </p>
        </div>

        <button
          onClick={handleTriggerDeploy}
          disabled={isDeploying}
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-mono font-medium rounded border border-blue-400/30 text-[11px] flex items-center gap-1.5 transition active:scale-[0.98] disabled:opacity-50"
        >
          <CloudUpload className="w-3.5 h-3.5" />
          <span>{isDeploying ? 'Deploying...' : 'Deploy To Cloud'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Targets */}
        <div className="bg-[#151515] border border-[#2A2A2A] rounded-lg p-3.5 space-y-2.5 font-mono">
          <h3 className="text-[10px] font-bold text-[#666] uppercase tracking-wider mb-1">
            Select Cloud Target
          </h3>

          {[
            { id: 'cloudrun', name: 'Google Cloud Run', desc: 'Managed container instance on GCP', badge: 'Active' },
            { id: 'vercel', name: 'Vercel Edge Network', desc: 'Global edge function CDN deployment', badge: 'Ready' },
            { id: 'railway', name: 'Railway Infrastructure', desc: 'Full-stack Docker container host', badge: 'Ready' },
          ].map((t) => (
            <div
              key={t.id}
              onClick={() => setDeployTarget(t.id as any)}
              className={`p-2.5 rounded border cursor-pointer transition ${
                deployTarget === t.id
                  ? 'bg-blue-600/15 border-blue-500/40 text-blue-300'
                  : 'bg-[#0D0D0D] border-[#2A2A2A] text-[#888] hover:bg-[#1F1F1F]'
              }`}
            >
              <div className="flex justify-between items-center mb-0.5">
                <span className="font-semibold text-white text-xs">{t.name}</span>
                <span className="text-[9px] font-mono bg-blue-500/20 text-blue-400 px-1.5 py-0.2 rounded">
                  {t.badge}
                </span>
              </div>
              <p className="text-[10px] text-[#888]">{t.desc}</p>
            </div>
          ))}
        </div>

        {/* Logs */}
        <div className="md:col-span-2 bg-[#151515] border border-[#2A2A2A] rounded-lg p-3.5 font-mono">
          <h3 className="text-[10px] font-bold text-[#666] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-blue-400" /> Build & Deployment Logs
          </h3>

          <div className="bg-[#0D0D0D] p-3 rounded border border-[#2A2A2A] font-mono text-[11px] space-y-1 text-[#D1D1D1] h-60 overflow-y-auto">
            {deployLogs.map((log, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-[#555] text-[9px]">09:25:{idx + 10}</span>
                <span className="text-[#22C55E]">{log}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
