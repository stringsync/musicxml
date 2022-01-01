import { t } from '../xml';

/**
 * The start-stop-continue type is used for an attribute of musical elements that can either start or stop, but also
 * need to refer to an intermediate point in the symbol, as for complex slurs or for formatting of symbols across system
 * breaks.
 *
 * The values of start, stop, and continue refer to how an element appears in musical score order, not in MusicXML
 * document order. An element with a stop attribute may precede the corresponding element with a start attribute within
 * a MusicXML document. This is particularly common in multi-staff music. For example, the stopping point for a slur may
 * appear in staff 1 before the starting point for the slur appears in staff 2 later in the document.
 *
 * When multiple elements with the same tag are used within the same note, their order within the MusicXML document
 * should match the musical score order. For example, a note that marks both the end of one slur and the start of a new
 * slur should have the incoming slur element with a type of stop precede the outgoing slur element with a type of
 * start.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/start-stop-continue/}
 */
export const startStopContinue = () => t.choices(...(['start', 'stop', 'continue'] as const));
