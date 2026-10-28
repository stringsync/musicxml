import { schema, t } from '../schema';
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
export const Appearance = schema('appearance', {}, [
  t.label({ label: 'line-widths', value: t.zeroOrMore(LineWidth) }),
  t.label({ label: 'note-sizes', value: t.zeroOrMore(NoteSize) }),
  t.label({ label: 'distances', value: t.zeroOrMore(Distance) }),
  t.label({ label: 'glyphs', value: t.zeroOrMore(Glyph) }),
  t.label({ label: 'other-appearances', value: t.zeroOrMore(OtherAppearance) }),
] as const);
