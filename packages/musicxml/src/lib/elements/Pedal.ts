import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<pedal>` element
 *
 * Parent element: `<direction-type>`
 *
 * The `<pedal>` element represents piano pedal marks, including damper and sostenuto pedal marks. The soft pedal is not
 * included here because there is no special symbol or graphic used for it beyond what can be specified with `<words>`
 * and `<bracket>` elements.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/pedal/}
 */
export const Pedal = schema(
  'pedal',
  {
    /**
     * Distinguishes different types of pedal directions.
     */
    type: t.required(dataTypes.pedalType()),

    /**
     * Used only when the sign attribute is yes and the type is start or sostenuto; otherwise it is ignored. If yes,
     * the short P and S signs are used. If no, the full Ped and Sost signs are used. It is no if not specified.
     */
    abbreviated: t.optional(dataTypes.yesNo()),

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
     * Specifies an ID that is unique to the entire document.
     */
    id: t.optional(dataTypes.id()),

    /**
     * If yes, then pedal lines are used.
     */
    line: t.optional(dataTypes.yesNo()),

    /**
     * Distinguishes multiple pedals when they overlap in MusicXML document order.
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
     * If yes, then Ped, Sost, and * signs are used. For compatibility with older versions, it is yes if not specified
     * if the line attribute is no, and is no if not specified if the line attribute is yes. If no, the alignment
     * attributes are ignored.
     */
    sign: t.optional(dataTypes.yesNo()),
  },
  [] as const
);
