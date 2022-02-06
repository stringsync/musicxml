import { t } from '../xml';

/**
 * The percent type specifies a percentage from 0 to 100.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/percent/}
 */
export const percent = () => t.label({ label: 'percent', value: t.float({ min: 0, max: 100 }) });
