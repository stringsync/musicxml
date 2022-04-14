import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';
import { PedalTuning } from './PedalTuning';

/**
 * The `<harp-pedals>` element
 *
 * Parent element: `<direction-type>`
 *
 * The `<harp-pedals>` element represents harp pedal diagrams. The `<pedal-step>` and `<pedal-alter>` elements use the
 * same values as the `<step>` and `<alter>` elements. For easiest reading, the `<pedal-tuning>` elements should follow
 * standard harp pedal order, with `<pedal-step>` values of D, C, B, E, F, G, and A.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/harp-pedals/}
 */
export const HarpPedals = schema(
  'harp-pedals',
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
     * In cases where text extends over more than one line, horizontal alignment and justify values can be different.
     * The most typical case is for credits, such as:
     *
     * Words and music by
     *   Pat Songwriter
     *
     * Typically this type of credit is aligned to the right, so that the position information refers to the
     * right-most part of the text. But in this example, the text is center-justified, not right-justified.
     *
     * The halign attribute is used in these situations. If it is not present, its value is the same as for the
     * justify attribute. For elements where a justify attribute is not allowed, the default is
     * implementation-dependent.
     */
    halign: t.optional(dataTypes.leftCenterRight()),

    /**
     * Specifies an ID that is unique to the entire document.
     */
    id: t.optional(dataTypes.id()),

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
     * Indicates vertical alignment to the top, middle, bottom, or baseline of the text. The default is
     * implementation-dependent.
     */
    valign: t.optional(dataTypes.valign()),
  },
  [t.label({ label: 'pedal-tunings', value: t.oneOrMore(PedalTuning) })] as const
);
