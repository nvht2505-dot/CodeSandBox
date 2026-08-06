export interface EditorFile {
  path: string;
  language: string;
  content: string;
}

const files: Record<string, EditorFile> = {
  "src/app/page.tsx": {
    path: "src/app/page.tsx",
    language: "typescript",
    content: `export default function Page() {
  return <h1>CodeSandBox</h1>;
}`
  },
  "package.json": {
    path: "package.json",
    language: "json",
    content: `{
  "name":"codesandbox"
}`
  }
};

let current = "src/app/page.tsx";

export function getCurrentFile() {
  return files[current];
}

export function openFile(path: string) {
  if (files[path]) current = path;
  return getCurrentFile();
}

export function saveFile(content: string) {
  files[current].content = content;
}

export function getFiles() {
  return files;
}
