export default function Sidebar() {
  const items = [
    "📁",
    "🔍",
    "🌿",
    "🤖",
    "🧩",
    "⚙️"
  ];

  return (
    <aside className="w-14 h-full bg-[#111827] border-r border-zinc-800 flex flex-col items-center py-3 gap-3">
      {items.map((item) => (
        <button
          key={item}
          className="w-10 h-10 rounded hover:bg-zinc-700 text-lg"
        >
          {item}
        </button>
      ))}
    </aside>
  );
}
