import { t } from '../schema';
/**
 * The text-direction type is used to adjust and override the Unicode bidirectional text algorithm, similar to the
 * Directionality data category in the
 * [W3C Internationalization Tag Set recommendation.](https://www.w3.org/TR/2007/REC-its-20070403/#directionality)
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/text-direction/}
 */
export const textDirection = () => t.choices(...(['ltr', 'rtl', 'lro', 'rlo'] as const));
