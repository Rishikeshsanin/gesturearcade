# Performance

GitHub Actions Chromium synthetic-camera observations, worker CPU without fallback:
- dev.11 run 45484479790: 640x480, actual synthetic camera 20 fps, 19.1 callbacks/s, 9.5 inference fps, 62 render fps, 29.4ms median model inference; two in-flight drops.
- dev.12 run 45484932300: same camera setting, 19.5 callbacks/s, 7.8 inference fps, 62.5 render fps, 33.1ms median model inference; two in-flight drops.

Short samples, not sustained controlled comparison. No real hands in synthetic camera, so physical input latency and observation age unavailable. Inference throughput remains below 25–30 target. Earlier narrow synthetic path proxy: 6/15 old gate, 11/15 initial candidate; 0/3 bridges after long gaps. Established-motion rescue positive/negative regression tests pass but no representative accuracy percentage established. 95% target unmet/unverified.

Adaptive inference downsampling, one in-flight frame, bounded display extrapolation, capped fruit history and particle pool. Browser backgrounding stops capture. No physical CPU/GPU/memory or thermal data. Next: sustained controlled worker/main-thread runs, consented ground-truth hand replay, physical-device latency and frame-drop tests, long sessions and repeated game switching.
