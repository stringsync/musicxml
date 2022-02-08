import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<tremolo>` element
 *
 * Parent element: `<ornaments>`
 *
 * The `<tremolo>` element can be used to indicate single-note, double-note, or unmeasured tremolos. The text of the
 * element indicates the number of tremolo marks and is an integer from 0 to 8. Note that the number of attached beams
 * is not included in this value, but is represented separately using the `<beam element>`. The value should be 0 for
 * unmeasured tremolos.
 *
 * When using double-note tremolos, the duration of each note in the tremolo should correspond to half of the notated
 * type value. A `<time-modification>` element should also be added with an `<actual-notes>` value of 2 and a
 * `<normal-notes>` value of 1. If used within a tuplet, this 2/1 ratio should be multiplied by the existing tuplet
 * ratio.
 *
 * The smufl attribute specifies the glyph to use from the Standard Music Font Layout (SMuFL) Tremolos range for an
 * unmeasured tremolo. It is ignored for other tremolo types. The SMuFL buzzRoll glyph is used if the attribute is
 * missing.
 *
 * Using repeater beams for indicating tremolos is deprecated as of Version 3.0.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/tremolo/}
 */
export const Tremolo = schema(
  'tremolo',
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
     * Indicates a particular Standard Music Font Layout (SMuFL) character using its canonical glyph name. Sometimes
     * this is a formatting choice, and sometimes this is a refinement of the semantic meaning of an element.
     */
    smufl: t.optional(dataTypes.smuflGlyphName()),

    /**
     * Single-note tremolos use single, double-note tremolos use start or stop, and unmeasured tremolos use
     * unmeasured. The default value is single for compatibility with Version 1.1.
     */
    type: t.optional(dataTypes.tremoloType()),
  },
  [t.required(dataTypes.tremoloMarks())] as const
);
