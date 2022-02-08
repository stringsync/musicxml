import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<ending>` element
 *
 * Parent element: `<barline>`
 *
 * The `<ending>` element represents multiple (e.g. first and second) endings. The element text is used when the text
 * displayed in the ending is different than what appears in the number attribute.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/ending/}
 */
export const Ending = schema(
  'ending',
  {
    /**
     * Indicates which times the ending is played, similar to the time-only attribute used by other elements. While
     * this often represents the numeric values for what is under the ending line, it can also indicate whether an
     * ending is played during a larger dal segno or da capo repeat. Single endings such as "1" or comma-separated
     * multiple endings such as "1,2" may be used.
     */
    number: t.required(dataTypes.endingNumber()),

    /**
     * Typically, the start type is associated with the left barline of the first measure in an ending. The stop and
     * discontinue types are associated with the right barline of the last measure in an ending. Stop is used when the
     * ending mark concludes with a downward jog, as is typical for first endings. Discontinue is used when there is
     * no downward jog, as is typical for second endings that do not conclude a piece.
     */
    type: t.required(dataTypes.startStopDiscontinue()),

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
     * Specifies the length of the ending jog.
     */
    ['end-length']: t.optional(dataTypes.tenths()),

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
     * Specifies whether or not to print an object. It is yes if not specified.
     */
    ['print-object']: t.optional(dataTypes.yesNo()),

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
     * Distinguishes elements that are associated with a system rather than the particular part where the element
     * appears.
     */
    system: t.optional(dataTypes.systemRelation()),

    /**
     * An offset that specifies where the start of the ending text appears, relative to the start of the ending line.
     */
    ['text-x']: t.optional(dataTypes.tenths()),

    /**
     * An offset that specifies where the baseline of ending text appears, relative to the start of the ending line.
     */
    ['text-y']: t.optional(dataTypes.tenths()),
  },
  [t.required(dataTypes.string())] as const
);
