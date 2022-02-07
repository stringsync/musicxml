import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<slide>` element
 *
 * Parent element: `<notations>`
 *
 * The `<glissando>` and `<slide>` elements both indicate rapidly moving from one pitch to the other so that individual
 * notes are not discerned. A `<slide>` is continuous between the two pitches and defaults to a solid line. The optional
 * text is printed alongside the line.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/slide/}
 */
export type Slide = ReturnType<typeof Slide>;

export const Slide = xml.element(
  'slide',
  {
    attributes: {
      /**
       * Indicates if this is the start or stop of the slide.
       */
      type: t.required(dataTypes.startStop()),

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
       * The length of dashes in a dashed line. Ignored if the corresponding line-type attribute is not dashed.
       */
      ['dash-length']: t.optional(dataTypes.tenths()),

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
       * Specifies an ID that is unique to the entire document.
       */
      id: t.optional(dataTypes.id()),

      /**
       * The percentage of the duration for ending a bend. Default is 75.
       */
      ['last-beat']: t.optional(dataTypes.percent()),

      /**
       * Specifies if the line is solid, dashed, dotted, or wavy.
       */
      ['line-type']: t.optional(dataTypes.lineType()),

      /**
       * Distinguishes multiple slides when they overlap in MusicXML document order. The default value is 1.
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
       * The length of spaces in a dashed line. Ignored if the corresponding line-type attribute is not dashed.
       */
      ['space-length']: t.optional(dataTypes.tenths()),
    },
    content: [t.required(dataTypes.string())] as const,
  },
  {}
);
