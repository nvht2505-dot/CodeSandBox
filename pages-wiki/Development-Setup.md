
```markdown name=Development-Setup.md
# Thiết lập môi trường phát triển

Bài này hướng dẫn chi tiết cho developer muốn làm việc trên CodeSandBox.

1. Fork & branch
- Fork repo nếu bạn không có quyền push.
- Tạo branch theo kiểu: `feat/<short-description>` hoặc `fix/<short-description>`.

2. Cấu hình local
- Sao chép `.env.example` thành `.env.local` và điền biến cần thiết.
- Nếu repo dùng DB/local services, tham khảo mục “Services” dưới đây.

3. Tools khuyến nghị
- Editor: VSCode với extensions: ESLint, Prettier, TypeScript
- GitHub CLI (gh) cho thao tác PR nhanh
- Husky + lint-staged (nếu đã cấu hình) sẽ tự chạy pre-commit hooks

4. Scripts hữu ích (package.json)
- `npm run dev` — dev server
- `npm run build` — build production
- `npm test` — chạy test
- `npm run lint` — ESLint
- `npm run format` — Prettier

5. Debugging
- Sử dụng source maps khi debug
- Chạy unit tests ở chế độ watch: `npm run test:watch` (nếu có)