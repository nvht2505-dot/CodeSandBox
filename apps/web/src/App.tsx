import Explorer from "../../../packages/explorer/src";
import Tabs from "../../../packages/tabs/src";
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
        gridTemplateRows: "40px 1fr 240px",
        height: "100vh",
        gap: 1,
        background: "#0b1220"
      }}
    >
      <aside
        style={{
          gridRow: "1 / span 3"
        }}
      >
        <Explorer />
      </aside>

      <div>
        <Tabs />
      </div>

      <section
        style={{
          gridRow: "2",
          background: "#1f2937"
        }}
      >
        <CodeEditor />
      </section>

      <aside
        style={{
          gridRow: "1 / span 2",
          background: "#111827"
        }}
      >
        <AIChat />
      </aside>

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
