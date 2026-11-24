# Architecture

Static native ES modules, Canvas 2D, MediaPipe Tasks Vision, Web Audio and node:test. No account, backend, database or paid API. Chosen for low overhead and reproducibility.

- app.js: application coordinator, camera lifecycle, render loop, input routing, Lab and AirSlice integration.
- vision-client.js / vision-worker.js / vision-model.js: worker-first Hand Landmarker (CPU) and GPU/CPU main-thread fallback; one frame in flight, bounded timeout, explicit disposal.
- adaptive.js: hysteretic adaptive inference profiles and stationary calibration.
- tracking.js / timeline.js: raw observation segments, hand identity association, bounded visual prediction and timestamp-aligned collision geometry.
- lab.js: prompted live diagnostics.
- games.js / flagships.js / sports.js / experimental.js: game lifecycle classes with update, draw and reset contracts.
- profile.js: local records, favorites, recent play and achievements.
- audio.js / effects.js: generated audio and bounded particle allocation.
- navigation.js: optional dwell/pinch state machine.
- recording.js: local canvas recording; optional generated game-audio track only.
- sw.js: versioned same-origin offline shell.

Current implementation uses a shared render/input coordinator but AirSlice remains inline. No remote multiplayer or server-authoritative scoring. Later extract a dedicated camera/lifecycle coordinator, unify game registration, and improve per-game performance and accessibility.
