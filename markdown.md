```markdown
<!-- ===========================
     README.md — CodeSandbox
     Tác giả: nvht2505-dot
     Nội dung: Tiếng Việt, hiện đại, SVG inline
     =========================== -->

<div align="center">

<!-- Logo SVG -->
<svg width="220" height="80" viewBox="0 0 440 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="CodeSandbox Logo">
  <defs>
    <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#7b61ff"/>
      <stop offset="100%" stop-color="#00d4ff"/>
    </linearGradient>
  </defs>
  <rect rx="20" ry="20" width="440" height="160" fill="url(#g1)"/>
  <g transform="translate(28,26)" fill="#fff" font-family="Segoe UI, Roboto, Helvetica, Arial" font-weight="700">
    <!-- Icon: code brackets -->
    <g transform="translate(0,0)">
      <rect x="0" y="0" width="120" height="120" rx="16" fill="rgba(255,255,255,0.12)"/>
      <path d="M36 36 L52 60 L36 84" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M84 36 L68 60 L84 84" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <!-- Text -->
    <text x="150" y="60" font-size="46" fill="#fff">CodeSandbox</text>
    <text x="150" y="96" font-size="18" fill="rgba(255,255,255,0.95)">Môi trường thử nghiệm mã — nhanh, đơn giản, trực quan</text>
  </g>
</svg>

<!-- Badges row: SVG badges (static) -->
<div style="margin-top:12px; display:flex; gap:8px; justify-content:center; flex-wrap:wrap;">
  <!-- Version Badge -->
  <svg height="28" viewBox="0 0 90 28" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="version">
    <rect rx="4" width="90" height="28" fill="#2d2d2d"/>
    <rect rx="4" x="52" width="38" height="28" fill="#4CAF50"/>
    <text x="12" y="18" fill="#fff" font-family="Verdana" font-size="12">version</text>
    <text x="66" y="18" fill="#fff" font-family="Verdana" font-size="12">v1.0.0</text>
  </svg>

  <!-- License Badge -->
  <svg height="28" viewBox="0 0 110 28" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="license">
    <rect rx="4" width="110" height="28" fill="#2d2d2d"/>
    <rect rx="4" x="62" width="48" height="28" fill="#0366d6"/>
    <text x="12" y="18" fill="#fff" font-family="Verdana" font-size="12">license</text>
    <text x="76" y="18" fill="#fff" font-family="Verdana" font-size="12">MIT</text>
  </svg>

  <!-- Sponsor Badge -->
  <svg height="28" viewBox="0 0 120 28" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="sponsor">
    <rect rx="4" width="120" height="28" fill="#2d2d2d"/>
    <rect rx="4" x="70" width="50" height="28" fill="#ff4081"/>
    <g transform="translate(12,4)">
      <path d="M6 6 C6 3 12 1 14 6 C16 1 22 3 22 6 C22 11 14 14 14 14 C14 14 6 11 6 6 Z" fill="#fff"/>
    </g>
    <text x="32" y="18" fill="#fff" font-family="Verdana" font-size="12">sponsor</text>
    <text x="86" y="18" fill="#fff" font-family="Verdana" font-size="12">Support</text>
  </svg>
</div>

</div>

---

# Mô tả ngắn
CodeSandbox — một kho mẫu và môi trường thử nghiệm mã dành cho cá nhân và dự án nhỏ. README này thiết kế theo phong cách hiện đại, trực quan, tập trung vào trải nghiệm người dùng khi lần đầu tiếp cận repository.

---

## Mục lục
- [Tính năng chính](#tính-năng-chính)
- [Ảnh minh họa & Hướng dẫn nhanh](#ảnh-minh-họa--hướng-dẫn-nhanh)
- [Bắt đầu nhanh (Quick Start)](#bắt-đầu-nhanh-quick-start)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Đóng góp](#đóng-góp)
- [Nhà tài trợ](#nhà-tài-trợ)
- [License](#license)
- [Liên hệ](#liên-hệ)

---

## Tính năng chính
- Giao diện đơn giản, hướng thử nghiệm nhanh.
- Bộ mẫu (templates) để bắt đầu cho HTML/CSS/JS, React, Vue, Node.
- Hỗ trợ chạy local bằng script chuẩn (npm / yarn) hoặc Docker.
- Tích hợp hướng dẫn trực quan (SVG) cho mọi bước.

---

## Ảnh minh họa & Hướng dẫn nhanh (SVG)
Dưới đây là các SVG hướng dẫn từng bước — bạn có thể để trực tiếp trong README để giúp người mới.

<!-- Hướng dẫn: Cài đặt, Chạy, Xem -->
<div align="center" style="display:flex; gap:18px; justify-content:center; flex-wrap:wrap; margin:18px 0;">
  <!-- Step 1: Install -->
  <svg width="200" height="120" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Install">
    <rect rx="10" width="200" height="120" fill="#0f1724"/>
    <g fill="#fff" font-family="Segoe UI, Roboto" font-size="14">
      <text x="20" y="28" font-weight="700">1. Cài đặt</text>
      <text x="20" y="52" font-size="12" fill="#9aa7bf">Cài dependencies</text>
      <rect x="20" y="66" width="160" height="34" rx="6" fill="#111827"/>
      <text x="30" y="88" font-family="monospace" font-size="12">npm install</text>
    </g>
  </svg>

  <!-- Step 2: Run -->
  <svg width="200" height="120" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Run">
    <rect rx="10" width="200" height="120" fill="#07113a"/>
    <g fill="#fff" font-family="Segoe UI, Roboto" font-size="14">
      <text x="20" y="28" font-weight="700">2. Chạy</text>
      <text x="20" y="52" font-size="12" fill="#9aa7bf">Chạy môi trường dev</text>
      <rect x="20" y="66" width="160" height="34" rx="6" fill="#0b1226"/>
      <text x="30" y="88" font-family="monospace" font-size="12">npm start</text>
    </g>
  </svg>

  <!-- Step 3: Mở trình duyệt -->
  <svg width="200" height="120" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Preview">
    <rect rx="10" width="200" height="120" fill="#091827"/>
    <g fill="#fff" font-family="Segoe UI, Roboto" font-size="14">
      <text x="20" y="28" font-weight="700">3. Xem</text>
      <text x="20" y="52" font-size="12" fill="#9aa7bf">Mở localhost</text>
      <rect x="20" y="66" width="160" height="34" rx="6" fill="#0b1622"/>
      <text x="30" y="88" font-family="monospace" font-size="12">http://localhost:3000</text>
    </g>
  </svg>
</div>

---

## Bắt đầu nhanh (Quick Start)

Yêu cầu trước:
- Node.js >= 14 (hoặc Docker)
- npm hoặc yarn

Cách cài:
```bash
# Clone repo
git clone https://github.com/nvht2505-dot/codesandbox.git
cd codesandbox

