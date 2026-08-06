import { SandpackCodeEditor, SandpackFileExplorer, SandpackPreview, SandpackProvider, useSandpack } from "@codesandbox/sandpack-react";
import { useEffect, useRef, useState } from "react";
import { createRepo, exchangeGitHubCode, getGitHubAuthorizeUrl, getGitHubUser, pushFileToGit, type GitHubUser } from "./services/github";

type Tab = "files" | "code" | "preview" | "git";

function QuickKeysToolbar() {
  const { sandpack } = useSandpack();
  const keys = ["{", "}", "(", ")", "[", "]", "<", ">", ";", "=", '"', "/", "*"];

  return (
    <div className="quick-keys">
      {keys.map((key) => (
        <button key={key} onClick={() => sandpack.updateFile(sandpack.activeFile, `${sandpack.files[sandpack.activeFile]?.code ?? ""}${key}`)}>
          {key}
        </button>
      ))}
    </div>
  );
}

function CodeAutoSaver() {
  const { sandpack } = useSandpack();

  useEffect(() => {
    const activeCode = sandpack.files[sandpack.activeFile]?.code;
    if (activeCode) localStorage.setItem("mobile-ide-code", activeCode);
  }, [sandpack.activeFile, sandpack.files]);

  return null;
}

function GitPanel({ gitToken, onTokenChange }: { gitToken: string | null; onTokenChange: (token: string | null) => void }) {
  const { sandpack } = useSandpack();
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repoName, setRepoName] = useState("");
  const [commitMsg, setCommitMsg] = useState("Update code from mobile");
  const [statusText, setStatusText] = useState("");

  useEffect(() => {
    if (gitToken) getGitHubUser(gitToken).then(setUser);
  }, [gitToken]);

  const handleLoginGitHub = () => {
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    if (!clientId) {
      setStatusText("Thiếu VITE_GITHUB_CLIENT_ID trong cấu hình môi trường.");
      return;
    }
    const state = crypto.randomUUID();
    sessionStorage.setItem(OAUTH_STATE_KEY, state);
    window.location.href = getGitHubAuthorizeUrl(clientId, state);
  };

  const handlePushToNewRepo = async () => {
    if (!gitToken || !user || !repoName) return;
    setStatusText("Đang tạo kho lưu trữ mới...");
    const repoData = await createRepo(gitToken, repoName);
    if (!repoData.name) {
      setStatusText("Lỗi tạo repo. Có thể tên đã tồn tại.");
      return;
    }
    await pushFileToGit(gitToken, user.login, repoName, sandpack.activeFile.replace(/^\//, ""), sandpack.files[sandpack.activeFile]?.code ?? "", commitMsg);
    setStatusText("Đã push lên GitHub thành công.");
  };

  return (
    <section className="panel stack">
      {!gitToken ? (
        <button className="primary" onClick={handleLoginGitHub}>Sign in with GitHub</button>
      ) : (
        <>
          <p>{user ? `Đã kết nối: @${user.login}` : "Đang tải thông tin GitHub..."}</p>
          <input placeholder="my-mobile-app" value={repoName} onChange={(event) => setRepoName(event.target.value)} />
          <input value={commitMsg} onChange={(event) => setCommitMsg(event.target.value)} />
          <button className="primary" onClick={handlePushToNewRepo}>Tạo Repo & Push Code</button>
        </>
      )}
      {statusText && <p className="status">{statusText}</p>}
      {gitToken && <button onClick={() => { localStorage.removeItem("github_token"); onTokenChange(null); }}>Đăng xuất</button>}
    </section>
  );
}

const OAUTH_STATE_KEY = "github_oauth_state";

function stripOAuthQueryParams() {
  const params = new URLSearchParams(window.location.search);
  params.delete("code");
  params.delete("state");
  const query = params.toString();
  window.history.replaceState({}, "", `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`);
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("code");
  const [savedCode] = useState<string | null>(() => localStorage.getItem("mobile-ide-code"));
  const [gitToken, setGitToken] = useState<string | null>(() => localStorage.getItem("github_token"));

  const oauthCodeConsumed = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (!code || oauthCodeConsumed.current) return;

    oauthCodeConsumed.current = true;
    const expectedState = sessionStorage.getItem(OAUTH_STATE_KEY);
    sessionStorage.removeItem(OAUTH_STATE_KEY);
    stripOAuthQueryParams();

    if (!expectedState || params.get("state") !== expectedState) return;

    exchangeGitHubCode(code)
      .then((data) => {
        if (!data.access_token) return;
        localStorage.setItem("github_token", data.access_token);
        setGitToken(data.access_token);
      })
      .catch(() => undefined);
  }, []);

  return (
    <div className="app-shell">
      <header><strong>📦 SandBox Mobile</strong><span>Live</span></header>
      <SandpackProvider template="react" theme="dark" files={savedCode ? { "/App.js": { code: savedCode } } : undefined}>
        <CodeAutoSaver />
        <main>
          <section className="panel" hidden={activeTab !== "files"}><SandpackFileExplorer /></section>
          <section className="editor" hidden={activeTab !== "code"}><SandpackCodeEditor showTabs showLineNumbers showInlineErrors wrapContent closableTabs={false} /><QuickKeysToolbar /></section>
          <section className="preview" hidden={activeTab !== "preview"}><SandpackPreview showNavigator showRefreshButton showOpenInCodeSandbox={false} /></section>
          {activeTab === "git" && <GitPanel gitToken={gitToken} onTokenChange={setGitToken} />}
        </main>
      </SandpackProvider>
      <nav>{(["files", "code", "preview", "git"] as Tab[]).map((tab) => <button className={activeTab === tab ? "active" : ""} key={tab} onClick={() => setActiveTab(tab)}>{tab}</button>)}</nav>
    </div>
  );
}
