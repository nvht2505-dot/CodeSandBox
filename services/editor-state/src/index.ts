export interface EditorFile {
  path: string;
  language: string;
  content: string;
}

const files = new Map<string, EditorFile>([
  [
    "src/app/page.tsx",
    {
      path: "src/app/page.tsx",
      language: "typescript",
      content: `export default function Page() {
  return <h1>CodeSandBox</h1>;
}`
    }
  ],
  [
    "package.json",
    {
      path: "package.json",
      language: "json",
      content: `{
  "name":"codesandbox"
}`
    }
  ]
]);

let current = "src/app/page.tsx";
const listeners = new Set<(file: EditorFile) => void>();

export function subscribe(listener: (file: EditorFile) => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function emit() {
  listeners.forEach((listener) => listener(getCurrentFile()));
}

export function getCurrentFile() {
  return files.get(current)!;
}

export function getOpenFiles() {
  return [...files.values()];
}

export function openFile(path: string) {
  if (files.has(path)) {
    current = path;
    emit();
  }
}

export function saveFile(content: string) {
  const file = files.get(current)!;
  file.content = content;
  files.set(current, file);
  emit();
}

export function createFile(path: string, language = "text") {
  files.set(path, {
    path,
    language,
    content: ""
  });
  current = path;
  emit();
}
