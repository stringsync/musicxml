import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

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
export const MiscellaneousField = schema(
  'miscellaneous-field',
  {
    /**
     * Indicates the type of metadata the element content represents.
     */
    name: t.required(dataTypes.token()),
  },
  [t.required(dataTypes.string())] as const
);
