import { t } from '../xml';

/**
 * The on-off type is used for notation elements such as string mutes.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/on-off/}
 */
export const onOff = () => t.choices('on' as const, 'off' as const);
