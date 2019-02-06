import { minMax, stringContains, applyArguments } from '../src/utils';

describe('test stringContains()', () => {
  test('stringContains(\'Hello World\', \'ell\') should return true', () => {
    expect(stringContains('Hello World', 'ell')).toBe(true);
  });
  test('stringContains(\'ell\', \'Hello World\') should return false', () => {
    expect(stringContains('ell', 'Hello World')).toBe(false);
  });
});

describe('test applyArguments()', () => {
  test('applyArguments(args => args, [\'test\']) should return test', () => {
    expect(applyArguments(args => args, ['test'])).toBe('test');
  });
});

describe('test minMax()', () => {
  test('minMax(1, 2, 3) should return 2', () => {
    expect(minMax(1, 2, 3)).toBe(2);
  });
  test('minMax(3, 2, 1) should return 1', () => {
    expect(minMax(3, 2, 1)).toBe(1);
  });
});
