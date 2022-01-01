import { t } from '../xml';

/**
 * The swing-type-value type specifies the note type, either eighth or 16th, to which the ratio defined in the `<swing>`
 * element is applied.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/swing-type-value/}
 */
export const swingTypeValue = () => t.choices('eighth' as const, '16th' as const);
