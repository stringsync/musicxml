import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<octave-shift>` element
 *
 * Parent element: `<direction-type>`
 *
 * The `<octave-shift>` element indicates where notes are shifted up or down from their performed values because of
 * printing difficulty. Thus a treble clef line noted with 8va will be indicated with an `<octave-shift>` down from the
 * pitch data indicated in the notes.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/octave-shift/}
 */
export const OctaveShift = schema(
  'octave-shift',
  {
    /**
     * Indicates if this is the start, stop, or continuation of the octave shift. The start is specified as a shift up
     * or down from their performed values
     */
    type: t.required(dataTypes.upDownStopContinue()),

    /**
     * Indicates the color of an element.
     */
    color: t.optional(dataTypes.color()),

    /**
     * The length of dashes in a dashed line. Ignored if the corresponding line-type attribute is not dashed.
     */
    ['dash-length']: t.optional(dataTypes.tenths()),

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
     * Specifies an ID that is unique to the entire document.
     */
    id: t.optional(dataTypes.id()),

    /**
     * Distinguishes multiple octave shifts when they overlap in MusicXML document order.
     */
    number: t.optional(dataTypes.numberLevel()),

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
     * 8 indicates one octave; 15 indicates two octaves; 22 indicates 3 octaves. The default value is 8.
     */
    size: t.optional(dataTypes.positiveInteger()),

    /**
     * The length of spaces in a dashed line. Ignored if the corresponding line-type attribute is not dashed.
     */
    ['space-length']: t.optional(dataTypes.tenths()),
  },
  [] as const
);
