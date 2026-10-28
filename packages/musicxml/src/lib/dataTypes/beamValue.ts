import { t } from '../schema';
/**
 * The beam-value type represents the type of beam associated with each of 8 beam levels (up to 1024th notes) available
 * for each note.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/beam-value/}
 */
export const beamValue = () => {
  return t.label({
    label: 'beam-value',
    value: t.choices(...(['backward hook', 'begin', 'continue', 'end', 'forward hook'] as const)),
  });
};
