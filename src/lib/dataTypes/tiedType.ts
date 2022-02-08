import { t } from '../schema';
/**
 * The tied-type type is used as an attribute of the tied element to specify where the visual representation of a tie
 * begins and ends. A `<tied>` element which joins two notes of the same pitch can be specified with tied-type start on
 * the first note and tied-type stop on the second note. To indicate a note should be undamped, use a single `<tied>`
 *  element with tied-type let-ring. For other ties that are visually attached to a single note, such as a tie leading
 * into or out of a repeated section or coda, use two `<tied>` elements on the same note, one start and one stop.
 *
 * In start-stop cases, ties can add more elements using a continue type. This is typically used to specify the
 * formatting of cross-system ties.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/tied-type/}
 */
export const tiedType = () => t.choices(...(['start', 'stop', 'continue', 'let-ring'] as const));
