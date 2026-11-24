# Game engine

All 20 requested names have development implementations, not final polished releases. Shared lifecycle (update/draw/reset), score, pause/restart, local records, pointer alternatives and hand observations. AirSlice uses timestamp-aligned relative swept collision, three modes (classic, timed, zen) and bounded particles.

| Collection | Modes |
| --- | --- |
| Arcade | AirSlice, AirPong, AirHockey, TargetRush, Ninja Reflex |
| Flagship | SpellBattle, BeatHands, GravityHands, AirRace, ShadowBoxing |
| Sports | AirCricket, AirBasketball, AirBowling, AirTennis, AirBadminton |
| Experimental | PortalMaster, HandTetris, SpiderHands, RealityDefender, AirDrums |

Local duel is implemented for Pong and Hockey. Same-camera left/right assignment is provisional and can swap on overlap. Pong also supports W/S for the second paddle. No online rooms, tournaments or authoritative scoring yet. Each game has a first mechanical implementation; progression, full rules, balancing, richer visual/audio identity, accessibility and game-specific acceptance remain required.

Generated audio is original synthesized effects/metronome; no copyrighted music or assets. AirDrums is free play. Recording captures canvas, optionally generated audio, never the DOM webcam layer.
