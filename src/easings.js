// Easings

export function parseEasingParameters(string) {
  const match = /\(([^)]+)\)/.exec(string);
  return match ? match[1].split(',').map(p => parseFloat(p)) : [];
}