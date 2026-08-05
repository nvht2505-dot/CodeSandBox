toàn bộ mã nguồn và tài liệu triển khai chi tiết cho một dự án lớn như thế này (bao gồm cả Web App Mobile IDE và trang Tài liệu Docs), chúng ta cần chia nhỏ lộ trình để đảm bảo độ chi tiết, tối ưu hiệu năng mobile và cấu trúc chuẩn
Dưới đây là Phần 1: Kiến trúc tổng thể và Mã nguồn Web App Mobile IDE.
------------------------------
## TÀI LIỆU TRIỂN KHAI DỰ ÁN: MOBILE CODESANDBOX IDE## PHẦN 1: THIẾT KẾ KIẾN TRÚC & MÃ NGUỒN MOBILE IDE## 1. Kiến trúc thư mục dự án
Dự án được xây dựng dựa trên Vite + React + TypeScript + Tailwind CSS.

mobile-sandbox-ide/
├── apps/
│   ├── ide/               # Ứng dụng Mobile IDE chính
│   └── docs/              # Trang tài liệu hướng dẫn (Sử dụng Nextra hoặc VitePress/React)
├── package.json
└── README.md

## 2. Thiết kế Cơ sở Dữ liệu & State (Local)
Vì chạy trên mobile, trạng thái code hiện tại của người dùng sẽ được đồng bộ trực tiếp vào localStorage để tránh mất dữ liệu khi trình duyệt tải lại trang (reload).
------------------------------
## 3. Mã nguồn Full cho Web App Mobile IDE (apps/ide)## Bước 1: Khởi tạo cấu hình Tailwind (tailwind.config.js)
Đảm bảo giao diện tối ưu cho không gian mobile, ẩn các thanh cuộn mặc định.

/** @type {import('tailwindcss').Config} */export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBg: "#151515",
        panelBg: "#1e1e1e",
        accent: "#40a9ff",
      },
    },
  },
  plugins: [],
}

## Bước 2: Viết mã nguồn chính cho Mobile IDE (src/App.tsx)
Mã nguồn này xây dựng hệ thống Tab Navigation mượt mà, tích hợp Thanh phím tắt ký tự đặc biệt (Quick Toolbar) hỗ trợ gõ code nhanh trên bàn phím ảo điện thoại.

