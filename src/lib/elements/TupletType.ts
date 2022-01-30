import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<tuplet-type>` element
 *
 * Parent elements: `<tuplet-actual>`, `<tuplet-normal>`
 *
 * The `<tuplet-type>` element indicates the graphical note type of the notes for this portion of the tuplet.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/tuplet-type/}
 */
export type TupletType = ReturnType<typeof TupletType>;

export const TupletType = xml.element(
  'tuplet-type',
  {
    attributes: {
      /**
       * Indicates the color of an element.
       */
      color: t.optional(dataTypes.color()),

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
    },
    content: [] as const,
  },
  {}
);
