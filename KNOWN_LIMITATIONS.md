# Known limitations

- Not a release: two development experiences (Gesture Lab and AirSlice), 19 games remaining, no progression or multiplayer.
- Synthetic path proxy detects 11/15 vs 6/15 old gates; 0/3 long-gap bridges. Target 95% unmet. No physical ground truth, camera FPS, input-to-photon, jitter or actual hand-model accuracy claims.
- Nine prompted live scenarios now available. They measure visible observations, completed paths, pinch cycles and recovery, not ground-truth user actions.
- Main-thread synchronous MediaPipe inference with stable version candidate 0.10.21, GPU/CPU fallback; worker comparison, lighting analysis, calibration, full gesture confidence and physical-device measurement pending.
- AirSlice now uses timestamp-aligned fruit history; real camera collision accuracy still unverified. Basic score, bombs, combos, mouse/touch fallback only. Keyboard gameplay, polished feedback, multiple modes and reusable game lifecycle pending.
- Prior Chromium fake-camera cleanup and UI smoke passed. Latest real model startup on synthetic camera CI pending. No physical webcam, cross-browser, long-session or final security acceptance.
- Vercel dev project only. Original AirSlice baseline untouched. No final production release.
