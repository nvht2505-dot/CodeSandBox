import { SandpackCodeEditor, SandpackFileExplorer, SandpackPreview, SandpackProvider, useSandpack } from "@codesandbox/sandpack-react";
import { useEffect, useMemo, useState } from "react";
import { createRepo, getGitHubAuthorizeUrl, getGitHubUser, pushFileToGit, type GitHubUser } from "./services/github";

type Tab = "files" | "code" | "preview" | "git" | "settings";
type Template = "react" | "react-ts" | "vanilla";

const STORAGE_KEY = "mobile-ide-code";
const TEMPLATE_FILES: Record<Template, Record<string, { code: string }>> = {
  react: { "/App.js": { code: "export default function App() {\n  return <h1>Hello Mobile Sandbox</h1>;\n}\n" } },
  "react-ts": { "/App.tsx": { code: "export default function App() {\n  return <h1>Hello TypeScript Sandbox</h1>;\n}\n" } },
  vanilla: { "/index.js": { code: "document.querySelector('#app').textContent = 'Hello Mobile Sandbox';\n" } },
};

function QuickKeysToolbar() {
  const { sandpack } = useSandpack();
  const keys = ["{", "}", "(", ")", "[", "]", "<", ">", ";", "=", '"', "'", "/", "*"];

  return <div className="quick-keys" aria-label="Mobile quick keys">{keys.map((key) => <button key={key} onClick={() => sandpack.updateFile(sandpack.activeFile, `${sandpack.files[sandpack.activeFile]?.code ?? ""}${key}`)}>{key}</button>)}</div>;
}

function CodeAutoSaver() {
  const { sandpack } = useSandpack();
  useEffect(() => {
    const activeCode = sandpack.files[sandpack.activeFile]?.code;
    if (activeCode) localStorage.setItem(STORAGE_KEY, activeCode);
  }, [sandpack.activeFile, sandpack.files]);
  return null;
}

function WorkspaceActions() {
  const { sandpack } = useSandpack();
  const exportProject = () => {
    const blob = new Blob([JSON.stringify(sandpack.files, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "mobile-sandbox-project.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return <div className="toolbar"><span>{sandpack.activeFile}</span><button onClick={exportProject}>Tải project JSON</button></div>;
}

function GitPanel() {
  const { sandpack } = useSandpack();
  const [gitToken, setGitToken] = useState(() => localStorage.getItem("github_token"));
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repoName, setRepoName] = useState("");
  const [commitMsg, setCommitMsg] = useState("Update code from mobile");
  const [statusText, setStatusText] = useState("");

  useEffect(() => { if (gitToken) getGitHubUser(gitToken).then(setUser); }, [gitToken]);

  const handleLoginGitHub = () => {
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    if (!clientId) return setStatusText("Thiếu VITE_GITHUB_CLIENT_ID trong cấu hình môi trường.");
    window.location.href = getGitHubAuthorizeUrl(clientId);
  };

  const handlePushToNewRepo = async () => {
    if (!gitToken || !user || !repoName) return setStatusText("Hãy kết nối GitHub và nhập tên repository.");
    setStatusText("Đang tạo kho lưu trữ mới...");
    const repoData = await createRepo(gitToken, repoName);
    if (!repoData.name) return setStatusText("Lỗi tạo repo. Có thể tên đã tồn tại.");
    await pushFileToGit(gitToken, user.login, repoName, sandpack.activeFile.replace(/^\//, ""), sandpack.files[sandpack.activeFile]?.code ?? "", commitMsg);
    setStatusText("Đã push lên GitHub thành công.");
  };

  return <section className="panel stack"><h2>GitHub Sync</h2>{!gitToken ? <button className="primary" onClick={handleLoginGitHub}>Sign in with GitHub</button> : <><p>{user ? `Đã kết nối: @${user.login}` : "Đang tải thông tin GitHub..."}</p><input placeholder="my-mobile-app" value={repoName} onChange={(event) => setRepoName(event.target.value)} /><input value={commitMsg} onChange={(event) => setCommitMsg(event.target.value)} /><button className="primary" onClick={handlePushToNewRepo}>Tạo Repo & Push Code</button></>}{statusText && <p className="status">{statusText}</p>}{gitToken && <button onClick={() => { localStorage.removeItem("github_token"); setGitToken(null); }}>Đăng xuất</button>}</section>;
}

function SettingsPanel({ template, setTemplate }: { template: Template; setTemplate: (template: Template) => void }) {
  return <section className="panel stack"><h2>Cài đặt Workspace</h2><label>Template<select value={template} onChange={(event) => setTemplate(event.target.value as Template)}>{Object.keys(TEMPLATE_FILES).map((name) => <option key={name}>{name}</option>)}</select></label><button onClick={() => { localStorage.removeItem(STORAGE_KEY); window.location.reload(); }}>Xóa bản nháp local</button><p className="muted">Domain mặc định: ide.mobile-sandbox.example.com. Cập nhật DNS theo docs/domain-and-dns.md trước khi deploy thật.</p></section>;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("code");
  const [template, setTemplate] = useState<Template>("react");
  const [savedCode, setSavedCode] = useState<string | null>(null);
  const files = useMemo(() => savedCode ? { "/App.js": { code: savedCode } } : TEMPLATE_FILES[template], [savedCode, template]);

  useEffect(() => setSavedCode(localStorage.getItem(STORAGE_KEY)), []);

  return <div className="app-shell"><header><div className="brand"><img src="/logo.svg" alt="Mobile Sandbox logo" /><strong>Mobile Sandbox IDE</strong></div><span className="live">Live</span></header><SandpackProvider key={template} template={template} theme="dark" files={files}><CodeAutoSaver /><main><WorkspaceActions />{activeTab === "files" && <section className="panel"><SandpackFileExplorer /></section>}{activeTab === "code" && <section className="editor"><SandpackCodeEditor showTabs showLineNumbers showInlineErrors wrapContent closableTabs={false} /><QuickKeysToolbar /></section>}{activeTab === "preview" && <section className="preview"><SandpackPreview showNavigator showRefreshButton showOpenInCodeSandbox={false} /></section>}{activeTab === "git" && <GitPanel />}{activeTab === "settings" && <SettingsPanel template={template} setTemplate={setTemplate} />}</main></SandpackProvider><nav>{(["files", "code", "preview", "git", "settings"] as Tab[]).map((tab) => <button className={activeTab === tab ? "active" : ""} key={tab} onClick={() => setActiveTab(tab)}>{tab}</button>)}</nav></div>;
}
