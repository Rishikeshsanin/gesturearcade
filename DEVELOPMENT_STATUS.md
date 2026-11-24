# Development checkpoint

Version 0.1.0-dev.1. Branch feat/tracking-foundation. Initial main 73846e816b0d045018e3c9e2f41000ef2da02ecc.

Implemented: raw swept relative geometry, timestamped continuity, loss reset, adaptive display filter, bounded display prediction, two-hand association, camera lifecycle, basic Lab, basic AirSlice, mouse/touch fallback, diagnostics export. Model integration/browser rendering not yet verified.

Executed inline pure-function assertions: 8 passed. Synthetic proxy results: {"total":15,"oldHits":6,"newHits":11,"falseHits":0,"lossCases":3,"scope":"Synthetic normalized landmark paths; legacy proxy models only distance and time gates; no physical camera or model inference."}

Next: verify CI, confirm CDN version and CSP with browser, deploy isolated preview, test camera lifecycle, physical camera benchmark, fix collision timeline alignment and worker inference, complete Lab, then expand games. No production certification. Full prototype source recovery blocked by connector truncation; local runtime DNS unavailable. Never modify baseline.

## Checkpoint: 0.1.0-dev.3

- Branch: feat/tracking-foundation; draft PR #1 https://github.com/Rishikeshsanin/gesturearcade/pull/1
- Main remains initial commit 73846e816b0d045018e3c9e2f41000ef2da02ecc.
- Latest executable code/test commit: 28a81da32d45ab82b8c3ce96fa0e4c1e5886b0dc. Subsequent documentation commits do not change executable code.
- Vercel dev-only project prj_fD9EGTWt6mWlxBgFDQfQ4IPt4j6Z. Stable dev URL https://gesturearcade-dev.vercel.app (dev.2, Vercel designated production target within dev-only project); dev.3 preview https://gesturearcade-ntvwixi3m-rishikeshsanin-1193s-projects.vercel.app (deployment dpl_9ykyh28EkKZoRfYz666QLMB1QgRy, READY, HTML and lab.js HTTP 200; Vercel authentication may be required). Original prototype untouched.
- Run 45479554579 core 11/11 passed; Chromium installation failed because ubuntu-latest resolves to Ubuntu 26.04. Fixed runner to ubuntu-24.04. Run 45479851229 core and Chromium UI/fake camera lifecycle both passed. Latest run 45480074972 at code commit above: core 15/15 passed, Chromium actual MediaPipe initialization on synthetic camera still in progress when checked. Inspect this run first; do not claim browser model test passed without verification.
- Earlier direct pure-function checks: 8 tracking and 5 timeline assertions passed. Narrow synthetic benchmark remains 6/15 legacy-gate proxy, 11/15 candidate, 0/3 long-gap bridges.
- Added time-aligned fruit history and nine guided live scenarios, diagnostics export, pinned stable MediaPipe candidate, real model startup smoke using production CSP. Production security headers verified on dev.2. No physical device or real hand dataset accessible here.
- Exact next action: inspect latest CI logs; if actual model initialization fails, fix version/CSP/API and rerun. Then test dev.3 on physical Windows webcam using guided slow/fast/precision/two-hand/recovery scenarios, export numeric JSON; obtain representative consented replay data. Compare candidate tracker against baseline and measure capture/inference/render timing, missed/false swipes. Prioritize worker versus synchronous model comparison and camera lifecycle. Do not open game expansion release gate before tracking is reliable; all 19 remaining games and broader platform phases remain open. Do not claim perfect or complete.
- Manual deployment uses exact GitHub file contents; automated Git-to-Vercel CI/CD is not yet linked, no final production promotion. No paid resource deliberately created.
