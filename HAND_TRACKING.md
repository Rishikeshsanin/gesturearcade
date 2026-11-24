# Tracking

MediaPipe Hand Landmarker 0.10.21. Worker-first CPU model using transferable ImageBitmap with one in-flight inference, timeout and explicit termination. Main-thread GPU/CPU fallback is selectable and also uses adaptive downsampling. The worker path was confirmed to run actual MediaPipe inference in Chromium with a synthetic camera (run 45484479790). Model assets and WASM remain external pinned dependencies.

Raw observations, not display predictions, score collisions. Association uses normalized palm displacement/time, relative fingertip shape, hand scale and ambiguity rejection. Established tracks may use conservative velocity-consistent rescue with strict residual, scale and handedness constraints. Empty frames and gaps over 120ms still break continuity. No prediction is used to score a hit. Display prediction is limited to 24ms and 4.5% normalized distance.

Adaptive inference profiles use widths 384/640/960, with frame interval and sustained timing hysteresis. Main-thread fallback downsampling uses a canvas. Stationary-hand calibration estimates median displacement and scale and adjusts only display smoothing; it never loosens collision rules. Handedness score is not detection confidence.

Nine guided Lab tests report observations, completed prompted paths, recovery, and pinch cycles. They do not supply physical ground truth. Real motion blur, camera exposure, occlusion, different skin/lighting/backgrounds and device performance remain mandatory acceptance work. Exact thresholds are provisional.
