import { t } from '../xml';

/**
 * See the [definition in the W3C Extensible Markup Language recommendation.](https://www.w3.org/TR/xml/#sec-lang-tag)
 * Language names come from ISO 639, with optional country subcodes from ISO 3166.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/xml-lang/}
 */
export const lang = () => t.string();

/**
 * See the
 * [definition in the W3C Extensible Markup Language recommendation.](https://www.w3.org/TR/xml/#sec-white-space)
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/xml-space/}
 */
export const space = () => t.choices('default' as const, 'preserve' as const);
