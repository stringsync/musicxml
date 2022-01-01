import { t } from '../xml';

/**
 * The symbol-size type is used to distinguish between full, cue sized, grace cue sized, and oversized symbols.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/symbol-size/}
 */
export const symbolSize = () => t.choices(...(['cue', 'full', 'grace-cue', 'large'] as const));
