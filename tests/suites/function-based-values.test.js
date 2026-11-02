import {
  expect,
  getChildAtIndex,
  getTweenDelay,
} from '../utils.js';

import { animate, stagger, utils } from '../../dist/modules/index.js';

import {
  valueTypes,
  minValue,
} from '../../dist/modules/core/consts.js';

suite('Function based values', () => {

  test('Basic function based values', () => {
    /** @type {NodeListOf<HTMLElement>} */
    const $targets = document.querySelectorAll('.target-class');
    const animation = animate($targets, {
      autoplay: false,
      translateX: (el, i, targets) => {
        return el.getAttribute('data-index');
      },
      duration: (el, i, targets) => {
        const index = parseFloat(el.dataset.index);
        return targets.length + ((i + index) * 100);
      },
      delay: (el, i, targets) => {
        const index = parseFloat(el.dataset.index);
        return targets.length + ((i + index) * 100);
      },
      ease: () => {
        return (/** @type {Number} */t) => t;
      },
    });

    // Property value

    expect(getChildAtIndex(animation, 0)._fromNumber).to.equal(0);
    expect(getChildAtIndex(animation, 1)._fromNumber).to.equal(0);
    expect(getChildAtIndex(animation, 2)._fromNumber).to.equal(0);
    expect(getChildAtIndex(animation, 3)._fromNumber).to.equal(0);

    expect(getChildAtIndex(animation, 0)._valueType).to.equal(valueTypes.UNIT);
    expect(getChildAtIndex(animation, 1)._valueType).to.equal(valueTypes.UNIT);
    expect(getChildAtIndex(animation, 2)._valueType).to.equal(valueTypes.UNIT);
    expect(getChildAtIndex(animation, 3)._valueType).to.equal(valueTypes.UNIT);

    expect(getChildAtIndex(animation, 0)._toNumber).to.equal(0);
    expect(getChildAtIndex(animation, 1)._toNumber).to.equal(1);
    expect(getChildAtIndex(animation, 2)._toNumber).to.equal(2);
    expect(getChildAtIndex(animation, 3)._toNumber).to.equal(3);

    expect(getChildAtIndex(animation, 0)._unit).to.equal('px');
    expect(getChildAtIndex(animation, 1)._unit).to.equal('px');
    expect(getChildAtIndex(animation, 2)._unit).to.equal('px');
    expect(getChildAtIndex(animation, 3)._unit).to.equal('px');

    expect($targets[0].style.transform).to.equal('translateX(0px)');
    expect($targets[1].style.transform).to.equal('translateX(0px)');
    expect($targets[2].style.transform).to.equal('translateX(0px)');
    expect($targets[3].style.transform).to.equal('translateX(0px)');

    animation.seek(animation.duration);

    expect($targets[0].style.transform).to.equal('translateX(0px)');
    expect($targets[1].style.transform).to.equal('translateX(1px)');
    expect($targets[2].style.transform).to.equal('translateX(2px)');
    expect($targets[3].style.transform).to.equal('translateX(3px)');

    // Duration
    expect(getChildAtIndex(animation, 0)._changeDuration).to.equal(4);
    expect(getChildAtIndex(animation, 1)._changeDuration).to.equal(204);
    expect(getChildAtIndex(animation, 2)._changeDuration).to.equal(404);
    expect(getChildAtIndex(animation, 3)._changeDuration).to.equal(604);

    // Delay
    expect(getTweenDelay(getChildAtIndex(animation, 0))).to.equal(0);
    expect(getTweenDelay(getChildAtIndex(animation, 1))).to.equal(200);
    expect(getTweenDelay(getChildAtIndex(animation, 2))).to.equal(400);
    expect(getTweenDelay(getChildAtIndex(animation, 3))).to.equal(600);
  });

  test('Function based keyframes values', () => {
    const $targets = document.querySelectorAll('.target-class');
    const animation = animate($targets, {
      autoplay: false,
      translateX: [
        { to: el => el.getAttribute('data-index') * 100, duration: stagger(100), delay: stagger(100), ease: () => t => t },
        { to: el => el.getAttribute('data-index') * 50, duration: stagger(100), delay: stagger(100), ease: () => t => t }
      ],
    });

    // Values
    expect(getChildAtIndex(animation, 0 * 2)._toNumber).to.equal(0);
    expect(getChildAtIndex(animation, 1 * 2)._toNumber).to.equal(100);
    expect(getChildAtIndex(animation, 2 * 2)._toNumber).to.equal(200);
    expect(getChildAtIndex(animation, 3 * 2)._toNumber).to.equal(300);

    expect(getChildAtIndex(animation, (0 * 2) + 1)._toNumber).to.equal(0);
    expect(getChildAtIndex(animation, (1 * 2) + 1)._toNumber).to.equal(50);
    expect(getChildAtIndex(animation, (2 * 2) + 1)._toNumber).to.equal(100);
    expect(getChildAtIndex(animation, (3 * 2) + 1)._toNumber).to.equal(150);

    // Duration
    expect(getChildAtIndex(animation, 0 * 2)._changeDuration).to.equal(minValue);
    expect(getChildAtIndex(animation, 1 * 2)._changeDuration).to.equal(100);
    expect(getChildAtIndex(animation, 2 * 2)._changeDuration).to.equal(200);
    expect(getChildAtIndex(animation, 3 * 2)._changeDuration).to.equal(300);

    expect(getChildAtIndex(animation, (0 * 2) + 1)._changeDuration).to.equal(minValue);
    expect(getChildAtIndex(animation, (1 * 2) + 1)._changeDuration).to.equal(100);
    expect(getChildAtIndex(animation, (2 * 2) + 1)._changeDuration).to.equal(200);
    expect(getChildAtIndex(animation, (3 * 2) + 1)._changeDuration).to.equal(300);

    // Delay
    expect(getTweenDelay(getChildAtIndex(animation, 0 * 2))).to.equal(0);
    expect(getTweenDelay(getChildAtIndex(animation, 1 * 2))).to.equal(100);
    expect(getTweenDelay(getChildAtIndex(animation, 2 * 2))).to.equal(200);
    expect(getTweenDelay(getChildAtIndex(animation, 3 * 2))).to.equal(300);

    expect(getTweenDelay(getChildAtIndex(animation, (0 * 2) + 1))).to.equal(0);
    expect(getTweenDelay(getChildAtIndex(animation, (1 * 2) + 1))).to.equal(100);
    expect(getTweenDelay(getChildAtIndex(animation, (2 * 2) + 1))).to.equal(200);
    expect(getTweenDelay(getChildAtIndex(animation, (3 * 2) + 1))).to.equal(300);
  });

  test('Function based string values -> number conversion', () => {
    const $targets = document.querySelectorAll('.target-class');
    const animation = animate($targets, {
      autoplay: false,
      translateX: 10,
      delay: $el => $el.dataset.index,
    });

    // Delay
    expect(getTweenDelay(getChildAtIndex(animation, 0))).to.equal(0);
    expect(getTweenDelay(getChildAtIndex(animation, 1))).to.equal(1);
    expect(getTweenDelay(getChildAtIndex(animation, 2))).to.equal(2);
    expect(getTweenDelay(getChildAtIndex(animation, 3))).to.equal(3);
  });

  test('Function based values returns from to Array values', () => {
    const $targets = document.querySelectorAll('.target-class');
    const animation = animate($targets, {
      autoplay: false,
      translateX: ($el, i, targets) => [$el.dataset.index, (targets.length - 1) - i],
    });

    // From
    expect(getChildAtIndex(animation, 0)._fromNumber).to.equal(0);
    expect(getChildAtIndex(animation, 1)._fromNumber).to.equal(1);
    expect(getChildAtIndex(animation, 2)._fromNumber).to.equal(2);
    expect(getChildAtIndex(animation, 3)._fromNumber).to.equal(3);

    // To
    expect(getChildAtIndex(animation, 0)._toNumber).to.equal(3);
    expect(getChildAtIndex(animation, 1)._toNumber).to.equal(2);
    expect(getChildAtIndex(animation, 2)._toNumber).to.equal(1);
    expect(getChildAtIndex(animation, 3)._toNumber).to.equal(0);
  });

  test('Function based values in from to Array values', () => {
    const $targets = document.querySelectorAll('.target-class');
    const animation = animate($targets, {
      autoplay: false,
      translateX: [
        ($el, i, targets) => $el.dataset.index,
        ($el, i, targets) => (targets.length - 1) - i
      ],
    });

    // From
    expect(getChildAtIndex(animation, 0)._fromNumber).to.equal(0);
    expect(getChildAtIndex(animation, 1)._fromNumber).to.equal(1);
    expect(getChildAtIndex(animation, 2)._fromNumber).to.equal(2);
    expect(getChildAtIndex(animation, 3)._fromNumber).to.equal(3);

    // To
    expect(getChildAtIndex(animation, 0)._toNumber).to.equal(3);
    expect(getChildAtIndex(animation, 1)._toNumber).to.equal(2);
    expect(getChildAtIndex(animation, 2)._toNumber).to.equal(1);
    expect(getChildAtIndex(animation, 3)._toNumber).to.equal(0);
  });

  test('Keeps per target ease, delay, duration and values when properties share their parameters', () => {
    const eases = [p => p * p, p => 1 - (1 - p) ** 3, p => p];
    const targets = [0, 1, 2].map(() => ({ x: 0, y: 0 }));
    const animation = animate(targets, {
      x: (target, i) => (i + 1) * 100,
      y: 100,
      ease: (target, i) => ['inQuad', 'outCubic', 'linear'][i],
      delay: (target, i) => i * 10,
      duration: (target, i) => 100 + i * 25,
      autoplay: false,
    });
    for (const time of [25, 60, 110, 60]) {
      animation.seek(time);
      targets.forEach((target, i) => {
        const progress = eases[i](Math.min(1, Math.max(0, (time - i * 10) / (100 + i * 25))));
        expect(target.x).to.be.closeTo((i + 1) * 100 * progress, 1e-9);
        expect(target.y).to.be.closeTo(100 * progress, 1e-9);
      });
    }
    animation.cancel();
  });

  test('Keeps outer duration when a value function creates another animation', () => {
    const nested = [];
    const target = { x: 0 };
    const animation = animate(target, {
      x: () => {
        nested.push(animate({ y: 0 }, { y: { to: 100, duration: 10 }, autoplay: false }));
        return 200;
      },
      duration: 100, ease: 'linear', autoplay: false,
    });
    try {
      expect(animation.duration).to.equal(100);
      animation.seek(50);
      expect(target.x).to.equal(100);
    } finally {
      animation.cancel();
      for (const child of nested) child.cancel();
    }
  });

  test('Keeps later keyframes when a value function creates another animation', () => {
    const nested = [];
    const target = { x: 0 };
    const animation = animate(target, {
      x: [{ to: () => {
        nested.push(animate({ y: 0 }, { y: 100, duration: 10, autoplay: false }));
        return 100;
      }, duration: 50 }, { to: 200, duration: 50 }],
      duration: 100, ease: 'linear', autoplay: false,
    });
    try {
      expect(animation.duration).to.equal(100);
      animation.seek(75);
      expect(target.x).to.equal(150);
      animation.seek(100);
      expect(target.x).to.equal(200);
    } finally {
      animation.cancel();
      for (const child of nested) child.cancel();
    }
  });

  test('Keeps array endpoints when a value function creates another animation', () => {
    const nested = [];
    const target = { x: 0 };
    const animation = animate(target, {
      x: [() => {
        nested.push(animate({ y: 0 }, { y: [300, 400, 500], duration: 100, autoplay: false }));
        return 10;
      }, 110, 210],
      duration: 200, ease: 'linear', autoplay: false,
    });
    try {
      animation.seek(50);
      expect(target.x).to.equal(60);
      animation.seek(150);
      expect(target.x).to.equal(160);
    } finally {
      animation.cancel();
      for (const child of nested) child.cancel();
    }
  });

  test('Refreshes an endpoint after its value function creates another animation', () => {
    const nested = [];
    const target = { x: 0 };
    let endpoint = 100;
    const animation = animate(target, {
      x: () => {
        nested.push(animate({ y: 0 }, { y: 100, autoplay: false }));
        return endpoint;
      },
      duration: 100, ease: 'linear', autoplay: false,
    });
    try {
      animation.seek(100);
      expect(target.x).to.equal(100);
      endpoint = 200;
      animation.refresh().seek(100);
      expect(target.x).to.equal(200);
    } finally {
      animation.cancel();
      for (const child of nested) child.cancel();
    }
  });

  test('Refreshes an endpoint after later timing functions create another animation', () => {
    for (const option of ['duration', 'ease']) {
      const nested = [];
      const target = { x: 0 };
      let endpoint = 100;
      const animation = animate(target, {
        x: {
          to: () => endpoint,
          [option]: () => {
            nested.push(animate({ y: 0 }, { y: 100, autoplay: false }));
            return option === 'duration' ? 100 : t => t;
          },
        },
        duration: 100, ease: 'linear', autoplay: false,
      });
      try {
        animation.seek(100);
        expect(target.x).to.equal(100);
        endpoint = 200;
        animation.refresh().seek(100);
        expect(target.x).to.equal(200);
      } finally {
        animation.cancel();
        for (const child of nested) child.cancel();
      }
    }
  });

  test('Refreshes a pair start after its end function creates another animation', () => {
    const nested = [];
    const target = { x: 0 };
    let start = 0;
    const animation = animate(target, {
      x: [() => start, () => {
        nested.push(animate({ y: 0 }, { y: 100, autoplay: false }));
        return 110;
      }],
      duration: 100, ease: 'linear', autoplay: false,
    });
    try {
      animation.seek(50);
      expect(target.x).to.equal(55);
      start = 20;
      animation.refresh().seek(50);
      expect(target.x).to.equal(65);
    } finally {
      animation.cancel();
      for (const child of nested) child.cancel();
    }
  });

  test('Refreshes endpoints returned as option objects', () => {
    for (const createNested of [false, true]) {
      const nested = [];
      const target = { x: 0 };
      let endpoint = 100;
      const animation = animate(target, {
        x: () => {
          if (createNested) nested.push(animate({ y: 0 }, { y: 100, autoplay: false }));
          return { to: endpoint, duration: 100 };
        },
        ease: 'linear', autoplay: false,
      });
      try {
        animation.seek(100);
        expect(target.x).to.equal(100);
        endpoint = 200;
        animation.refresh().seek(100);
        expect(target.x).to.equal(200);
      } finally {
        animation.cancel();
        for (const child of nested) child.cancel();
      }
    }
  });

  test('Refreshes both endpoints returned as a pair', () => {
    for (const returnOptions of [false, true]) {
      const nested = [];
      const target = { x: 0 };
      let start = 0;
      let end = 100;
      const animation = animate(target, {
        x: () => {
          nested.push(animate({ y: 0 }, { y: 100, autoplay: false }));
          return returnOptions ? { to: [start, end], duration: 100 } : [start, end];
        },
        duration: 100, ease: 'linear', autoplay: false,
      });
      try {
        animation.seek(50);
        expect(target.x).to.equal(50);
        start = 20;
        end = 200;
        animation.refresh().seek(50);
        expect(target.x).to.equal(110);
        animation.seek(0);
        expect(target.x).to.equal(20);
        animation.seek(100);
        expect(target.x).to.equal(200);
      } finally {
        animation.cancel();
        for (const child of nested) child.cancel();
      }
    }
  });

  test('Refreshes a CSS variable after a duration function creates another animation', () => {
    const nested = [];
    const target = document.createElement('div');
    target.style.left = '0px';
    target.style.setProperty('--function-refresh-endpoint', '100px');
    document.body.appendChild(target);
    const animation = animate(target, {
      left: 'var(--function-refresh-endpoint)',
      duration: () => {
        nested.push(animate({ y: 0 }, { y: 100, autoplay: false }));
        return 100;
      },
      ease: 'linear', autoplay: false,
    });
    try {
      animation.seek(100);
      expect(target.style.left).to.equal('100px');
      target.style.setProperty('--function-refresh-endpoint', '200px');
      animation.refresh().seek(100);
      expect(target.style.left).to.equal('200px');
    } finally {
      animation.cancel();
      for (const child of nested) child.cancel();
      target.remove();
    }
  });

  test('Keeps array endpoints when an index getter creates another animation', () => {
    const nested = [];
    const target = { x: 0 };
    const values = [10, 110, 210];
    Object.defineProperty(values, 1, { get() {
      nested.push(animate({ y: 0 }, { y: [300, 400], duration: 100, autoplay: false }));
      return 110;
    } });
    const animation = animate(target, {
      x: values, duration: 200, ease: 'linear', autoplay: false,
    });
    try {
      animation.seek(50);
      expect(target.x).to.equal(60);
      animation.seek(150);
      expect(target.x).to.equal(160);
    } finally {
      animation.cancel();
      for (const child of nested) child.cancel();
    }
  });

  // test('Function based values refresh', () => {
  //   const $targets = document.querySelectorAll('.target-class');
  //   const animation = animate($targets, {
  //     autoplay: false,
  //     translateX: [
  //       ($el, i, targets) => $el.dataset.index,
  //       ($el, i, targets) => utils.ran
  //     ],
  //   });

  //   console.log(animation._head._func());
  //   console.log(animation._head._next._func());
  //   console.log(animation._head._next._next._func());

  //   // From
  //   expect(getChildAtIndex(animation, 0)._fromNumber).to.equal(0);
  //   expect(getChildAtIndex(animation, 1)._fromNumber).to.equal(1);
  //   expect(getChildAtIndex(animation, 2)._fromNumber).to.equal(2);
  //   expect(getChildAtIndex(animation, 3)._fromNumber).to.equal(3);

  //   // To
  //   expect(getChildAtIndex(animation, 0)._toNumber).to.equal(3);
  //   expect(getChildAtIndex(animation, 1)._toNumber).to.equal(2);
  //   expect(getChildAtIndex(animation, 2)._toNumber).to.equal(1);
  //   expect(getChildAtIndex(animation, 3)._toNumber).to.equal(0);
  // });

});

