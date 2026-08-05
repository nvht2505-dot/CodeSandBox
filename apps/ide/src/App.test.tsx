// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { StrictMode, type ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  sandpack: {
    activeFile: "/App.js",
    files: { "/App.js": { code: "export default function App() {}" } } as Record<string, { code: string }>,
    updateFile: vi.fn(),
  },
}));

vi.mock("@codesandbox/sandpack-react", () => ({
  useSandpack: () => ({ sandpack: mocks.sandpack }),
  SandpackProvider: ({ children, files }: { children: ReactNode; files?: Record<string, { code: string }> }) => (
    <div data-testid="sandpack-provider" data-files={JSON.stringify(files ?? null)}>
      {children}
    </div>
  ),
  SandpackFileExplorer: () => <div data-testid="file-explorer" />,
  SandpackCodeEditor: () => <div data-testid="code-editor" />,
  SandpackPreview: () => <div data-testid="preview" />,
}));

import App from "./App";

describe("Mobile IDE shell", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.history.replaceState({}, "", "/");
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 390 });
    Object.defineProperty(window, "innerHeight", { configurable: true, value: 844 });
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("shows only the active tab panel when its nav button is pressed", () => {
    render(<App />);

    expect(screen.getByTestId("code-editor")).toBeVisible();
    expect(screen.getByTestId("preview")).not.toBeVisible();

    fireEvent.click(screen.getByRole("button", { name: "files" }));
    expect(screen.getByTestId("file-explorer")).toBeVisible();
    expect(screen.getByTestId("code-editor")).not.toBeVisible();

    fireEvent.click(screen.getByRole("button", { name: "preview" }));
    expect(screen.getByTestId("preview")).toBeVisible();

    fireEvent.click(screen.getByRole("button", { name: "git" }));
    expect(screen.getByRole("button", { name: "Sign in with GitHub" })).toBeVisible();

    fireEvent.click(screen.getByRole("button", { name: "code" }));
    expect(screen.getByTestId("code-editor")).toBeVisible();
  });

  it("keeps the preview mounted across tab switches", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "preview" }));
    const preview = screen.getByTestId("preview");

    fireEvent.click(screen.getByRole("button", { name: "code" }));
    fireEvent.click(screen.getByRole("button", { name: "preview" }));

    expect(screen.getByTestId("preview")).toBe(preview);
    expect(preview).toBeVisible();
  });

  it("shows the quick keys toolbar on the code tab", () => {
    render(<App />);

    const quickKeys = document.querySelector(".quick-keys");
    expect(quickKeys).not.toBeNull();
    for (const key of ["{", "}", "(", ")", ";"]) {
      expect(screen.getByRole("button", { name: key })).toBeInTheDocument();
    }
  });

  it("auto-saves the active file and restores it from localStorage", () => {
    render(<App />);
    expect(window.localStorage.getItem("mobile-ide-code")).toBe("export default function App() {}");

    cleanup();
    window.localStorage.setItem("mobile-ide-code", "const restored = true;");
    render(<App />);

    const provider = screen.getByTestId("sandpack-provider");
    expect(JSON.parse(provider.dataset.files ?? "null")).toEqual({ "/App.js": { code: "const restored = true;" } });
  });

  it("exchanges the OAuth code only once under StrictMode", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ access_token: "token-xyz" }) });
    vi.stubGlobal("fetch", fetchMock);
    window.sessionStorage.setItem("github_oauth_state", "state-1");
    window.history.replaceState({}, "", "/?code=oauth-code&state=state-1");

    render(
      <StrictMode>
        <App />
      </StrictMode>,
    );

    await waitFor(() => expect(window.localStorage.getItem("github_token")).toBe("token-xyz"));
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("exchanges the OAuth code for a token and cleans the URL", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ access_token: "token-xyz" }) });
    vi.stubGlobal("fetch", fetchMock);
    window.sessionStorage.setItem("github_oauth_state", "state-1");
    window.history.replaceState({}, "", "/?code=oauth-code&state=state-1");

    render(<App />);

    await waitFor(() => expect(window.localStorage.getItem("github_token")).toBe("token-xyz"));
    expect(fetchMock).toHaveBeenCalledWith("https://github.com/login/oauth/access_token", expect.objectContaining({ method: "POST" }));
    expect(window.location.search).toBe("");
    expect(window.sessionStorage.getItem("github_oauth_state")).toBeNull();
  });

  it("ignores a callback whose state does not match the stored one", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ access_token: "token-xyz" }) });
    vi.stubGlobal("fetch", fetchMock);
    window.sessionStorage.setItem("github_oauth_state", "state-1");
    window.history.replaceState({}, "", "/?code=attacker-code&state=state-2");

    render(<App />);

    await waitFor(() => expect(window.location.search).toBe(""));
    expect(fetchMock).not.toHaveBeenCalled();
    expect(window.localStorage.getItem("github_token")).toBeNull();
  });
});
