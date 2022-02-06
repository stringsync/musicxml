import { t } from '../xml';

/**
 * The beater-value type represents pictograms for beaters, mallets, and sticks that do not have different materials
 * represented in the pictogram.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/beater-value/}
 */
export const beaterValue = () => {
  return t.label({
    label: 'beater-value',
    value: t.choices(
      ...([
        'bow',
        'chime hammer',
        'coin',
        'drum stick',
        'finger',
        'fingernail',
        'fist',
        'guiro scraper',
        'hammer',
        'hand',
        'jazz stick',
        'knitting needle',
        'metal hammer',
        'slide brush on gong',
        'snare stick',
        'spoon mallet',
        'superball',
        'triangle beater',
        'triangle beater plain',
        'wire brush',
      ] as const)
    ),
  });
};
