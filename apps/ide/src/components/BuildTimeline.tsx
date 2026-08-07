const steps = [
  { name: "Planning", status: "done" },
  { name: "Creating Files", status: "running" },
  { name: "Installing Packages", status: "waiting" },
  { name: "Building", status: "waiting" },
  { name: "Testing", status: "waiting" },
  { name: "Deploy", status: "waiting" }
];

export default function BuildTimeline() {
  return (
    <div className="bg-[#161b22] border-t border-zinc-800 p-4">
      <h3 className="font-bold mb-3">Build Timeline</h3>

      {steps.map(step => (
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
