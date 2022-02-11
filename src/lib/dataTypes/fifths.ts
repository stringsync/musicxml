import { t } from '../schema';
/**
 * The fifths type represents the number of flats or sharps in a traditional key signature. Negative numbers are used
 * for flats and positive numbers for sharps, reflecting the key's placement within the circle of fifths (hence the type
 * name).
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/fifths/}
 */
export const fifths = () => t.int();
