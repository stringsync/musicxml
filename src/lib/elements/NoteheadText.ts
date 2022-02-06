import { t, xml } from '../xml';
import { AccidentalText } from './AccidentalText';
import { DisplayText } from './DisplayText';

/**
 * The `<notehead-text>` element
 *
 * Parent element: `<note>`
 *
 * The `<notehead-text>` element represents text that is displayed inside a notehead, as is done in some educational
 * music. It is not needed for the numbers used in tablature or jianpu notation. The presence of a TAB or jianpu clefs\
 * is sufficient to indicate that numbers are used. The `<display-text>` and `<accidental-text>` elements allow display
 * of fully formatted text and accidentals.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/notehead-text/}
 */
export type NoteheadText = ReturnType<typeof NoteheadText>;

export const NoteheadText = xml.element(
  'notehead-text',
  {
    attributes: {},
    content: [t.label({ label: 'texts', value: t.oneOrMore([DisplayText, AccidentalText]) })] as const,
  },
  {}
);
