import { t } from '../xml';

/**
 * The mode type is used to specify major/minor and other mode distinctions. Valid mode values include major, minor,
 * dorian, phrygian, lydian, mixolydian, aeolian, ionian, locrian, and none.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/mode/}
 */
export const mode = () => {
  return t.label({
    label: 'mode',
    value: t.choices(
      ...([
        'none',
        'major',
        'minor',
        'dorian',
        'phrygian',
        'lydian',
        'mixolydian',
        'aeolian',
        'ionian',
        'locrian',
        t.string(),
      ] as const)
    ),
  });
};