const create = (animations, target, params) => {
  const animation = animate(target, {
    duration: 100, ease: 'linear', autoplay: false, ...params,
  });
  animations.push(animation);
  return animation;
};

const cleanup = animations => {
  for (const animation of animations) animation.cancel();
};

suite('Decomposition values', () => {
  test('Keeps the start value across a nested endpoint callback', () => {
    const animations = [];
    const target = { x: 0 };
    try {
      const animation = create(animations, target, { x: { to: [10, () => {
        create(animations, { y: 0 }, { y: [300, 400] });
        return 110;
      }] } });
      animation.seek(50);
      expect(target.x).to.equal(60);
    } finally {
      cleanup(animations);
    }
  });

  test('Keeps both endpoints across the original getter', () => {
    const animations = [];
    let value = 0;
    const target = {
      get x() {
        create(animations, { y: 0 }, { y: [300, 400] });
        return value;
      },
      set x(next) { value = next; },
    };
    try {
      create(animations, target, { x: { to: [10, 110] } }).seek(50);
      expect(value).to.equal(60);
    } finally {
      cleanup(animations);
    }
  });

  test('Keeps numeric type across a nested coercion', () => {
    const animations = [];
    const target = { x: 0 };
    const from = { valueOf() {
      create(animations, { y: 0 }, { y: ['300px', '400px'] });
      return 10;
    } };
    try {
      create(animations, target, { x: { to: [from, 110] } }).seek(50);
      expect(target.x).to.equal(60);
    } finally {
      cleanup(animations);
    }
  });

  test('Keeps the end value across an implicit start getter', () => {
    const animations = [];
    let value = 10;
    const target = {
      get x() {
        create(animations, { y: 0 }, { y: [300, 400] });
        return value;
      },
      set x(next) { value = next; },
    };
    try {
      create(animations, target, { x: 110 }).seek(50);
      expect(value).to.equal(60);
    } finally {
      cleanup(animations);
    }
  });

  test('Keeps relative operands across the repeated original getter', () => {
    const animations = [];
    let value = 20;
    let reads = 0;
    const target = {
      get x() {
        if (++reads === 2) create(animations, { y: 0 }, { y: [300, 400] });
        return value;
      },
      set x(next) { value = next; },
    };
    try {
      create(animations, target, { x: { from: '+=10', to: '+=110' } }).seek(50);
      expect(reads).to.equal(2);
      expect(value).to.equal(85);
    } finally {
      cleanup(animations);
    }
  });

  test('Keeps complex components across a nested endpoint callback', () => {
    const animations = [];
    const target = { x: '0 0' };
    try {
      create(animations, target, { x: { to: ['10 20', () => {
        create(animations, { y: '0 0' }, { y: ['300 400', '500 600'] });
        return '110 120';
      }] } }).seek(50);
      expect(target.x).to.equal('60 70');
    } finally {
      cleanup(animations);
    }
  });

  test('Preserves endpoint getter and coercion order', () => {
    const animations = [];
    const trace = [];
    let value = 0;
    const target = {
      get x() { trace.push('original'); return value; },
      set x(next) { value = next; },
    };
    const from = { valueOf() { trace.push('from coercion'); return 10; } };
    const pair = [];
    Object.defineProperty(pair, 0, { get() { trace.push('from index'); return from; } });
    Object.defineProperty(pair, 1, { get() {
      trace.push('to index');
      return () => { trace.push('to callback'); return 110; };
    } });
    try {
      create(animations, target, { x: { to: pair } });
      expect(trace).to.deep.equal(['from index', 'from coercion', 'to index', 'to callback', 'original']);
    } finally {
      cleanup(animations);
    }
  });

  test('Restores the original object after its numeric coercion reenters', () => {
    const animations = [];
    const original = { valueOf() {
      create(animations, { y: 0 }, { y: [300, 400] });
      return 0;
    } };
    const target = { x: original };
    try {
      const animation = create(animations, target, { x: { to: [10, 110] } });
      animation.seek(50).revert(false);
      expect(target.x).to.equal(original);
    } finally {
      cleanup(animations);
    }
  });

  test('Keeps complex endpoints stable across forward and backward seeks', () => {
    const animations = [];
    const target = { x: '0 0' };
    try {
      const animation = create(animations, target, { x: [
        { to: ['10 20', '110 120'], duration: 100 },
        { to: '210 220', duration: 100 },
      ] });
      for (const [time, expected] of /** @type {[Number, String][]} */([[50, '60 70'], [150, '160 170'], [50, '60 70']])) {
        animation.seek(time);
        expect(target.x).to.equal(expected);
      }
      animation.revert(false);
      expect(target.x).to.equal('0 0');
    } finally {
      cleanup(animations);
    }
  });

  test('Detaches rendered strings from a caller supplied split result', () => {
    const animations = [];
    const strings = ['', ' ', ''];
    const end = new String('110 120');
    let splits = 0;
    end.split = () => { splits++; return strings; };
    const target = { x: '0 0' };
    try {
      const animation = create(animations, target, { x: { to: ['10 20', end] } });
      expect(target.x).to.equal('10 20');
      expect(splits).to.equal(1);
      strings[1] = ',';
      animation.seek(50);
      expect(target.x).to.equal('60 70');
      animation.revert(false);
      expect(target.x).to.equal('0 0');
    } finally {
      cleanup(animations);
    }
  });
});
