# Known limitations

- All twenty modes have basic development mechanics; none are final release-certified. Missing richer game-specific progression, polished artwork, tutorials, complete sport rules, tournament/online rooms, game-by-game accessibility and balancing.
- Physical-camera acceptance is mandatory. Earlier two-frame proxy remains 11/15 candidate vs 6/15 legacy gate, 0/3 long-gap bridges. Motion rescue tests pass but 95% physical/replay accuracy, true latency, motion blur/occlusion and device compatibility are not established.
- Worker inference confirmed in Chromium synthetic-camera CI; short samples 7.8–9.5 inference fps below target 25–30, no real hand detection or physical latency measured. Stationary calibration is a display-only heuristic.
- Local duel in Pong/Hockey uses provisional left/right identity. Overlapping hands can swap; no online networking.
- dev.12 corrected empty recordings; actual portrait and landscape decode and downloads passed Chromium. Long-session and cross-browser codec checks remain.
- Offline shell reload passed Chromium; camera model/WASM not cached for offline camera use.
- Local environment cannot resolve GitHub DNS, and local Chromium navigation to localhost was blocked by administrator. GitHub Actions and connected Vercel provide verification; no physical Windows device access.
- Production release, automated deploy gate, cross-browser, memory, accessibility and dependency integrity audit not complete.
