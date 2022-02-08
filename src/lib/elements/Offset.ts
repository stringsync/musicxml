import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<offset>` element
 *
 * Parent elements: `<direction>`, `<harmony>`, `<listening>`, `<sound>`
 *
 * An `<offset>` is represented in terms of divisions, and indicates where the direction will appear relative to the
 * current musical location. The current musical location is always within the current measure, even at the end of a
 * measure. If an element within a `<direction>` includes a default-x attribute, the `<offset>` value will be ignored
 * when determining the appearance of that element.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/offset/}
 */
export const Offset = schema(
  'offset',
  {
    /**
     * The offset affects the visual appearance of the direction. If the sound attribute is yes, then the offset
     * affects playback and listening too. If it is no, then any `<sound>` or `<listening>` associated with the
     * `<direction>` takes effect at the current location. It is no if not specified for compatibility with earlier
     * MusicXML versions.
     */
    sound: t.optional(dataTypes.yesNo()),
  },
  [t.label({ label: 'offset', value: t.required(dataTypes.divisions()) })] as const
);
