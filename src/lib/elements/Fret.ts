import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<fret>` element
 *
 * Parent elements: `<frame-note>`, `<technical>`
 *
 * The `<fret>` element is used with tablature notation and chord diagrams. Fret numbers start with 0 for an open string
 * and 1 for the first fret.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/fret/}
 */
export const Fret = schema(
  'fret',
  {
    /**
     * Indicates the color of an element.
     */
    color: t.optional(dataTypes.color()),

    /**
     * A comma-separated list of font names.
     */
    ['font-family']: t.optional(dataTypes.fontFamily()),

    /**
     * One of the CSS sizes or a numeric point size.
     */
    ['font-size']: t.optional(dataTypes.fontSize()),

    /**
     * Normal or italic style.
     */
    ['font-style']: t.optional(dataTypes.fontStyle()),

    /**
     * Normal or bold weight.
     */
    ['font-weight']: t.optional(dataTypes.fontWeight()),
  },
  [t.label({ label: 'fret-value', value: t.required(dataTypes.nonNegativeInteger()) })] as const
);
