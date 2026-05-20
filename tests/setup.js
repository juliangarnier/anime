import '../node_modules/mocha/mocha.js';

export const testObject = {};
export const anOtherTestObject = {};

const rootEl = document.querySelector(':root');
const testsEl = document.querySelector('#tests');

mocha.setup({
  ui: 'tdd',
  slow: 100,
  timeout: 2000,
  globals: ['___browserSync___'],
  rootHooks: {
    beforeEach(done) {
      testObject.plainValue = 10;
      testObject.valueWithUnit = '10px';
      testObject.multiplePLainValues = '16 32 64 128';
      testObject.multipleValuesWithUnits = '16px 32em 64% 128ch';
      anOtherTestObject.plainValue = 20;
      rootEl.removeAttribute('style');
      testsEl.innerHTML = `
      <div id="path-tests" class="test">
        <div id="square"></div>
        <svg id="svg-element" preserveAspectRatio="xMidYMid slice" viewBox="0 0 600 400">
          <filter id="displacementFilter">
            <feTurbulence type="turbulence" numOctaves="2" baseFrequency="0" result="turbulence"/>
            <feDisplacementMap in2="turbulence" in="SourceGraphic" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
          <g fill="none" fill-rule="evenodd" stroke-width="2">
            <line id="line1" x1="51.5" x2="149.5" y1="51.5" y2="149.5" stroke="#F96F82" />
            <line id="line2" x1="149.5" x2="51.5" y1="51.5" y2="149.5" stroke="#F96F82" />
            <circle id="circle" cx="300" cy="100" r="50" stroke="#FED28B"/>
            <polygon id="polygon" stroke="#D1FA9E" points="500 130.381 464.772 149 471.5 109.563 443 81.634 482.386 75.881 500 40 517.614 75.881 557 81.634 528.5 109.563 535.228 149" style="filter: url(#displacementFilter)"/>
            <polyline id="polyline" stroke="#7BE6D6" points="63.053 345 43 283.815 95.5 246 148 283.815 127.947 345 63.5 345"/>
            <path id="path" stroke="#4E7EFC" d="M250 300c0-27.614 22.386-50 50-50s50 22.386 50 50v50h-50c-27.614 0-50-22.386-50-50z"/>
            <path id="path-without-d-attribute-1" stroke="#4E7EFC"/>
            <path id="path-without-d-attribute-2" stroke="#F96F82"/>
            <rect id="rect" width="100" height="100" x="451" y="251" stroke="#C987FE" rx="25"/>
          </g>
        </svg>
      </div>
      <div id="css-tests" class="test test small-test">
        <div id="target-id" class="target-class" data-index="0"></div>
        <!-- '.target-class' number of elements should be exactly 4 in order to test targets length dependent animations -->
        <div class="target-class with-width-attribute" width="200" data-index="1"></div>
        <div class="target-class with-inline-styles" data-index="2" style="width: 200px;"></div>
        <div class="target-class" data-index="3"></div>
        <div class="with-inline-transforms" style="transform: translateX(10px)translateY(-.5rem)scale(.75)"></div>
        <div class="css-properties"></div>
      </div>
      <div id="dom-attributes-tests" class="test test small-test">
        <img class="with-width-attribute" src="./assets/icon.png" width=96 height=96 />
        <input type="number" id="input-number" name="Input number test" min="0" max="100" value="0">
      </div>
      <div id="stagger-tests" class="test small-test">
        <div id="stagger">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div id="stagger-grid-tests" class="test small-test">
        <div id="grid">
          <div></div><div></div><div></div><div></div><div></div>
          <div></div><div></div><div></div><div></div><div></div>
          <div></div><div></div><div></div><div></div><div></div>
        </div>
      </div>
      <div id="split-text-tests" class="test">
        <div id="split-text">
          <p>
            Split text by characters, words, and lines, do-not-split-hyphens, split <a href="#"><strong>nested elements like</strong></a> <code>&lt;strong&gt;</code> tags and <span class="nested">any <span class="nested">level <span class="nested">of <span class="nested">nested <span class="nested">tags</span></span></span></span></span> and respect line breaks.<br> Split words in languages without spaces like この日本語の文のように, and properly handles ѕρє¢ιαℓ ¢нαяα¢тєяѕ & 🇪Ⓜ️🅾️🇯ℹ️s
          </p>
        </div>
      </div>
      <div id="scramble-text-tests" class="test small-test">
        <div id="scramble-text">Hello World</div>
      </div>
      `;
      done();
    }
  },
});
