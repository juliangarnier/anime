import { createTimeline, svg } from '../../../dist/modules/index.js';

const duration = 800;

// Path: A -> B -> C
const tl2 = createTimeline({ loop: true, defaults: { duration, ease: 'inOutQuad' } });
tl2.add('#morph-2', { d: svg.morphTo('#shape-b') });
tl2.add('#morph-2', { d: svg.morphTo('#shape-c') });

// Path: A -> B -> C -> D
const tl3 = createTimeline({ loop: true, defaults: { duration, ease: 'inOutQuad' } });
tl3.add('#morph-3', { d: svg.morphTo('#shape-b') });
tl3.add('#morph-3', { d: svg.morphTo('#shape-c') });
tl3.add('#morph-3', { d: svg.morphTo('#shape-d') });

// Path: A -> B -> C -> A (loop back to original)
const tlLoop = createTimeline({ loop: true, defaults: { duration, ease: 'inOutQuad' } });
tlLoop.add('#morph-loop', { d: svg.morphTo('#shape-b') });
tlLoop.add('#morph-loop', { d: svg.morphTo('#shape-c') });
tlLoop.add('#morph-loop', { d: svg.morphTo('#shape-a') });

// Polygon: A -> B -> C
const tlPoly = createTimeline({ loop: true, defaults: { duration, ease: 'inOutQuad' } });
tlPoly.add('#morph-poly', { points: svg.morphTo('#poly-b') });
tlPoly.add('#morph-poly', { points: svg.morphTo('#poly-c') });
