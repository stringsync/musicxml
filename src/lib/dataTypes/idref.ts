import { t } from '../schema';
/**
 * See the
 * [definition in the W3C XML Schema standard.](https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/xsd-IDREF/)
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/xsd-IDREF/}
 */
export const idref = () => t.regex({ pattern: /[A-Za-z_][A-Za-z0-9.-_]*/, zero: '_' });
