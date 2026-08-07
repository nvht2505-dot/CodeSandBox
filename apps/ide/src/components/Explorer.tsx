const files = [
  "src/",
  "src/App.tsx",
  "src/main.tsx",
  "package.json",
  "tsconfig.json",
  "vite.config.ts"
];

export default function Explorer() {
  return (
    <div className="h-full bg-[#161b22] text-sm">

      <div className="border-b border-zinc-800 p-3 font-bold">
        Explorer
      </div>

      <div className="p-2">
        {files.map(file => (
          <div
            key={file}
            className="px-3 py-2 rounded hover:bg-[#21262d] cursor-pointer"
          >
            {file}
          </div>
        ))}
      </div>

    </div>
  );
}