import React, { useState, useEffect } from "react";import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
  useSandpack,
} from "@codesandbox/sandpack-react";
// Thanh công cụ hỗ trợ gõ nhanh ký tự đặc biệt cho mobileconst QuickKeysToolbar = () => {
  const { sandpack } = useSandpack();
  const keys = ["{", "}", "(", ")", "[", "]", "<", ">", ";", "=", '"', "/", "*"];

  const handleInsertKey = (key: string) => {
    const { activeFile, files } = sandpack;
    const currentCode = files[activeFile].code;
    
    // Chèn ký tự vào cuối (Cấp độ cơ bản cho mobile text input)
    const updatedCode = currentCode + key;
    sandpack.updateFile(activeFile, updatedCode);
  };

  return (
    <div className="flex gap-2 overflow-x-auto p-2 bg-neutral-900 border-t border-neutral-800 scrollbar-none">
      {keys.map((key) => (
        <button
          key={key}
          onClick={() => handleInsertKey(key)}
          className="flex-shrink-0 bg-neutral-800 text-neutral-200 px-3 py-1.5 rounded text-sm font-mono active:bg-accent active:text-white"
        >
          {key}
        </button>
      ))}
    </div>
  );
};
export default function App() {
  const [activeTab, setActiveTab] = useState<"files" | "code" | "preview">("code");

  // Khôi phục code cũ từ localStorage nếu có
  const [savedCode, setSavedCode] = useState<string | null>(null);
  useEffect(() => {
    const local = localStorage.getItem("mobile-ide-code");
    if (local) setSavedCode(local);
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen bg-darkBg text-white select-none overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 h-12 bg-panelBg border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <span className="text-xl">📦</span>
          <h1 className="font-bold text-sm tracking-wide">📦 SandBox Mobile</h1>
        </div>
        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-mono">
          Live
        </span>
      </header>

      {/* Vùng nội dung chính */}
      <div className="flex-1 overflow-hidden relative">
        <SandpackProvider
          template="react"
          theme="dark"
          options={{
            initMode: "immediate",
            recompileMode: "immediate",
          }}
          customSetup={{
            files: savedCode ? { "/App.js": savedCode } : undefined,
          }}
        >
          {/* Lắng nghe thay đổi code để lưu trữ tự động */}
          <CodeAutoSaver />

          <div className="w-full h-full">
            {/* TAB FILE EXPLORER */}
            {activeTab === "files" && (
              <div className="p-4 h-full overflow-y-auto bg-darkBg">
                <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                  Cây thư mục dự án
                </h3>
                <SandpackFileExplorer />
              </div>
            )}

            {/* TAB CODE EDITOR */}
            {activeTab === "code" && (
              <div className="h-full flex flex-col justify-between">
                <div className="flex-1 overflow-y-auto">
                  <SandpackCodeEditor
                    showTabs={true}
                    showLineNumbers={true}
                    showInlineErrors={true}
                    wrapContent={true} // Bắt buộc trên mobile để tránh cuộn ngang
                    closableTabs={false}
                  />
                </div>
                {/* Thanh phím tắt gắn liền phía trên bàn phím ảo */}
                <QuickKeysToolbar />
              </div>
            )}

            {/* TAB PREVIEW */}
            {activeTab === "preview" && (
              <div className="h-full bg-white">
                <SandpackPreview
                  showNavigator={true}
                  showOpenInCodeSandbox={false}
                  showRefreshButton={true}
                />
              </div>
            )}
          </div>
        </SandpackProvider>
      </div>

      {/* Navigation Bottom Tabs */}
      <nav className="h-14 bg-panelBg border-t border-neutral-800 flex justify-around items-center px-2 pb-safe">
        <button
          onClick={() => setActiveTab("files")}
          className={`flex flex-col items-center gap-0.5 w-full py-1 text-xs transition-colors ${
            activeTab === "files" ? "text-accent font-semibold" : "text-neutral-400"
          }`}
        >
          <span className="text-lg">📁</span>
          <span>Thư mục</span>
        </button>

        <button
          onClick={() => setActiveTab("code")}
          className={`flex flex-col items-center gap-0.5 w-full py-1 text-xs transition-colors ${
            activeTab === "code" ? "text-accent font-semibold" : "text-neutral-400"
          }`}
        >
          <span className="text-lg">💻</span>
          <span>Trình viết code</span>
        </button>

        <button
          onClick={() => setActiveTab("preview")}
          className={`flex flex-col items-center gap-0.5 w-full py-1 text-xs transition-colors ${
            activeTab === "preview" ? "text-accent font-semibold" : "text-neutral-400"
          }`}
        >
          <span className="text-lg">👁️‍🗨️</span>
          <span>Kết quả</span>
        </button>
      </nav>
    </div>
  );
}
// Component con hỗ trợ tự động lưu trạng thái Code vào LocalStoragefunction CodeAutoSaver() {
  const { sandpack } = useSandpack();
  useEffect(() => {
    const activeCode = sandpack.files[sandpack.activeFile]?.code;
    if (activeCode) {
      localStorage.setItem("mobile-ide-code", activeCode);
    }
  }, [sandpack.files, sandpack.activeFile]);

  return null;
}

------------------------------
## PHẦN 2: THIẾT KẾ TRANG TÀI LIỆU ĐI KÈM (DOCS INTERFACE)
Đối với trang tài liệu hướng dẫn sử dụng hoặc API cho dự án IDE, chúng ta xây dựng một giao diện tối giản chuẩn tài liệu kỹ thuật (Developer Docs) gồm thanh Sidebar bên trái và nội dung bài viết dạng Markdown hiển thị bên phải.
## Mã nguồn trang tài liệu (apps/docs/src/App.tsx)

