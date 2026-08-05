import { describe, expect, it } from "vitest";
import { getGitHubAuthorizeUrl } from "./github";

describe("GitHub service", () => {
  it("builds the GitHub OAuth authorize URL", () => {
    const url = new URL(getGitHubAuthorizeUrl("client-123"));

    expect(url.origin + url.pathname).toBe("https://github.com/login/oauth/authorize");
    expect(url.searchParams.get("client_id")).toBe("client-123");
    expect(url.searchParams.get("scope")).toBe("repo user");
  });
});
