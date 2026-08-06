import CodeEditor from "../../../packages/editor/src";
import Terminal from "../../../packages/terminal/src";
import Preview from "../../../packages/preview/src";
import AIChat from "../../../packages/ai-chat/src";

export default function App() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "260px 1fr 360px",
        gridTemplateRows: "1fr 240px",
        height: "100vh",
        background: "#0b1220",
        color: "#fff",
        gap: 1
      }}
    >
      <aside
        style={{
          gridRow: "1 / span 2",
          background: "#111827",
          padding: 16
        }}
      >
        <h3>Explorer</h3>
      </aside>

      <main
        style={{
          background: "#1f2937"
        }}
      >
        <CodeEditor />
      </main>

      <section
        style={{
          background: "#111827"
        }}
      >
        <AIChat />
      </section>

      <section
        style={{
          background: "#000"
        }}
      >
        <Terminal />
      </section>

      <section
        style={{
          background: "#fff"
        }}
      >
        <Preview />
      </section>
    </div>
  );
}
