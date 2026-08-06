import { useMemo } from "react";

interface PreviewProps {
  html?: string;
}

export default function Preview({
  html = "<h1>Welcome to CodeSandBox</h1>"
}: PreviewProps) {
  const srcDoc = useMemo(() => `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<style>
body{
margin:0;
padding:16px;
font-family:sans-serif;
background:#ffffff;
}
</style>
</head>
<body>
${html}
</body>
</html>
`, [html]);

  return (
    <iframe
      title="Preview"
      srcDoc={srcDoc}
      style={{
        width: "100%",
        height: "100%",
        border: "none",
        background: "#fff"
      }}
    />
  );
}
