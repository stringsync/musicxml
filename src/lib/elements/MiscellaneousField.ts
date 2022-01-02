import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<miscellaneous-field>` element
 *
 * Parent element: `<miscellaneous>`
 *
 * If a program has other metadata not yet supported in the MusicXML format, each type of metadata can go in a'
 * `<miscellaneous-field>` element.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/miscellaneous-field/}
 */
export type MiscellaneousField = ReturnType<typeof MiscellaneousField>;

export const MiscellaneousField = xml.element(
  'miscellaneous-field',
  {
    attributes: {
      /**
       * Indicates the type of metadata the element content represents.
       */
      name: t.required(dataTypes.token()),
    },
    content: [t.required(dataTypes.string())] as const,
  },
  {}
);
