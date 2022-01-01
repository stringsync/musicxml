import { t } from '../xml';

/**
 * The pitched-value type represents pictograms for pitched percussion instruments. The chimes and tubular chimes values
 * distinguish the single-line and double-line versions of the pictogram.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/pitched-value/}
 */
export const pitchedValue = () => {
  return t.choices(
    ...([
      'celesta',
      'chimes',
      'glockenspiel',
      'lithophone',
      'mallet',
      'marimba',
      'steel drums',
      'tubaphone',
      'tubular chimes',
      'vibraphone',
      'xylophone',
    ] as const)
  );
};
