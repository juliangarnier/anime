import {
    expect,
    getChildAtIndex,
} from '../utils.js';

import {
    animate,
    utils,
} from '../../dist/modules/index.js';

import {
    valueTypes,
} from '../../dist/modules/core/consts.js';

suite('Color Names', () => {
    test('Animate from rgba to color name (red)', () => {
        const [targetEl] = utils.$('#target-id');
        const animation = animate(targetEl, { color: ['rgba(255, 255, 255, 0)', 'red'], autoplay: false });
        const tween = getChildAtIndex(animation, 0);

        expect(tween._valueType).to.equal(valueTypes.COLOR);
        expect(tween._toNumbers).to.deep.equal([255, 0, 0, 1]);

        animation.seek(animation.duration);
        expect(targetEl.style.color).to.equal('rgb(255, 0, 0)');
    });

    test('Animate from color name (blue) to hex', () => {
        const [targetEl] = utils.$('#target-id');
        const animation = animate(targetEl, { color: ['blue', '#ff0000'], ease: 'linear', autoplay: false });
        const tween = getChildAtIndex(animation, 0);

        expect(tween._valueType).to.equal(valueTypes.COLOR);
        expect(tween._fromNumbers).to.deep.equal([0, 0, 255, 1]);
        expect(tween._toNumbers).to.deep.equal([255, 0, 0, 1]);

        animation.seek(animation.duration / 2);
        // [127.5, 0, 127.5, 1] approx
        expect(targetEl.style.color).to.equal('rgb(128, 0, 128)');
    });

    test('Handle "transparent" color name', () => {
        const [targetEl] = utils.$('#target-id');
        const animation = animate(targetEl, { color: ['white', 'transparent'], autoplay: false });
        const tween = getChildAtIndex(animation, 0);

        expect(tween._valueType).to.equal(valueTypes.COLOR);
        expect(tween._toNumbers).to.deep.equal([0, 0, 0, 0]);

        animation.seek(animation.duration);
        expect(targetEl.style.color).to.equal('rgba(0, 0, 0, 0)');
    });
});
