import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';
import { BendAlter } from './BendAlter';
import { PreBend } from './PreBend';
import { Release } from './Release';
import { WithBar } from './WithBar';

/**
 * The `<bend>` element
 *
 * Parent element: `<technical>`
 *
 * The `<bend>` element is used in guitar notation and tablature. A single note with a bend and release will contain two
 * `<bend>` elements: the first to represent the bend and the second to represent the release.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/bend/}
 */
export const Bend = schema(
  'bend',
  {
    /**
     * Does the bend accelerate during playback? Default is "no".
     */
    accelerate: t.optional(dataTypes.yesNo()),

    /**
     * The number of discrete elements (like MIDI pitch bends) used to represent a continuous bend or slide. Default
     * is 4.
     */
    beats: t.optional(dataTypes.trillBeats()),

    /**
     * Indicates the color of an element.
     */
    color: t.optional(dataTypes.color()),

    /**
     * Changes the computation of the default horizontal position. If the parent is a `<notehead-text>` element, the
     * origin is changed relative to the left-hand side of the note or the musical position within the bar. Otherwise,
     * the origin is changed relative to the start of the first measure on the system, and these values are used when
     * the current measure or a succeeding measure starts a new system. Positive x is right and negative x is left.
     */
    ['default-x']: t.label({ label: 'default-x', value: t.optional(dataTypes.tenths()) }),

    /**
     * Changes the computation of the default vertical position. The origin is changed relative to the top line of the
     * staff. Positive y is up and negative y is down.
     */
    ['default-y']: t.label({ label: 'default-y', value: t.optional(dataTypes.tenths()) }),

    /**
     * The percentage of the duration for starting a bend. Default is 25.
     */
    ['first-beat']: t.optional(dataTypes.percent()),

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
     * The percentage of the duration for ending a bend. Default is 75.
     */
    ['last-beat']: t.optional(dataTypes.percent()),

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
     * Distinguishes between the angled bend symbols commonly used in standard notation and the curved bend symbols
     * commonly used in both tablature and standard notation.
     */
    shape: t.optional(dataTypes.bendShape()),
  },
  [
    t.required(BendAlter),
    t.label({ label: 'bends', value: t.zeroOrMore(t.choices(PreBend, Release)) }),
    t.optional(WithBar),
  ] as const
);
