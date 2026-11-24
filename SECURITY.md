# Security

Static application, no accounts, server storage, credentials, paid APIs or online rooms. Vercel headers include CSP, no microphone/geolocation permission, same-origin camera permission, no framing, nosniff and no-referrer. The exact CSP is in vercel.json. CSP and actual MediaPipe worker/main-thread model initialization were exercised in Chromium CI. CDN dependency pinned to MediaPipe 0.10.21, model URL version 1; complete integrity/SBOM review still needed. No external frame transfer. No automatic social-media upload. Production and cross-browser security acceptance pending.
