import Editor from "@monaco-editor/react";

export default function CodeEditor() {
  return (
    <Editor
      height="100%"
      defaultLanguage="typescript"
      theme="vs-dark"
      defaultValue="// Welcome to CodeSandBox"
      options={{
        minimap: { enabled: true },
        automaticLayout: true,
        fontSize: 14,
        tabSize: 2,
        wordWrap: "on"
      }}
    />
  );
}
