import { t } from '../xml';

/**
 * The millimeters type is a number representing millimeters. This is used in the `<scaling>` element to provide a
 * default scaling from tenths to physical units.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/millimeters/}
 */
export const millimeters = () => t.float();
