import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createRepo, getGitHubAuthorizeUrl, getGitHubUser, pushFileToGit } from "./github";

const jsonResponse = (data: unknown, ok = true) => ({ ok, json: async () => data });

function lastCall(fetchMock: ReturnType<typeof vi.fn>, index = -1) {
  const calls = fetchMock.mock.calls;
  const [url, init] = calls.at(index) as [string, RequestInit | undefined];
  return { url, init, body: init?.body ? JSON.parse(init.body as string) : undefined };
}

describe("GitHub service", () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("builds the GitHub OAuth authorize URL", () => {
    const url = new URL(getGitHubAuthorizeUrl("client-123"));

    expect(url.origin + url.pathname).toBe("https://github.com/login/oauth/authorize");
    expect(url.searchParams.get("client_id")).toBe("client-123");
    expect(url.searchParams.get("scope")).toBe("repo user");
  });

  it("fetches the authenticated user with a bearer token", async () => {
    fetchMock.mockResolvedValue(jsonResponse({ login: "octocat" }));

    await expect(getGitHubUser("token-abc")).resolves.toEqual({ login: "octocat" });

    const { url, init } = lastCall(fetchMock);
    expect(url).toBe("https://api.github.com/user");
    expect(init?.headers).toEqual({ Authorization: "Bearer token-abc" });
  });

  it("creates a public repository with auto init", async () => {
    fetchMock.mockResolvedValue(jsonResponse({ name: "my-app" }));

    await createRepo("token-abc", "my-app");

    const { url, init, body } = lastCall(fetchMock);
    expect(url).toBe("https://api.github.com/user/repos");
    expect(init?.method).toBe("POST");
    expect(init?.headers).toMatchObject({ Authorization: "Bearer token-abc", "Content-Type": "application/json" });
    expect(body).toMatchObject({ name: "my-app", private: false, auto_init: true });
  });

  it("sends the existing sha when the file already exists", async () => {
    fetchMock
      .mockResolvedValueOnce(jsonResponse({ sha: "existing-sha" }))
      .mockResolvedValueOnce(jsonResponse({ content: {} }));

    await pushFileToGit("token-abc", "octocat", "my-app", "App.js", "const a = 1;", "Update code");

    const get = lastCall(fetchMock, 0);
    expect(get.url).toBe("https://api.github.com/repos/octocat/my-app/contents/App.js");

    const put = lastCall(fetchMock);
    expect(put.url).toBe("https://api.github.com/repos/octocat/my-app/contents/App.js");
    expect(put.init?.method).toBe("PUT");
    expect(put.body).toEqual({
      message: "Update code",
      content: btoa("const a = 1;"),
      sha: "existing-sha",
      branch: "main",
    });
  });

  it("omits the sha and base64-encodes unicode content when the file is new", async () => {
    fetchMock
      .mockResolvedValueOnce(jsonResponse({ message: "Not Found" }, false))
      .mockResolvedValueOnce(jsonResponse({ content: {} }));

    await pushFileToGit("token-abc", "octocat", "my-app", "App.js", "// chào", "Add file");

    const put = lastCall(fetchMock);
    expect(put.body.sha).toBeUndefined();
    expect(put.body.content).toBe(btoa(unescape(encodeURIComponent("// chào"))));
    expect(decodeURIComponent(escape(atob(put.body.content)))).toBe("// chào");
  });
});
