import { createTimeline, waapi } from '../../../dist/modules/index.js';

const { animate } = waapi;

const red = animate('.red', { x: '15rem', autoplay: false });
const blue = animate('.blue', { x: '15rem', autoplay: false });

const tl = createTimeline({loop: 1})
.sync(red, 0)
.sync(blue, 500);