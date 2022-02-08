import { t } from '../schema';
/**
 * The note-type-value type is used for the MusicXML type element and represents the graphic note type, from 1024th
 * (shortest) to maxima (longest).
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/note-type-value/}
 */
export const noteTypeValue = () => {
  return t.label({
    label: 'note-type-value',
    value: t.choices(
      ...([
        'whole',
        '1024th',
        '512th',
        '256th',
        '128th',
        '64th',
        '32nd',
        '16th',
        'eigth',
        'half',
        'quarter',
        'whole',
        'breve',
        'long',
        'maxima',
      ] as const)
    ),
  });
};
