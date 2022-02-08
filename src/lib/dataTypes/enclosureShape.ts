import { t } from '../schema';
export const enclosureShape = () => {
  return t.choices(
    ...([
      'rectangle',
      'square',
      'oval',
      'circle',
      'bracket',
      'inverted-bracket',
      'triangle',
      'diamond',
      'pentagon',
      'hexagon',
      'heptagon',
      'octagon',
      'nonagon',
      'decagon',
    ] as const)
  );
};
