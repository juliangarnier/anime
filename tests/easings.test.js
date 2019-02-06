import { parseEasingParameters } from '../src/easings';

describe('test parseEasingParameters()', () => {
  test('cubic-bezier should return [0.645, 0.045, 0.355, 1]', () => {
    expect(
      parseEasingParameters('cubic-bezier(0.645, 0.045, 0.355, 1)')
    ).toEqual([0.645, 0.045, 0.355, 1]);
  });
  test('steps should return [0, 0, 0.7]', () => {
    expect(parseEasingParameters('steps(0, 0, 0.7)')).toEqual([0, 0, 0.7]);
  });
  test('spring should return [1,2,3]', () => {
    expect(parseEasingParameters('spring(1,2,3)')).toEqual([1, 2, 3]);
  });
});
