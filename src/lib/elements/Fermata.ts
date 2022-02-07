import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<fermata>` element
 *
 * Parent elements: `<barline>`, `<notations>`
 *
 * The `<fermata>` element content represents the shape of the fermata sign. An empty `<fermata>` element represents a
 * normal fermata.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/fermata/}
 */
export type Fermata = ReturnType<typeof Fermata>;

export const Fermata = xml.element(
  'fermata',
  {
    attributes: {
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
       * The type describes whether a fermata is upright or inverted. It is upright if not specified.
       */
      type: t.optional(dataTypes.uprightInverted()),
    },
    content: [t.required(dataTypes.fermataShape())] as const,
  },
  {}
);
