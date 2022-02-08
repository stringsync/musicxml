import { t } from '../schema';
/**
 * The milliseconds type represents an integral number of milliseconds.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/milliseconds/}
 */
export const milliseconds = () => t.int({ min: 0 });
