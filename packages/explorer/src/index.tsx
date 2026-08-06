import { explorer } from "./data";

type Item = {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: Item[];
};

function Tree({ items }: { items: Item[] }) {
  return (
    <>
      {items.map((item) => (
        <div key={item.id} style={{ marginLeft: 12 }}>
          <div
            style={{
              padding: "6px 8px",
              cursor: "pointer",
              userSelect: "none"
            }}
          >
            {item.type === "folder" ? "📁" : "📄"} {item.name}
          </div>

          {item.children && <Tree items={item.children} />}
        </div>
      ))}
    </>
  );
}

export default function Explorer() {
  return (
    <div
      style={{
        height: "100%",
        overflow: "auto",
        background: "#111827",
        color: "#fff",
        padding: 12
      }}
    >
      <Tree items={explorer} />
    </div>
  );
}
