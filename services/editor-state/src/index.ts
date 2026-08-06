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

const listeners = new Set<(file: EditorFile) => void>();

export function getCurrentFile() {
  return files[current];
}

export function getFiles() {
  return files;
}

export function subscribe(listener: (file: EditorFile) => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify() {
  const file = getCurrentFile();
  listeners.forEach((listener) => listener(file));
}

export function openFile(path: string) {
  if (files[path]) {
    current = path;
    notify();
  }
}

export function saveFile(content: string) {
  files[current].content = content;
  notify();
}
