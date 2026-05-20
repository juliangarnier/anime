import {
  svg,
  createTimeline,
  stagger,
  utils,
} from '../../dist/modules/index.js';

function generateLines(numberOfLines) {
  const svgWidth = 1100;
  const svgHeight = 1100;
  const margin = 50; // Margin from the edges of the SVG
  const spacing = (svgWidth - margin * 2) / (numberOfLines - 1);

  let svgContent = `<svg width="${svgWidth}px" height="${svgHeight}px" viewBox="0 0 ${svgWidth} ${svgHeight}">
      <g id="lines" fill="none" fill-rule="evenodd">`;
  for (let i = 0; i < numberOfLines; i++) {
    const x = margin + i * spacing;
    svgContent += `<line x1="${x}" y1="${margin}" x2="${x}" y2="${svgHeight - margin}" class="line-v" stroke="#A4FF4F"></line>`;
  }

  svgContent += `</g></svg>`;

  return svgContent;
}

function generateCircles(numberOfCircles) {
  const svgWidth = 1100;
  const svgHeight = 1100;
  const centerX = svgWidth / 2;
  const centerY = svgHeight / 2;
  const maxRadius = 500;
  const step = maxRadius / numberOfCircles;

  let svgContent = `<svg width="${svgWidth}px" height="${svgHeight}px" viewBox="0 0 ${svgWidth} ${svgHeight}">
      <g id="circles" fill="none" fill-rule="evenodd">`;

  for (let i = 0; i < numberOfCircles; i++) {
    const radius = (i + 1) * step;
    svgContent += `<circle class="circle" stroke="#A4FF4F" stroke-linecap="round" stroke-linejoin="round" stroke-width="10" cx="${centerX}" cy="${centerY}" r="${radius}"></circle>`;
  }

  svgContent += `</g></svg>`;

  return svgContent;
}

const svgLines = generateLines(100);
const svgCircles = generateCircles(50);

document.body.innerHTML += svgLines;
document.body.innerHTML += svgCircles;

createTimeline({
  // playbackEase: 'out(4)',
  loop: 0,
  defaults: {
    ease: 'inOut(4)',
    duration: 10000,
    loop: true,
  }
})
.add(svg.createDrawable('.line-v'), {
  // strokeWidth: [0, 20, 20, 20, 0],
  draw: [
    '.5 .5',
    () => { const l = utils.random(.05, .45, 2); return `${.5 - l} ${.5 + l}` },
    '0.5 0.5',
  ],
  stroke: '#FF4B4B',
}, stagger([0, 8000], { start: 0, from: 'first' }))
.add(svg.createDrawable('.circle'), {
  draw: [
    () => { const v = utils.random(-1, -.5, 2); return `${v} ${v}`},
    () => `${utils.random(0, .25, 2)} ${utils.random(.5, .75, 2)}`,
    () => { const v = utils.random(1, 1.5, 2); return `${v} ${v}`},
  ],
  stroke: '#FF4B4B',
}, stagger([0, 8000], { start: 0 }))
.init()
