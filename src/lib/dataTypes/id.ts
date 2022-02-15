import { t } from '../schema';
/**
 * See the [definition in the W3C XML Schema standard.](https://www.w3.org/TR/xmlschema-2/#ID)
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/xsd-ID/}
 */
export const id = () => t.regex({ pattern: /[A-Za-z_][A-Za-z0-9.-_]*/, zero: '_' });
