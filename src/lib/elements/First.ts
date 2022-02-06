import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<first>` element
 *
 * Parent element: `<swing>`
 *
 * The `<first>` element is the part of the swing ratio that refers to the first of two consecutive notes.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/first/}
 */
export type First = ReturnType<typeof First>;

export const First = xml.element(
  'first',
  {
    attributes: {},
    content: [t.label({ label: 'swing-ratio', value: t.required(dataTypes.positiveInteger()) })] as const,
  },
  {}
);
