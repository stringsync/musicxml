import { t, xml } from '../xml';

/**
 * The `<millimeters>` element
 *
 * Parent element: `<scaling>`
 *
 * The `<millimeters>` element contains the number of millimeters that correspond to the given number of tenths within
 * the `<scaling>` element formula.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/millimeters/}
 */
export type Millimeters = ReturnType<typeof Millimeters>;

export const Millimeters = xml.element(
  'millimeters',
  { attributes: {}, content: [t.required(t.float())] as const },
  {}
);
