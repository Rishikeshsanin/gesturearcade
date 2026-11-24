# Performance

Measured on GitHub Actions Chromium, synthetic camera, run 45484479790 (commit ee60d87eccfd679507dd73a6dbd77da9eee16757): worker CPU, requested 640x480, actual synthetic camera setting 20fps, callback rate 19.1fps, inference rate 9.5fps, render rate 62fps, observed model inference median 29.4ms (p95 also 29.4ms in a short sample), two in-flight drops, no fallback. No real hands detected in the synthetic camera, so observation age and physical input latency were unavailable. Do not treat these numbers as a sustained controlled benchmark or as a Windows laptop result.

Earlier narrow synthetic path proxy: 6/15 old gate, 11/15 initial candidate; 0/3 bridges after long gaps. New established-motion rescue has dedicated positive/negative regression tests, but no new representative accuracy percentage has been established. The required 95% valid-swipe detection target remains unmet/unverified.

Adaptive inference downsampling, one in-flight frame, bounded display extrapolation, capped fruit history and particle pool. Browser backgrounding stops capture. No physical CPU/GPU/memory or thermal data. Next: controlled long-duration worker/main-thread runs, consented ground-truth hand replay, physical-device latency and frame-drop tests, long sessions and repeated game switching.
