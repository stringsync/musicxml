import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<second>` element
 *
 * Parent element: `<swing>`
 *
 * The `<second>` element is the part of the swing ratio that refers to the second of two consecutive notes.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/second/}
 */
export type Second = ReturnType<typeof Second>;

export const Second = xml.element(
  'second',
  { attributes: {}, content: [t.required(dataTypes.positiveInteger())] as const },
  {}
);
