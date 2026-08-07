export default function AIAgent() {
  return (
    <div className="flex flex-col h-full bg-[#161b22]">

      <div className="border-b border-zinc-800 p-4">
        <h2 className="text-lg font-bold">AI Agent</h2>
        <p className="text-sm opacity-70">GPT-5 • Ready</p>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">

        <div className="rounded-lg bg-[#21262d] p-3">
          <strong>You</strong>
          <p>Create a React Todo App.</p>
        </div>

        <div className="rounded-lg bg-[#0d419d] p-3">
          <strong>Agent</strong>
          <p>Planning project...</p>
        </div>

      </div>

      <div className="border-t border-zinc-800 p-4">

        <textarea
          placeholder="Ask AI to build anything..."
          rows={4}
          className="w-full"
        />

        <div className="flex justify-end mt-3">
          <button>Send</button>
        </div>

      </div>

    </div>
  );
}
