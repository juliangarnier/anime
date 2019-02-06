import { minMax, stringContains, applyArguments, is } from '../src/lib/utils';

describe('test utils "is" functions', () => {
  test('should return true (is.arr)', () => {
    expect(is.arr([])).toBe(true);
  });
  test('should return true (is.obj)', () => {
    expect(is.obj({})).toBe(true);
  });
  test('should return true (is.pth)', () => {
    expect(
      is.pth({
        totalLength: 5
      })
    ).toBe(true);
  });
  test('should return false (is.pth)', () => {
    expect(is.pth({})).toBe(false);
  });
  test('should return true (is.svg)', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    expect(is.svg(svg)).toBe(true);
  });
  test('should return true (is.inp)', () => {
    const input = document.createElement('input');
    expect(is.inp(input)).toBe(true);
  });
  test('should return false (is.inp)', () => {
    const div = document.createElement('div');
    expect(is.inp(div)).toBe(false);
  });
  test('should return 1 (is.dom)', () => {
    const div = document.createElement('div');
    expect(is.dom(div)).toBe(1);
  });
  test('should return true (is.str)', () => {
    expect(is.str('hello')).toBe(true);
  });
  test('should return false (is.str)', () => {
    expect(is.str(123)).toBe(false);
  });
  test('should return true (is.fnc)', () => {
    expect(is.fnc(() => {})).toBe(true);
  });
  test('should return false (is.fnc)', () => {
    expect(is.fnc({})).toBe(false);
  });
  test('should return true (is.und)', () => {
    expect(is.und(undefined)).toBe(true);
    expect(is.und()).toBe(true);
  });
  test('should return false (is.und)', () => {
    expect(is.und('')).toBe(false);
  });
  test('should return true (is.hex)', () => {
    expect(is.hex('#FFFFFF')).toBe(true);
  });
  test('should return false (is.hex)', () => {
    expect(is.hex('#R5')).toBe(false);
  });
  test('should return true (is.rgb)', () => {
    expect(is.rgb('rgb(255,255,255)')).toBe(true);
  });
  test('should return true (is.hsl)', () => {
    expect(is.hsl('hsl(0, 100%, 50%)')).toBe(true);
  });
  test('should return true (is.col)', () => {
    const hsl = 'hsl(0, 100%, 50%)';
    const rgb = 'rgb(255,255,255)';
    const hex = '#FFFFFF';

    expect(is.col(hsl)).toBe(true);
    expect(is.col(rgb)).toBe(true);
    expect(is.col(hex)).toBe(true);
  });
  test('should return false (is.key)', () => {
    expect(is.key('changeComplete')).toBe(false);
    expect(is.key('keyframes')).toBe(false);
    expect(is.key('targets')).toBe(false);
  });
  test('should return true (is.key)', () => {
    expect(is.key('rotateZ')).toBe(true);
  });
});

describe('test stringContains()', () => {
  test("stringContains('Hello World', 'ell') should return true", () => {
    expect(stringContains('Hello World', 'ell')).toBe(true);
  });
  test("stringContains('ell', 'Hello World') should return false", () => {
    expect(stringContains('ell', 'Hello World')).toBe(false);
  });
});

describe('test applyArguments()', () => {
  test("applyArguments(args => args, ['test']) should return test", () => {
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
