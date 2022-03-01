import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';
import { Artificial } from './Artificial';
import { BasePitch } from './BasePitch';
import { Natural } from './Natural';
import { SoundingPitch } from './SoundingPitch';
import { TouchingPitch } from './TouchingPitch';

/**
 * The `<harmonic>` element
 *
 * Parent element: `<technical>`
 *
 * The `<harmonic>` element indicates natural and artificial harmonics. Allowing the type of pitch to be specified,
 * combined with controls for appearance/playback differences, allows both the notation and the sound to be represented.
 * Artificial harmonics can add a notated touching pitch; artificial pinch harmonics will usually not notate a touching
 * pitch. The attributes for the `<harmonic>` element refer to the use of the circular harmonic symbol, typically but
 * not always used with natural harmonics.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/harmonic/}
 */
export const Harmonic = schema(
  'harmonic',
  {
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
     * Indicates whether something is above or below another element, such as a note or a notation.
     */
    placement: t.optional(dataTypes.aboveBelow()),

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
  },
  [
    t.label({ label: 'types', value: t.zeroOrMore(t.choices(Natural, Artificial)) }),
    t.label({ label: 'pitches', value: t.zeroOrMore(t.choices(BasePitch, TouchingPitch, SoundingPitch)) }),
  ] as const
);