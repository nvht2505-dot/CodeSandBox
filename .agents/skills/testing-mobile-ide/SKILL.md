---
name: testing-mobile-ide
description: How to run and browser-test the apps/ide mobile Sandpack IDE in this repo, including mobile-viewport emulation and stubbing GitHub OAuth/API calls without a real GitHub login.
---

# Testing the mobile Sandpack IDE (apps/ide)

## Node version
The default `/usr/bin/node` (v20.18.x) is too old for vite/vitest here. Always run:

```bash
export PATH=~/.nvm/versions/node/v22.12.0/bin:$PATH
```

before any `npm` command. Root scripts: `npm run lint`, `npm run typecheck`, `npm test`,
`npm run build`, `npm run dev:ide` (vite `--host 0.0.0.0`, port 5173).

## Mobile viewport + network stubbing via CDP (no Playwright on the box)
Playwright is not installed. The Devin Chrome instance exposes a remote debugging port
(check with `ps aux | grep remote-debugging-port`; it has been `29229`). A small `ws`-based node
script can attach to the visible tab and:

- emulate a phone viewport: `Emulation.setDeviceMetricsOverride {width:390, height:844, mobile:true}`
- intercept network: `Fetch.enable` with URL patterns, then `Fetch.fulfillRequest` /
  `Fetch.failRequest` per request.

Gotchas learned:
- Cross-origin `POST` to `github.com/login/oauth/access_token` triggers a **CORS preflight**;
  the preflight IS delivered as a `Fetch.requestPaused` with `method: "OPTIONS"` — fulfill it with
  `204` + `Access-Control-Allow-Origin/Methods/Headers` or the real request never fires.
- Add the same CORS headers to the fulfilled response body.
- The CDP session survives page navigations/reloads of that tab, so start the stub first, then
  navigate. Counting `Fetch.requestPaused` events is the best way to prove "the request fired
  exactly once" (e.g. React StrictMode double-effect regressions).
- Launch it with `nohup node stub.js ... &`; do not `pkill -f stub.js` from inside an exec call —
  the pattern can match the wrapping shell and kill your own command.

## App specifics
- Bottom nav tabs: `files`, `code`, `preview`, `git` (plain buttons, lowercase labels).
- Code auto-saves the active file to `localStorage["mobile-ide-code"]`; it is restored on next load
  via `<SandpackProvider files={{"/App.js": {code}}}>`. Clear localStorage between runs for a clean state.
- GitHub token lives in `localStorage["github_token"]`; the git tab shows "Sign in with GitHub" when absent
  and `Đã kết nối: @<login>` (Vietnamese UI strings) when present.
- Without `VITE_GITHUB_CLIENT_ID` the sign-in button shows
  `Thiếu VITE_GITHUB_CLIENT_ID trong cấu hình môi trường.` — use this to test the signed-out path
  instead of a real GitHub login.
- OAuth callback can be simulated by loading `/?code=<anything>&state=<anything>` with the token
  endpoint stubbed; the app strips `code`/`state` via `history.replaceState`.

## Known/possible defect
The Sandpack **preview only renders on its first mount**. Switching `preview → code → preview`
leaves the pane blank (empty iframe `src`, console warning
`[sandpack-react]: dispatch cannot be called while in idle mode`); the Sandpack refresh button does not
recover it, only a full page reload does. If you need to verify that an edit reaches the preview,
reload the page and open the `preview` tab on a fresh mount. If this is ever fixed, keeping the
preview mounted (CSS-hidden) instead of unmounting per tab is the likely workaround.

## Devin Secrets Needed
None for the flows above (GitHub calls are stubbed). A real end-to-end GitHub push test would need
`VITE_GITHUB_CLIENT_ID` plus a GitHub OAuth app/account.
