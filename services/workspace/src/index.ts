export interface Workspace {
  id: string;
  name: string;
  root: string;
}

let current: Workspace = {
  id: "default",
  name: "CodeSandBox",
  root: "/workspace"
};

export function getWorkspace() {
  return current;
}

export function setWorkspace(workspace: Workspace) {
  current = workspace;
}