import React, { useState } from "react";
const DOCS_DATA = {
  "gioi-thieu": {
    title: "Giới thiệu về Mobile IDE",
    content: "Dự án giả lập môi trường phát triển ứng dụng (IDE) gọn nhẹ chạy trực tiếp trên trình duyệt thiết bị di động bằng cách ứng dụng nền tảng nhân Sandpack kết hợp tối ưu giao diện dạng Tab.",
  },
  "cai-dat": {
    title: "Hướng dẫn cài đặt",
    content: "Chạy lệnh sau tại thư mục gốc của bạn:\n\nnpm i @codesandbox/sandpack-react\n\nSau đó cấu hình tailwindcss để nhận diện responsive trên các màn hình tỉ lệ nhỏ.",
  },
  "trien-khai": {
    title: "Quy trình Triển khai",
    content: "1. Build dự án ứng dụng client: npm run build\n2. Đẩy tài nguyên tĩnh lên các dịch vụ Cloudflare Pages hoặc Vercel.\n3. Cấu hình Content Security Policy (CSP) cho iframe của Sandpack để bảo mật mã nguồn thực thi.",
  },
};
type DocKeys = keyof typeof DOCS_DATA;
export default function DocsApp() {
  const [currentSection, setCurrentSection] = useState<DocKeys>("gioi-thieu");

  return (
    <div className="flex h-screen bg-stone-50 text-neutral-800 font-sans">
      {/* Sidebar cố định bên trái dành cho màn hình lớn hơn mobile */}
      <aside className="w-64 bg-white border-r border-neutral-200 p-6 flex flex-col justify-between hidden md:flex">
        <div>
          <h2 className="text-sm font-bold text-neutral-900 tracking-wider uppercase mb-6">
            Tài liệu IDE Mobile
          </h2>
          <nav className="flex flex-col gap-2">
            {Object.keys(DOCS_DATA).map((key) => (
              <button
                key={key}
                onClick={() => setCurrentSection(key as DocKeys)}
                className={`text-left px-3 py-2 rounded-md text-sm transition-all ${
                  currentSection === key
                    ? "bg-neutral-900 text-white font-medium"
                    : "text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                {DOCS_DATA[key as DocKeys].title}
              </button>
            ))}
          </nav>
        </div>
        <div className="text-xs text-neutral-400 font-mono">v1.0.0 Stable</div>
      </aside>

      {/* Vùng hiển thị nội dung chi tiết bài hướng dẫn */}
      <main className="flex-1 overflow-y-auto p-6 md:p-12 max-w-3xl">
        {/* Menu bar di động nhanh */}
        <div className="flex gap-2 mb-6 overflow-x-auto md:hidden bg-white p-2 rounded border border-neutral-200">
          {Object.keys(DOCS_DATA).map((key) => (
            <button
              key={key}
              onClick={() => setCurrentSection(key as DocKeys)}
              className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap ${
                currentSection === key ? "bg-neutral-950 text-white" : "bg-neutral-100 text-neutral-600"
              }`}
            >
              {DOCS_DATA[key as DocKeys].title}
            </button>
          ))}
        </div>

        <article className="prose prose-neutral">
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 mb-4">
            {DOCS_DATA[currentSection].title}
          </h1>
          <div className="whitespace-pre-line text-neutral-700 leading-relaxed font-normal">
            {DOCS_DATA[currentSection].content}
          </div>
        </article>
      </main>
    </div>
  );
}

------------------------------
## PHẦN 3: HƯỚNG DẪN TRIỂN KHAI CHI TIẾT (DEPLOYMENT GUIDE)## Bước 1: Build tối ưu hóa ứng dụng
Tại thư mục chứa dự án apps/ide hoặc apps/docs, thực thi lệnh build để đóng gói toàn bộ mã nguồn sang dạng phân phối tĩnh (HTML/JS/CSS):

npm run build

## Bước 2: Triển khai Hosting (Vercel / Cloudflare Pages)
Do đây hoàn toàn là ứng dụng Phía máy khách (Client-Side), bạn có thể tải trực tiếp thư mục dist sau khi build lên các dịch vụ hosting miễn phí:

   1. Cloudflare Pages: Kết nối kho Git của bạn, chọn Framework là Vite và thư mục đầu ra là dist.
   2. Vercel: Cài đặt CLI npm i -g vercel sau đó chạy lệnh vercel tại thư mục dự án và chọn các cấu hình mặc định.

## Bước 3: Cấu hình Iframe bảo mật (Quan trọng đối với Sandpack)
Do Sandpack chạy code người dùng bằng một Iframe độc lập nhằm tránh tấn công XSS chéo sang ứng dụng chính, hãy đảm bảo rằng bạn cấu hình phần Header HTTP trên máy chủ lưu trữ (ví dụ file _headers của Cloudflare Pages):

/*
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  Content-Security-Policy: frame-src 'self' https://*.codesandbox.io;

 toàn bộ kiến trúc mã nguồn cho cả ứng dụng Mobile IDE, trang Docs và hướng dẫn deploy .
thêm phần tích hợp tính năng kết nối Git (GitHub API) 
