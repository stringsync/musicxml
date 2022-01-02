import { t, xml } from '../xml';
import { Distance } from './Distance';
import { Glyph } from './Glyph';
import { LineWidth } from './LineWidth';
import { NoteSize } from './NoteSize';
import { OtherAppearance } from './OtherAppearance';

/**
 * The `<appearance>` element
 *
 * Parent element: `<defaults>`
 *
 * The `<appearance>` element controls general graphical settings for the music's final form appearance on a printed
 * page of display. This includes support for line widths, definitions for note sizes, standard distances between
 * notation elements, and Standard Music Font Layout (SMuFL) glyphs, plus an extension element for other aspects of
 * appearance.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/appearance/}
 */
export type Appearance = ReturnType<typeof Appearance>;

export const Appearance = xml.element(
  'appearance',
  {
    attributes: {},
    content: [
      t.zeroOrMore(LineWidth),
      t.zeroOrMore(NoteSize),
      t.zeroOrMore(Distance),
      t.zeroOrMore(Glyph),
      t.zeroOrMore(OtherAppearance),
    ] as const,
  },
  {}
);
