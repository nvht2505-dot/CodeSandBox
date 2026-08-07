import Explorer from "./components/Explorer";
import CodeEditor from "./components/Editor";
import AIAgent from "./components/AIAgent";
import BuildTimeline from "./components/BuildTimeline";

export default function App() {
  return (
    <div className="h-screen flex flex-col bg-[#0d1117] text-white">

      <header className="h-14 border-b border-zinc-800 flex items-center justify-between px-4">
        <strong>SandBox AI</strong>

        <div className="flex gap-3">
          <button>GitHub</button>
          <button>Deploy</button>
          <button>Model</button>
        </div>
      </header>

      <div className="flex flex-1">

        <aside className="w-64 border-r border-zinc-800">
          <Explorer />
        </aside>

        <main className="flex-1 flex flex-col">

          <div className="h-[45%]">
            <CodeEditor />
          </div>

          <div className="h-[35%]">
            <AIAgent />
          </div>

          <div className="flex-1">
            <BuildTimeline />
          </div>

        </main>

        <aside className="w-[420px] border-l border-zinc-800 p-4">
          Live Preview
        </aside>

      </div>

      <footer className="h-40 border-t border-zinc-800 p-4">
        Terminal
      </footer>

    </div>
  );
}
