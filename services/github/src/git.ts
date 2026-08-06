export async function clone(url: string) {
  return {
    success: true,
    action: "clone",
    url
  };
}

export async function pull() {
  return {
    success: true,
    action: "pull"
  };
}

export async function push() {
  return {
    success: true,
    action: "push"
  };
}

export async function commit(message: string) {
  return {
    success: true,
    action: "commit",
    message
  };
}
