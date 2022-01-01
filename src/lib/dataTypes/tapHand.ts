import { t } from '../xml';

/**
 * The tap-hand type represents the symbol to use for a tap element. The left and right values refer to the SMuFL
 * guitarLeftHandTapping and guitarRightHandTapping glyphs respectively.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/tap-hand/}
 */
export const tapHand = () => t.choices('left' as const, 'right' as const);
