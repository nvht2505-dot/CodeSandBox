import AIAgent from "./components/AIAgent";

export default function App() {
  return (
    <div className="h-screen flex flex-col bg-[#0d1117] text-white">

      <header className="h-14 border-b border-zinc-800 flex items-center px-4 justify-between">
        <div className="font-bold">SandBox AI</div>

        <div className="flex gap-2">
          <button>GitHub</button>
          <button>Deploy</button>
          <button>Model</button>
          <button>Settings</button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">

        <aside className="w-72 border-r border-zinc-800 p-3">
          <h3>Explorer</h3>
        </aside>

        <main className="flex-1 border-r border-zinc-800">
          <AIAgent />
        </main>

        <aside className="w-[420px] p-3">
          <h3>Live Preview</h3>
        </aside>

      </div>

      <footer className="h-48 border-t border-zinc-800 p-3">
        <h3>Terminal</h3>
      </footer>

    </div>
  );
}
