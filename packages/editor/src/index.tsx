import Editor from "@monaco-editor/react";
import { getCurrentFile, saveFile } from "../../../services/editor-state/src";

export default function CodeEditor() {
  const file = getCurrentFile();

  return (
    <Editor
      height="100%"
      theme="vs-dark"
      language={file.language}
      value={file.content}
      onChange={(value) => saveFile(value ?? "")}
      options={{
        automaticLayout: true,
        minimap: { enabled: true },
        fontSize: 14,
        tabSize: 2,
        wordWrap: "on"
      }}
    />
  );
}
