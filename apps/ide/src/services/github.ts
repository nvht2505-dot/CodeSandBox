const GITHUB_API_URL = "https://api.github.com";
const GITHUB_OAUTH_TOKEN_URL = "https://github.com/login/oauth/access_token";
const GITHUB_OAUTH_AUTHORIZE_URL = "https://github.com/login/oauth/authorize";

export interface GitHubUser {
  login: string;
  name?: string | null;
  avatar_url?: string;
}

export function getGitHubAuthorizeUrl(clientId: string) {
  const url = new URL(GITHUB_OAUTH_AUTHORIZE_URL);
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("scope", "repo user");
  return url.toString();
}

export async function exchangeGitHubCode(code: string) {
  const response = await fetch(GITHUB_OAUTH_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ code }),
  });
  return response.json();
}

export async function getGitHubUser(token: string): Promise<GitHubUser> {
  const response = await fetch(`${GITHUB_API_URL}/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
}

export async function createRepo(token: string, repoName: string) {
  const response = await fetch(`${GITHUB_API_URL}/user/repos`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      name: repoName,
      description: "Dự án tạo từ Mobile CodeSandbox IDE",
      private: false,
      auto_init: true,
    }),
  });
  return response.json();
}

export async function pushFileToGit(
  token: string,
  owner: string,
  repo: string,
  path: string,
  content: string,
  commitMessage: string,
) {
  const base64Content = btoa(unescape(encodeURIComponent(content)));
  let sha: string | undefined;

  const fileResponse = await fetch(`${GITHUB_API_URL}/repos/${owner}/${repo}/contents/${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (fileResponse.ok) {
    const fileData = await fileResponse.json();
    sha = fileData.sha;
  }

  const response = await fetch(`${GITHUB_API_URL}/repos/${owner}/${repo}/contents/${path}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ message: commitMessage, content: base64Content, sha, branch: "main" }),
  });

  return response.json();
}
