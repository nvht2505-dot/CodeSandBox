# Thiết lập domain và DNS

Tài liệu này dùng domain mẫu `mobile-sandbox.example.com`. Khi triển khai thật, thay toàn bộ giá trị này bằng domain của bạn.

## Bản ghi DNS đề xuất

| Mục đích | Host | Type | Value |
| --- | --- | --- | --- |
| Mobile IDE | `ide` | `CNAME` | `cname.vercel-dns.com` hoặc target Cloudflare Pages |
| Docs | `docs` | `CNAME` | `cname.vercel-dns.com` hoặc target Cloudflare Pages |
| Root redirect | `@` | `A/ALIAS` | theo nhà cung cấp hosting |

## Cấu hình trong repo

- `apps/ide/public/CNAME` khai báo domain mẫu `ide.mobile-sandbox.example.com`.
- `apps/docs/public/CNAME` khai báo domain mẫu `docs.mobile-sandbox.example.com`.
- Mỗi app có file `_headers` để áp dụng security headers khi deploy lên Cloudflare Pages hoặc nền tảng tương thích.

## Biến môi trường

```bash
VITE_GITHUB_CLIENT_ID=your_github_oauth_client_id
```

Nếu dùng OAuth serverless callback, hãy giữ `GITHUB_CLIENT_SECRET` ở server/backend, không đưa vào client.
