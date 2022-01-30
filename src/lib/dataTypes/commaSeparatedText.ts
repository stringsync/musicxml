import { t } from '../xml';

/**
 * The comma-separated-text type is used to specify a comma-separated list of text elements, as is used by the
 * font-family attribute.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/comma-separated-text/}
 */
export const commaSeparatedText = () => t.regex({ pattern: /[^,]+(, ?[^,]+)*/, zero: '' });
