import { t } from '../xml';

/**
 * The membrane-value type represents pictograms for membrane percussion instruments.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/membrane-value/}
 */
export const membraneValue = () => {
  return t.label({
    label: 'membrane-value',
    value: t.choices(
      ...([
        'bass drum',
        'bass drum on side',
        'bongos',
        'Chinese tomtom',
        'conga drum',
        'cuica',
        'goblet drum',
        'Indo-American tomtom',
        'Japanese tomtom',
        'military drum',
        'snare drum',
        'snare drum snares off',
        'tabla',
        'tambourine',
        'tenor drum',
        'timbales',
        'tomtom',
      ] as const)
    ),
  });
};
