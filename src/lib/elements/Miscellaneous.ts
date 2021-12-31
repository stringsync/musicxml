import { t, xml } from '../xml';
import { MiscellaneousField } from './MiscellaneousField';

/**
 * Parent element: `<identification>`
 *
 * If a program has other metadata not yet supported in the MusicXML format, it can go in the `<miscellaneous>` element.
 * The `<miscellaneous>` element puts each separate part of metadata into its own `<miscellaneous-field>` element.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/miscellaneous/}
 */
export type Miscellaneous = ReturnType<typeof Miscellaneous>;

export const Miscellaneous = xml.element(
  'miscellaneous',
  { attributes: {}, content: [t.zeroOrMore(MiscellaneousField)] },
  {}
);
