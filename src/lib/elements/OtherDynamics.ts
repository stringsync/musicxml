import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<other-dynamics>` element
 *
 * Parent element: `<dynamics>`
 *
 * The `<other-dynamics>` element allows other dynamic marks that are not covered by combinations of the individual
 * `<dynamics>` child elements.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/other-dynamics/}
 */
export type OtherDynamics = ReturnType<typeof OtherDynamics>;

export const OtherDynamics = xml.element(
  'other-dynamics',
  {
    attributes: {
      /**
       * Indicates a particular Standard Music Font Layout (SMuFL) character using its canonical glyph name. Sometimes
       * this is a formatting choice, and sometimes this is a refinement of the semantic meaning of an element.
       */
      smufl: t.optional(dataTypes.smuflGlyphName()),
    },
    content: [t.required(dataTypes.string())] as const,
  },
  {}
);
