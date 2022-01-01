import { t, xml } from '../xml';
import { Millimeters } from './Millimeters';
import { Tenths } from './Tenths';

/**
 * The `<scaling>` element
 *
 * Parent element: `<defaults>`
 *
 * Margins, page sizes, and distances are all measured in tenths to keep MusicXML data in a consistent coordinate system
 * as much as possible. The translation to absolute units is done with the `<scaling>` element, which specifies how many
 * millimeters are equal to how many tenths. For a staff height of 7 mm, `<millimeters>` would be set to 7 while
 * `<tenths>` is set to 40. The ability to set a formula rather than a single scaling factor helps avoid roundoff errors.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/scaling/}
 */
export type Scaling = ReturnType<typeof Scaling>;

export const Scaling = xml.element(
  'scaling',
  { attributes: {}, content: [t.required(Millimeters), t.required(Tenths)] as const },
  {}
);
