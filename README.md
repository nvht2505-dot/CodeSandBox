<p align="center">
  <img src="apps/ide/public/logo.svg" alt="Mobile Sandbox IDE logo" width="120" />
</p>

# Mobile Sandbox IDE

Mobile Sandbox IDE là monorepo Vite + React + TypeScript gồm một web app IDE tối ưu cho điện thoại và một trang tài liệu đi kèm. Dự án dùng Sandpack để chỉnh sửa/xem trước code trực tiếp, có quick keys cho bàn phím ảo, autosave local, xuất workspace và tích hợp GitHub cơ bản.

## Điểm nổi bật

- **Mobile-first IDE**: điều hướng dạng tab cho Files, Code, Preview, Git và Settings.
- **Sandpack runtime**: chỉnh sửa và preview React/Vanilla trực tiếp trong trình duyệt.
- **Quick Keys Toolbar**: nhập nhanh `{}`, `()`, `[]`, dấu quote và ký tự code phổ biến trên mobile.
- **Autosave**: lưu code hiện tại vào `localStorage` để hạn chế mất dữ liệu khi reload.
- **GitHub Sync**: helper tạo repo và push file qua GitHub REST API.
- **Docs app**: trang tài liệu hiện đại có logo SVG và responsive layout.
- **Domain/DNS ready**: có `CNAME`, `_headers` và tài liệu `docs/domain-and-dns.md`.

## Cấu trúc thư mục

```text
mobile-sandbox-ide/
├── apps/
│   ├── ide/                 # Web app Mobile IDE
│   │   ├── public/           # Logo, CNAME, security headers
│   │   └── src/              # App, styles, services, tests
│   └── docs/                # Trang tài liệu
│       ├── public/           # Logo, CNAME, security headers
│       └── src/              # Docs UI
├── docs/                    # Tài liệu vận hành/domain/DNS
├── package.json             # npm workspaces scripts
└── tsconfig.base.json       # TypeScript base config
```

## Chạy local

```bash
npm install
npm run dev:ide
npm run dev:docs
```

## Kiểm thử và build

```bash
npm run typecheck
npm run test
npm run build
```

## Cấu hình GitHub OAuth

Tạo GitHub OAuth App, đặt callback URL theo domain deploy của bạn, rồi khai báo biến môi trường client-side:

```bash
VITE_GITHUB_CLIENT_ID=your_github_oauth_client_id
```

> Không đưa `GITHUB_CLIENT_SECRET` vào frontend. Nếu cần đổi OAuth `code` sang access token, hãy thực hiện ở serverless function/backend riêng.

## Domain và DNS

Domain mẫu trong repo:

- IDE: `ide.mobile-sandbox.example.com`
- Docs: `docs.mobile-sandbox.example.com`

Xem hướng dẫn chi tiết trong [`docs/domain-and-dns.md`](docs/domain-and-dns.md). Trước khi deploy thật, thay domain mẫu bằng domain sở hữu thực tế của bạn.

## Deploy

1. Build workspace bằng `npm run build`.
2. Deploy `apps/ide/dist` cho IDE và `apps/docs/dist` cho Docs.
3. Trỏ DNS theo nhà cung cấp hosting.
4. Kiểm tra security headers và GitHub OAuth callback URL sau khi domain hoạt động.

## License

Dự án sử dụng giấy phép AGPL-3.0. Xem [`LICENSE`](LICENSE).
