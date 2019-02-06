import { rgbToRgba, hexToRgba, hslToRgba, colorToRgb } from '../src/colors';

describe('test color functions', () => {
  test('rgbToRgba(\'rgb(255,255,255)\') should return rgba(255,255,255,1)', () => {
    expect(rgbToRgba('rgb(255,255,255)')).toBe('rgba(255,255,255,1)');
  });
  test('hexToRgba(\'#ffffff\') should return rgba(255,255,255,1)', () => {
    expect(hexToRgba('#ffffff')).toBe('rgba(255,255,255,1)');
  });
  test('hslToRgba(\'hsl(0, 100%, 50%)\') should return rgba(255,0,0,1)', () => {
    expect(hslToRgba('hsl(0, 100%, 50%)')).toBe('rgba(255,0,0,1)');
  });
  test('colorToRgb() should return rgba(255,255,255,1)', () => {
    expect(colorToRgb('rgb(255,255,255)')).toBe('rgba(255,255,255,1)');
    expect(colorToRgb('#ffffff')).toBe('rgba(255,255,255,1)');
    expect(colorToRgb('hsl(0, 100%, 100%)')).toBe('rgba(255,255,255,1)');
  });
});
