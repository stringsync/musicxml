import { t } from '../schema';
/**
 * A kind-value indicates the type of chord. Degree elements can then add, subtract, or alter from these starting
 * points. The 11th and 13th values are usually used as a basis for alteration.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/kind-value/}
 */
export const kindValue = () => {
  return t.label({
    label: 'kind-value',
    value: t.choices(
      ...([
        'none',
        'augmented',
        'augmented-seventh',
        'diminished',
        'diminished-seventh',
        'dominant',
        'dominant-11th',
        'dominant-13th',
        'dominant-ninth',
        'French',
        'German',
        'half-diminished',
        'Italian',
        'major',
        'major-11th',
        'major-13th',
        'major-minor',
        'major-ninth',
        'major-seventh',
        'major-sixth',
        'minor',
        'minor-11th',
        'minor-13th',
        'minor-ninth',
        'minor-seventh',
        'minor-sixth',
        'Neapolitan',
        'other',
        'pedal',
        'power',
        'suspended-fourth',
        'suspended-second',
        'Tristan',
      ] as const)
    ),
  });
};
