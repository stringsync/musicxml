import { t } from '../schema';
/**
 * The wedge-type type is used to specify `<wedge>` types.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/wedge-type/}
 */
export const wedgeType = () => t.choices(...(['crescendo', 'diminuendo', 'stop', 'continue'] as const));
