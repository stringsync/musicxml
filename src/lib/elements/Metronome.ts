import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';
import { BeatUnit } from './BeatUnit';
import { BeatUnitDot } from './BeatUnitDot';
import { BeatUnitTied } from './BeatUnitTied';
import { MetronomeArrows } from './MetronomeArrows';
import { MetronomeNote } from './MetronomeNote';
import { MetronomeRelation } from './MetronomeRelation';
import { PerMinute } from './PerMinute';

/**
 * The `<metronome>` element
 *
 * Parent element: `<direction-type>`
 *
 * The `<metronome>` element represents metronome marks and other metric relationships. The `<beat-unit>` element group
 * and `<per-minute>` element specify regular metronome marks. The `<metronome-note>` and `<metronome-relation>`
 * elements allow for the specification of metric modulations and other metric relationships, such as swing tempo marks
 * where two eighths are equated to a quarter note / eighth note triplet. Tied notes can be represented in both types of
 * metronome marks by using the `<beat-unit-tied>` and `<metronome-tied>` elements. The print-object attribute is set to
 * no in cases where the `<metronome>` element represents a relationship or range that is not displayed in the music
 * notation.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/metronome/}
 */
export const Metronome = schema(
  'metronome',
  {
    /**
     * Indicates the color of an element.
     */
    color: t.optional(dataTypes.color()),

    /**
     * Changes the computation of the default horizontal position. The origin is changed relative to the bottom
     * left-hand corner of the specified page. Positive x is right and negative x is left.
     */
    ['default-x']: t.label({ label: 'default-x', value: t.optional(dataTypes.tenths()) }),

    /**
     * Changes the computation of the default vertical position. The origin is changed relative to the bottom
     * left-hand corner of the specified page. Positive y is up and negative y is down.
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
     * Indicates left, center, or right justification. The default value varies for different elements. For elements
     * where the justify attribute is present but the halign attribute is not, the justify attribute indicates
     * horizontal alignment as well as justification.
     */
    justify: t.optional(dataTypes.leftCenterRight()),

    /**
     * Indicates whether or not to put the metronome mark in parentheses. It is no if not specified.
     */
    parentheses: t.optional(dataTypes.yesNo()),

    /**
     * Specifies whether or not to print an object. It is yes if not specified.
     */
    ['print-object']: t.optional(dataTypes.yesNo()),

    /**
     * Changes the horizontal position relative to the default position, either as computed by the individual program,
     * or as overridden by the default-x attribute. Positive x is right and negative x is left.
     */
    ['relative-x']: t.label({ label: 'relative-x', value: t.optional(dataTypes.tenths()) }),

    /**
     * Changes the vertical position relative to the default position, either as computed by the individual program,
     * or as overridden by the default-y attribute. Positive y is up and negative y is down.
     */
    ['relative-y']: t.label({ label: 'relative-y', value: t.optional(dataTypes.tenths()) }),

    /**
     * Indicates vertical alignment to the top, middle, bottom, or baseline of the text. The default is
     * implementation-dependent.
     */
    valign: t.optional(dataTypes.valign()),
  },
  [
    t.label({
      label: 'metronome',
      value: t.choices(
        [
          t.required(BeatUnit),
          t.zeroOrMore(BeatUnitDot),
          t.zeroOrMore(BeatUnitTied),
          t.choices(PerMinute, [t.required(BeatUnit), t.zeroOrMore(BeatUnitDot), t.zeroOrMore(BeatUnitTied)]),
        ],
        [
          t.optional(MetronomeArrows),
          t.oneOrMore(MetronomeNote),
          t.optional([t.required(MetronomeRelation), t.oneOrMore(MetronomeNote)]),
        ]
      ),
    }),
  ] as const
);
