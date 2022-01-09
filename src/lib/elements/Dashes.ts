import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<dashes>` element
 *
 * Parent element: `<direction-type>`
 *
 * The `<dashes>` element represents dashes, used for instance with cresc. and dim. marks.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/dashes/}
 */
export type Dashes = ReturnType<typeof Dashes>;

export const Dashes = xml.element(
  'dashes',
  {
    attributes: {
      /**
       * Indicates if this is the start, stop, or continuation of the dashes.
       */
      type: t.required(dataTypes.startStopContinue()),

      /**
       * Indicates the color of an element.
       */
      color: t.optional(dataTypes.color()),

      /**
       * The length of dashes in a dashed line.
       */
      ['dash-length']: t.optional(dataTypes.tenths()),

      /**
       * Changes the computation of the default horizontal position. If the parent is a `<notehead-text>` element, the
       * origin is changed relative to the left-hand side of the note or the musical position within the bar. Otherwise,
       * the origin is changed relative to the start of the first measure on the system, and these values are used when
       * the current measure or a succeeding measure starts a new system. Positive x is right and negative x is left.
       */
      ['default-x']: t.optional(dataTypes.tenths()),

      /**
       * Changes the computation of the default vertical position. The origin is changed relative to the top line of the
       * staff. Positive y is up and negative y is down.
       */
      ['default-y']: t.optional(dataTypes.tenths()),

      /**
       * Specifies an ID that is unique to the entire document.
       */
      id: t.optional(dataTypes.id()),

      /**
       * Distinguishes multiple dashes when they overlap in MusicXML document order.
       */
      number: t.optional(dataTypes.numberLevel()),

      /**
       * Changes the horizontal position relative to the default position, either as computed by the individual program,
       * or as overridden by the default-x attribute. Positive x is right and negative x is left.
       */
      ['relative-x']: t.optional(dataTypes.tenths()),

      /**
       * Changes the vertical position relative to the default position, either as computed by the individual program,
       * or as overridden by the default-y attribute. Positive y is up and negative y is down.
       */
      ['relative-y']: t.optional(dataTypes.tenths()),

      /**
       * The length of spaces in a dashed line.
       */
      ['space-length']: t.optional(dataTypes.tenths()),
    },
    content: [] as const,
  },
  {}
);
