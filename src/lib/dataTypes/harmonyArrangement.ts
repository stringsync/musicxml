import { t } from '../schema';
/**
 * The harmony-arrangement type indicates how stacked chords and bass notes are displayed within a harmony element. The
 * horizontal value specifies that the second element appears to the right of the first. The vertical value specifies
 * that the second element appears below the first. The diagonal value specifies that the second element appears both
 * below and to the right of the first.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/harmony-arrangement/}
 */
export const harmonyArrangement = () => t.choices(...(['horizontal', 'vertical', 'diagonal'] as const));
