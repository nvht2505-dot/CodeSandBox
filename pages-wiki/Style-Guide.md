# Style Guide

TypeScript
- Strict mode nếu có: bật `strict` trong tsconfig
- Sử dụng `readonly` / `as const` khi cần
- Prefer typed interfaces over `any`

Lint & Format
- ESLint + Prettier cấu hình chuẩn (follow existing config)
- Pre-commit hooks (Husky + lint-staged) — format/ lint files staged

Commit message
- Conventional Commits: feat/fix/docs/style/refactor/test/chore