import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<alter>` element
 *
 * Parent element: `<pitch>
 *
 * The `<alter> element represents chromatic alteration in number of semitones (e.g., -1 for flat, 1 for sharp). Decimal
 * values like 0.5 (quarter tone sharp) are used for microtones.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/alter/}
 */
export type Alter = ReturnType<typeof Alter>;

export const Alter = xml.element(
  'alter',
  { attributes: {}, content: [t.required(dataTypes.semitones())] as const },
  {}
);
