import { t } from '../xml';

/**
 * See the
 * [definition in the W3C XML Schema standard.](https://www.w3.org/TR/xmlschema-2/#positiveInteger)
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/xsd-positiveInteger/}
 */
export const positiveInteger = () => t.int({ min: 1 });
