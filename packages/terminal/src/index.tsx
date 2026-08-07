import { useState } from "react";

export default function Terminal() {
  const [lines] = useState([
    "CodeSandBox Terminal",
    "$ ready"
  ]);

  return (
    <div
      style={{
        background: "#0b0f19",
        color: "#00ff88",
        padding: "12px",
        height: "100%",
        fontFamily: "monospace",
        overflow: "auto"
      }}
    >
      {lines.map((line, index) => (
        <div key={index}>{line}</div>
      ))}
    </div>
  );
}
