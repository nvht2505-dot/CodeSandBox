export interface FileEntry {
  path: string;
  type: "file" | "folder";
}

const files: FileEntry[] = [];

export function listFiles() {
  return files;
}

export function createFile(path: string) {
  files.push({
    path,
    type: "file"
  });
}

export function createFolder(path: string) {
  files.push({
    path,
    type: "folder"
  });
}
