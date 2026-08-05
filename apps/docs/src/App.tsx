import { useState } from "react";

const DOCS_DATA = {
  "gioi-thieu": {
    title: "Giới thiệu về Mobile IDE",
    content: "Mobile Sandbox IDE là môi trường phát triển React gọn nhẹ trên trình duyệt di động, dùng Sandpack để chỉnh sửa và xem trước mã nguồn trực tiếp.",
  },
  "cai-dat": {
    title: "Hướng dẫn cài đặt",
    content: "Chạy npm install tại thư mục gốc, sau đó dùng npm run dev:ide hoặc npm run dev:docs để mở từng ứng dụng.",
  },
  "trien-khai": {
    title: "Quy trình triển khai",
    content: "Chạy npm run build để build tất cả workspace, rồi triển khai thư mục dist của từng app lên Cloudflare Pages hoặc Vercel.",
  },
};

type DocKey = keyof typeof DOCS_DATA;

export default function DocsApp() {
  const [currentSection, setCurrentSection] = useState<DocKey>("gioi-thieu");

  return (
    <div className="docs-shell">
      <aside>
        <div className="logo"><img src="/logo.svg" alt="Mobile Sandbox logo" /><h2>Tài liệu IDE Mobile</h2></div>
        {Object.keys(DOCS_DATA).map((key) => (
          <button className={currentSection === key ? "active" : ""} key={key} onClick={() => setCurrentSection(key as DocKey)}>
            {DOCS_DATA[key as DocKey].title}
          </button>
        ))}
      </aside>
      <main>
        <h1>{DOCS_DATA[currentSection].title}</h1>
        <p>{DOCS_DATA[currentSection].content}</p>
      </main>
    </div>
  );
}
