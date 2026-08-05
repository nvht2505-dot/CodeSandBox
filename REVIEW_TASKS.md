# Nhiệm vụ đề xuất sau khi xem xét mã gốc

## 1. Sửa lỗi đánh máy / định dạng Markdown
- Tách các tiêu đề đang bị dính liền như `IDE## PHẦN 1` và `apps/ide)## Bước 1` thành các dòng tiêu đề Markdown riêng biệt.
- Đưa các khối mã vào fenced code block để README hiển thị đúng và có thể sao chép.
- Tách các câu lệnh import/comment bị dính liền, ví dụ `import React...;import { ... }` và `mobileconst QuickKeysToolbar`.

## 2. Sửa lỗi chức năng GitHub API
- Đổi URL GitHub REST API từ `https://github.com` sang `https://api.github.com` cho các endpoint `/user`, `/user/repos` và `/repos/{owner}/{repo}/contents/{path}`.
- Đổi endpoint OAuth token từ `https://github.com` sang `https://github.com/login/oauth/access_token`.
- Sửa URL đăng nhập GitHub thành `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo,user`.

## 3. Sửa khác biệt giữa chú thích, tài liệu và mã
- Tài liệu mô tả cấu trúc repo có `apps/ide`, `apps/docs` và `package.json`, nhưng repo hiện chỉ có README và LICENSE; cần scaffold cấu trúc hoặc ghi rõ đây mới là bản thiết kế.
- Tài liệu nói dùng TypeScript nhưng các ví dụ lại nhắc `/App.js` và `api/github-oauth.js`; cần thống nhất phần mở rộng và hướng dẫn build.
- Chú thích `Cấu hình Iframe bảo mật` đang đưa `X-Frame-Options: SAMEORIGIN`, dễ chặn iframe/sandbox cần thiết; cần làm rõ policy dành cho app host và iframe của Sandpack.

## 4. Cải thiện quy trình kiểm thử
- Thêm dự án tối thiểu có `package.json`, script `lint`, `typecheck`, `test` và `build` để biến tài liệu thành mã có thể kiểm chứng.
- Thêm unit test cho helper GitHub service: endpoint, header Authorization, payload tạo repo, payload cập nhật file có/không có `sha`.
- Thêm smoke test hoặc Playwright mobile viewport để kiểm tra ba tab chính, thanh Quick Keys và luồng lưu/khôi phục `localStorage`.
