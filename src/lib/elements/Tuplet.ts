import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';
import { TupletActual } from './TupletActual';
import { TupletNormal } from './TupletNormal';

/**
 * The `<tuplet>` element
 *
 * Parent element: `<notations>`
 *
 * A `<tuplet>` element is present when a tuplet is to be displayed graphically, in addition to the sound data provided
 * by the `<time-modification>` elements.
 *
 * Whereas a `<time-modification>` element shows how the cumulative, sounding effect of tuplets and double-note tremolos
 * compare to the written note type, the `<tuplet>` element describes how this is displayed. The `<tuplet>` element also
 * provides more detailed representation information than the `<time-modification>` element, and is needed to represent
 * nested tuplets and other complex tuplets accurately.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/tuplet/}
 */
export type Tuplet = ReturnType<typeof Tuplet>;

export const Tuplet = xml.element(
  'tuplet',
  {
    attributes: {
      /**
       * Indicates if this is the start or stop of the tuplet.
       */
      type: t.optional(dataTypes.startStop()),

      /**
       * Indicates the presence of a bracket. If unspecified, the result is implementation-dependent.
       */
      bracket: t.optional(dataTypes.yesNo()),

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
       * Used to specify whether the bracket is straight or in the older curved or slurred style. It is straight if not
       * specified.
       */
      ['line-shape']: t.optional(dataTypes.lineShape()),

      /**
       * Distinguishes nested tuplets.
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
       * Used to display either the number of actual notes, the number of both actual and normal notes, or neither. It
       * is actual if not specified.
       */
      ['show-number']: t.optional(dataTypes.showTuplet()),

      /**
       * Used to display either the actual type, both the actual and normal types, or neither. It is none if not
       * specified.
       */
      ['show-type']: t.optional(dataTypes.showTuplet()),
    },
    content: [t.optional(TupletActual), t.optional(TupletNormal)] as const,
  },
  {}
);
