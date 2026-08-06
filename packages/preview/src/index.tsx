import { useEffect, useState } from "react";
import {
  getCurrentFile,
  subscribe
} from "../../../services/editor-state/src";

export default function Preview() {
  const [file, setFile] = useState(getCurrentFile());

  useEffect(() => subscribe(setFile), []);

  const html =
    file.language === "html"
      ? file.content
      : `<pre style="padding:16px;font-family:monospace;white-space:pre-wrap;">${file.content}</pre>`;

  return (
    <iframe
      title="preview"
      srcDoc={html}
      style={{
        width: "100%",
        height: "100%",
        border: "none",
        background: "#fff"
      }}
    />
  );
}
