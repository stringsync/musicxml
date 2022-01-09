import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<instruments>` element
 *
 * Parent element: `<attributes>`
 *
 * The `<instruments>` element is only used if more than one instrument is represented in the part (e.g., oboe I and II
 * where they play together most of the time). If absent, a value of 1 is assumed.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/instruments/}
 */
export type Instruments = ReturnType<typeof Instruments>;

export const Instruments = xml.element(
  'instruments',
  { attributes: {}, content: [t.required(dataTypes.nonNegativeInteger())] as const },
  {}
);
