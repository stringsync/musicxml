import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<other-notation>` element
 *
 * Parent element: `<notations>`
 *
 * The `<other-notation>` element is used to define any notations not yet in the MusicXML format. It handles notations
 * where more specific extension elements such as `<other-dynamics>` and `<other-technical>` are not appropriate.
 *
 * The smufl attribute can be used to specify a particular notation, allowing application interoperability without
 * requiring every Standard Music Font Layout (SMuFL) glyph to have a MusicXML element equivalent. Using the
 * `<other-notation>` element without the smufl attribute allows for extended representation, though without application
 * interoperability.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/other-notation/}
 */
export const OtherNotation = schema(
  'other-notation',
  {
    /**
     * Indicates if this is a single-note notation, or the start or stop of a multi-note notation.
     */
    type: t.required(dataTypes.startStopSingle()),

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
     * Specifies an ID that is unique to the entire document.
     */
    id: t.optional(dataTypes.id()),

    /**
     * Used to distinguish between two simultaneous chords arpeggiated separately (different numbers) or together
     * (same number).
     */
    number: t.optional(dataTypes.numberLevel()),

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
  },
  [t.required(dataTypes.string())] as const
);
