# CI & Release

Mô tả pipeline CI (GitHub Actions)
- Lint -> Typecheck -> Test -> Build
- PR check: chạy lint + test
- Release: tag semantic versioning + build artifacts

Ví dụ workflow:
- .github/workflows/ci.yml — chạy lint/test
- .github/workflows/release.yml — release on tag

Checklist trước merge:
- [ ] Lint pass
- [ ] Tests pass
- [ ] Typecheck pass
- [ ] PR description đầy đủ, link issue (nếu có)