import { t } from '../schema';
/**
 * The harmony-type type differentiates different types of harmonies when alternate harmonies are possible.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/harmony-type/}
 */
export const harmonyType = () => t.choices(...(['alternate', 'explicit', 'implied'] as const));
