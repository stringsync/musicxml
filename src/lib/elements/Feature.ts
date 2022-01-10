import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<feature>` element
 *
 * Parent element: `<grouping>`
 *
 * The `<feature>` element is a part of the <grouping> element used for musical analysis. The type attribute represents
 * the type of the feature and the element content represents its value.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/feature/}
 */
export type Feature = ReturnType<typeof Feature>;

export const Feature = xml.element(
  'feature',
  {
    attributes: {
      /**
       * Represents the type of the feature. This type is flexible to allow for different analyses.
       */
      type: t.optional(dataTypes.token()),
    },
    content: [t.required(dataTypes.string())] as const,
  },
  {}
);
