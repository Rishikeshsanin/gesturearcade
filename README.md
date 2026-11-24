# GestureArcade

Browser-based camera-controlled arcade, development version 0.1.0-dev.12. Twenty playable-mechanics development games and Gesture Lab, not a production-certified product.

## Run locally

Use Node 22 and run `npm run check` and `npm test`. Serve the repository root over HTTPS or localhost. To run Chromium smoke: `npm install --no-save --package-lock=false playwright@1.56.1`, `npx playwright install chromium`, then `node browser-smoke.mjs`.

Camera permission is optional for conventional mouse/keyboard play. Automatic worker backend or main-thread reference is selectable. Keep movement comfortable. Camera and local clips never upload to a server. Model files are fetched from pinned CDN paths. Offline application shell works after cache installation; camera models are not yet bundled for offline use.

The original baseline https://gesturearcade-airslice-lab.vercel.app is preserved. See DEVELOPMENT_STATUS.md for the exact current executable commit, CI and deployment evidence. See KNOWN_LIMITATIONS.md for the release gates.