# Cài dependencies
npm install
# hoặc
# yarn install
```

Chạy local:
```bash
# Chạy môi trường dev
npm start

# Build production
npm run build
```

Chạy bằng Docker (mẫu):
```bash
docker build -t codesandbox .
docker run -p 3000:3000 codesandbox
```

Lưu ý: Nếu repo dùng stack khác (ví dụ: Python, Go), thay thế các bước trên tương ứng.

---

## Cấu trúc dự án (gợi ý)
- /src — mã nguồn
- /public — tài nguyên tĩnh
- /docs — hướng dẫn chi tiết
- package.json — script & dependencies
- README.md — tài liệu (bạn đang xem)

(Cập nhật lại phần này nếu cấu trúc repo thực tế khác.)

---

## Đóng góp
Rất hoan nghênh mọi đóng góp:
1. Fork repo
2. Tạo branch: git checkout -b feat/my-feature
3. Commit và push lên fork
4. Tạo Pull Request mô tả rõ tính năng/sửa lỗi

Template PR/Issue: cung cấp steps để tái hiện lỗi, môi trường, và log (nếu có).

---

## Nhà tài trợ
Bạn có thể hỗ trợ dự án bằng cách:
- Bấm vào nút Sponsor trên GitHub
- Gửi góp ý, issue, hay PR

<!-- Inline Sponsor SVG (liên kết placeholder) -->
<div align="center" style="margin:12px 0;">
  <a href="https://github.com/sponsors/nvht2505-dot" target="_blank" rel="noopener">
    <svg height="40" viewBox="0 0 160 40" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sponsor nvht2505-dot">
      <rect rx="8" width="160" height="40" fill="#0b1226"/>
      <g transform="translate(14,10)" fill="#fff" font-family="Segoe UI, Roboto">
        <path d="M6 8 C6 3 12 1 14 6 C16 1 22 3 22 8 C22 14 14 18 14 18 C14 18 6 14 6 8 Z" fill="#ff6b81"/>
        <text x="36" y="17" font-size="14">Hỗ trợ tác giả</text>
      </g>
    </svg>
  </a>
</div>

---

## License
Distributed under the MIT License. Xem file LICENSE để biết chi tiết.

---

## Liên hệ
- Tác giả: nvht2505-dot
- Repo: https://github.com/nvht2505-dot/codesandbox
