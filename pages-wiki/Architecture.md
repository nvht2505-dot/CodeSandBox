# Kiến trúc & Thành phần

Tổng quan kiến trúc hiện tại của CodeSandBox.

- Ngôn ngữ chính: TypeScript
- Frontend: (nêu framework nếu có, ví dụ React/Next.js/Vue)
- Styles: CSS (cấu trúc/guide nếu dùng CSS Modules / Tailwind)
- Backend / API: (nếu repo có phần server)
- Tests: Jest / Vitest / Testing Library (ghi rõ)
- CI: GitHub Actions (mô tả ngắn luồng CI)

Mô tả các module chính
- core/ — xử lý logic cốt lõi
- ui/ — component, theme, layout
- packages/ — các package nội bộ (nếu monorepo)
- scripts/ — các công cụ tiện ích

Lưu ý thiết kế
- Type-safety ưu tiên: giữ types rõ ràng, export types, dùng inference.
- Separation of concerns giữa UI và business logic.