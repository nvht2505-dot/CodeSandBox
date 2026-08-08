import Editor from "@monaco-editor/react";

const code = `export default function App() {
  return (
    <h1>Hello SandBox AI</h1>
  );
}
`;

export default function CodeEditor() {
  return (
    <div className="h-full">
      <Editor
        height="100%"
        defaultLanguage="typescript"
        theme="vs-dark"
        defaultValue={code}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          automaticLayout: true
        }}
      />
    </div>
  );
}
