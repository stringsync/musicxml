import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<degree-value>` element
 *
 * Parent element: `<degree>`
 *
 * The content of the `<degree-value>` element is a number indicating the degree of the chord (1 for the root, 3 for
 * third, etc).
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/degree-value/}
 */
export const DegreeValue = schema(
  'degree-value',
  {
    /**
     * Indicates the color of an element.
     */
    color: t.optional(dataTypes.color()),

    /**
     * 	Changes the computation of the default horizontal position. The origin is changed relative to the left-hand
     * side of the note or the musical position within the bar. Positive x is right and negative x is left.
     *
     * This attribute provides higher-resolution positioning data than the `<offset>` element. Applications reading a
     * MusicXML file that can understand both features should generally rely on this attribute for its greater
     * accuracy.
     */
    ['default-x']: t.label({ label: 'default-x', value: t.optional(dataTypes.tenths()) }),

    /**
     * Changes the computation of the default vertical position. The origin is changed relative to the top line of the
     * staff. Positive y is up and negative y is down.
     *
     * This attribute provides higher-resolution positioning data than the placement attribute. Applications reading a
     * MusicXML file that can understand both attributes should generally rely on this attribute for its greater
     * accuracy.
     */
    ['default-y']: t.label({ label: 'default-y', value: t.optional(dataTypes.tenths()) }),

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

    /**
     * Changes the horizontal position relative to the default position, either as computed by the individual
     * program, or as overridden by the default-x attribute. Positive x is right and negative x is left. It should be
     * interpreted in the context of the <offset> element or directive attribute if those are present.
     */
    ['relative-x']: t.label({ label: 'relative-x', value: t.optional(dataTypes.tenths()) }),

    /**
     * Changes the horizontal position relative to the default position, either as computed by the individual
     * program, or as overridden by the default-x attribute. Positive x is right and negative x is left. It should be
     * interpreted in the context of the <offset> element or directive attribute if those are present.
     */
    ['relative-y']: t.label({ label: 'relative-y', value: t.optional(dataTypes.tenths()) }),

    /**
     * Indicates that a symbol should be used in specifying the degree.
     */
    symbol: t.optional(dataTypes.degreeSymbolValue()),

    /**
     * Specifies how the value of the degree should be displayed. If the symbol attribute is present, the value of the
     * text attribute follows the symbol.
     */
    text: t.optional(dataTypes.token()),
  },
  [t.label({ label: 'value', value: t.required(dataTypes.positiveInteger()) })] as const
);
