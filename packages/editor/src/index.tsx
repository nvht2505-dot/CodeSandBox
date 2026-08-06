import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import {
  getCurrentFile,
  saveFile,
  subscribe
} from "../../../services/editor-state/src";

export default function CodeEditor() {
  const [file, setFile] = useState(getCurrentFile());

  useEffect(() => subscribe(setFile), []);

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
        tabSize: 2
      }}
    />
  );
}
