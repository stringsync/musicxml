import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';
import { StickMaterial } from './StickMaterial';
import { StickType } from './StickType';

/**
 * The `<stick>` element
 *
 * Parent element: `<percussion>`
 *
 * The `<stick>` element represents pictograms where the material of the stick, mallet, or beater is included.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/stick/}
 */
export type Stick = ReturnType<typeof Stick>;

export const Stick = xml.element(
  'stick',
  {
    attributes: {
      /**
       * Indicates the presence of a dashed circle around the round beater part of a pictogram. The value is no if not
       * specified.
       */
      ['dashed-circle']: t.optional(dataTypes.yesNo()),

      /**
       * Indicates the presence of parentheses around the round beater part of a pictogram. The value is no if not
       * specified.
       */
      parentheses: t.optional(dataTypes.yesNo()),

      /**
       * Represents the direction in which the tip of a stick or beater points, using Unicode arrow terminology.
       */
      tip: t.optional(dataTypes.tipDirection()),
    },
    content: [t.required(StickType), t.required(StickMaterial)] as const,
  },
  {}
);
