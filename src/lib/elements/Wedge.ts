import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<wedge>` element
 *
 * Parent element: `<direction-type>`
 *
 * The `<wedge>` element represents crescendo and diminuendo wedge symbols. The line-type attribute is solid if not
 * specified.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/wedge/}
 */
export type Wedge = ReturnType<typeof Wedge>;

export const Wedge = xml.element(
  'wedge',
  {
    attributes: {
      /**
       * The value is crescendo for the start of a wedge that is closed at the left side, diminuendo for the start of a
       * wedge that is closed on the right side, and stop for the end of a wedge.
       */
      type: t.required(dataTypes.wedgeType()),

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
       * Specifies an ID that is unique to the entire document.
       */
      id: t.optional(dataTypes.id()),

      /**
       * Specifies if the line is solid, dashed, dotted, or wavy.
       */
      ['line-type']: t.optional(dataTypes.lineType()),

      /**
       * A value is yes indicates that a circle appears at the point of the wedge, indicating a crescendo from nothing
       * or diminuendo to nothing. It is no if not specified, and used only when the type is crescendo, or the type is
       * stop for a wedge that began with a diminuendo type.
       */
      niente: t.optional(dataTypes.yesNo()),

      /**
       * Distinguishes multiple wedges when they overlap in MusicXML document order.
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

      /**
       * Indicates the gap between the top and bottom of the wedge as measured in tenths. Ignored if specified at the
       * start of a crescendo wedge or the end of a diminuendo wedge.
       */
      spread: t.optional(dataTypes.tenths()),
    },
    content: [] as const,
  },
  {}
);
