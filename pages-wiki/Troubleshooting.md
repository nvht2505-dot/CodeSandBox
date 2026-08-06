# Troubleshooting

Vấn đề phổ biến & cách khắc phục:

1. `npm install` lỗi node-gyp
- Cài đặt build tools (Windows) hoặc Xcode tools (macOS)
2. Lint error trước khi commit
- Chạy: `npm run lint -- --fix` hoặc `npm run format`
3. Tests failing locally nhưng CI green
- Refresh cache, `node_modules` version mismatch → `rm -rf node_modules && npm install`
4. Env variable missing
- Kiểm tra `.env.example` và đảm bảo `.env.local` có đủ giá trị