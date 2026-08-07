import Sidebar from "./components/Sidebar";
import Explorer from "./components/Explorer";
import CodeEditor from "./components/Editor";
import AIAgent from "./components/AIAgent";
import AgentBuild from "./components/AgentBuild";
import BuildTimeline from "./components/BuildTimeline";
import Terminal from "./components/Terminal";

export default function App() {
  return (
    <div className="h-screen flex bg-[#0d1117] text-white">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <header className="h-14 border-b border-zinc-800 flex items-center justify-between px-4">
          <h1 className="font-bold text-lg">SandBox AI IDE</h1>

          <div className="flex gap-2">
            <button>GitHub</button>
            <button>Deploy</button>
            <button>Model</button>
            <button>Settings</button>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">

          <aside className="w-64 border-r border-zinc-800 overflow-auto">
            <Explorer />
          </aside>

          <section className="flex-1 flex flex-col">

            <div className="h-[45%] border-b border-zinc-800">
              <CodeEditor />
            </div>

            <div className="h-[35%] border-b border-zinc-800 overflow-auto">
              <AIAgent />
            </div>

            <div className="h-[20%] overflow-auto">
              <AgentBuild />
            </div>

          </section>

          <aside className="w-[420px] border-l border-zinc-800 flex flex-col">

            <div className="flex-1 p-4">
              <h2 className="font-bold mb-2">Live Preview</h2>

              <div className="h-full rounded border border-zinc-800 flex items-center justify-center">
                Preview
              </div>
            </div>

            <BuildTimeline />

          </aside>

        </div>

        <footer className="h-40 border-t border-zinc-800">
          <Terminal />
        </footer>

      </div>

    </div>
  );
}
