# GestureArcade

Browser-based camera-controlled arcade, development version 0.1.0-dev.12. Twenty playable-mechanics development games and Gesture Lab, not a production-certified product.

Latest verified development preview: https://gesturearcade-9uup1r3od-rishikeshsanin-1193s-projects.vercel.app. CI: https://github.com/Rishikeshsanin/gesturearcade/actions/runs/45484932300. Preview may require Vercel authentication.

## Run locally

Use Node 22 and run `npm run check` and `npm test`. Serve repository root over HTTPS or localhost. Chromium smoke: `npm install --no-save --package-lock=false playwright@1.56.1`, `npx playwright install chromium`, then `node browser-smoke.mjs`.

Camera permission optional for conventional mouse/keyboard play. Automatic worker backend or main-thread reference selectable. Keep movement comfortable. Camera and local clips never upload to a server. Model files fetched from pinned CDN paths. Offline application shell works after cache installation; camera models not yet bundled for offline use.

Original baseline https://gesturearcade-airslice-lab.vercel.app preserved. See DEVELOPMENT_STATUS.md for exact code commit, evidence and continuation; KNOWN_LIMITATIONS.md for release gates.
