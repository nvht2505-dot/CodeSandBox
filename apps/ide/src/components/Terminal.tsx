export default function Terminal() {
  const logs = [
    "$ npm install",
    "✔ Packages installed",
    "$ npm run dev",
    "Vite server running...",
    "AI Agent: Build completed."
  ];

  return (
    <div className="h-full bg-black text-green-400 p-3 overflow-auto font-mono text-sm">
      {logs.map((log, i) => (
        <div key={i}>{log}</div>
      ))}
    </div>
  );
}
