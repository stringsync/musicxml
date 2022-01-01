import { t } from '../xml';

/**
 * The stick-type type represents the shape of pictograms where the material in the stick, mallet, or beater is
 * represented in the pictogram.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/stick-type/}
 */
export const stickType = () => {
  return t.choices(
    ...([
      'bass drum',
      'double bass drum',
      'glockenspiel',
      'gum',
      'hammer',
      'superball',
      'timpani',
      'wound',
      'xylophone',
      'yarn',
    ] as const)
  );
};
