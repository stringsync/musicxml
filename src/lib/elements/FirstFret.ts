import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<first-fret>` element
 *
 * Parent element: `<frame>`
 *
 * The `<first-fret>` element indicates which fret is shown in the top space of the frame; it is fret 1 if the element
 * is not present.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/first-fret/}
 */
export const FirstFret = schema(
  'first-fret',
  {
    /**
     * Indicates whether the text appears to the left or right of the frame.
     */
    location: t.optional(dataTypes.leftRight()),

    /**
     * Indicates how the first fret is represented in the fret diagram.
     */
    text: t.optional(dataTypes.token()),
  },
  [t.label({ label: 'fret', value: t.required(dataTypes.positiveInteger()) })] as const
);
