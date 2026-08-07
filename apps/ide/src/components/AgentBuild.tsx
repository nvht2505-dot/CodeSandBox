const steps = [
  { name: "Thinking", status: "done" },
  { name: "Planning", status: "done" },
  { name: "Editing Files", status: "running" },
  { name: "Installing Packages", status: "waiting" },
  { name: "Running Build", status: "waiting" },
  { name: "Preview Ready", status: "waiting" }
];

export default function AgentBuild() {
  return (
    <div className="bg-[#111827] border-t border-zinc-800 p-4">
      <h3 className="font-semibold mb-3">Agent Build</h3>

      {steps.map((step) => (
        <div
          key={step.name}
          className="flex justify-between py-2 border-b border-zinc-800"
        >
          <span>{step.name}</span>
          <span>{step.status}</span>
        </div>
      ))}
    </div>
  );
}
