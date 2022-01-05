import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<harmon-closed>` element
 *
 * Parent element: `<harmon-mute>`
 *
 * The `<harmon-closed>` element represents whether the harmon mute is closed, open, or half-open.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/harmon-closed/}
 */
export type HarmonClosed = ReturnType<typeof HarmonClosed>;

export const HarmonClosed = xml.element(
  'harmon-closed',
  {
    attributes: {
      /**
       * Indicates which portion of the symbol is filled in when the element value is half.
       */
      location: t.optional(dataTypes.harmonClosedLocation()),
    },
    content: [t.required(dataTypes.harmonClosedValue())] as const,
  },
  {}
);
