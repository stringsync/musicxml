import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';
import { Beats } from './Beats';
import { BeatType } from './BeatType';
import { Interchangeable } from './Interchangeable';
import { SenzaMisura } from './SenzaMisura';

/**
 * The `<time>` element
 *
 * Parent element: `<attributes>`
 *
 * Time signatures are represented by the `<beats>` element for the numerator and the `<beat-type>` element for the
 * denominator. Multiple pairs of `<beat>` and `<beat-type>` elements are used for composite time signatures with
 * multiple denominators, such as 2/4 + 3/8. A composite such as 3+2/8 requires only one `<beat>`/`<beat-type>` pair.
 *
 * The print-object attribute allows a time signature to be specified but not printed, as is the case for excerpts from
 * the middle of a score. The value is "yes" if not present.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/time/}
 */
export const Time = schema(
  'time',
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
     * 	In cases where text extends over more than one line, horizontal alignment and justify values can be different.
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
     * Allows a time signature to apply to only the specified staff in the part. If absent, the time signature applies
     * to all staves in the part.
     */
    number: t.optional(dataTypes.staffNumber()),

    /**
     * Specifies whether or not to print an object. It is yes if not specified.
     */
    ['print-object']: t.optional(dataTypes.yesNo()),

    /**
     * Changes the horizontal position relative to the default position, either as computed by the individual program,
     * or as overridden by the default-x attribute. Positive x is right and negative x is left. It should be interpreted
     * in the context of the `<offset>` element or directive attribute if those are present.
     */
    ['relative-x']: t.optional(dataTypes.tenths()),

    /**
     * Changes the vertical position relative to the default position, either as computed by the individual program, or
     * as overridden by the default-y attribute. Positive y is up and negative y is down. It should be interpreted in
     * the context of the placement attribute if that is present.
     */
    ['relative-y']: t.optional(dataTypes.tenths()),

    /**
     * Indicates how to display the arrangement between the `<beats>` and `<beat-type>` values in a time signature.
     */
    separator: t.optional(dataTypes.timeSeparator()),

    /**
     * Indicates how to display a time signature, such as by using common and cut time symbols or a single number
     * display.
     */
    symbol: t.optional(dataTypes.timeSymbol()),

    /**
     * Indicates vertical alignment to the top, middle, bottom, or baseline of the text. The default is
     * implementation-dependent.
     */
    valign: t.optional(dataTypes.valign()),
  },
  [
    t.label({
      label: 'time-value',
      value: t.choices(
        t.label({
          label: 'time-signature',
          value: [t.oneOrMore([t.required(Beats), t.required(BeatType)]), t.optional(Interchangeable)] as const,
        }),
        SenzaMisura
      ),
    }),
  ] as const
);
