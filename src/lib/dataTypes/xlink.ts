import { t } from '../xml';

/**
 * See the
 * [definition in the XML Linking Language recommendation.](https://www.w3.org/TR/xlink11/#link-behaviors)
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/xlink-actuate/}
 */
export const actuate = () => t.choices(...(['none', 'onRequest', 'onLoad', 'other'] as const));

/**
 * See the
 * [definition in the XML Linking Language recommendation.](https://www.w3.org/TR/xlink11/#link-behaviors)

 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/xlink-show/}
 */
export const show = () => t.choices(...(['none', 'new', 'replace', 'embed', 'other'] as const));

/**
 * See the
 * [definition in the XML Linking Language recommendation.](https://www.w3.org/TR/xlink11/#link-types)
 * MusicXML only supports the simple type.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/xlink-type/}
 */
export const type = () => t.choices('simple' as const);
