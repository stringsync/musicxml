import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<double>` element
 *
 * Parent elements: `<part-transpose>`, `<transpose>`
 *
 * If the `<double>` element is present, it indicates that the music is doubled one octave from what is currently
 * written.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/double/}
 */
export const Double = schema(
  'double',
  {
    /**
     * If the above attribute is set to yes, the doubling is one octave above what is written, as for mixed flute /
     * piccolo parts in band literature. Otherwise the doubling is one octave below what is written, as for mixed
     * cello / bass parts in orchestral literature.
     */
    above: t.optional(dataTypes.yesNo()),
  },
  [] as const
);
