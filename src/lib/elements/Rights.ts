import { t, xml } from '../xml';

/**
 * Parent element: `<identification>`
 *
 * The `<rights>` element contains copyright and other intellectual property notices. This is similar to the Dublin
 * Core rights element. Words, music, and derivatives can have different types, so multiple <rights> elements with
 * different type attributes are supported.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/rights/}
 */
export const Rights = xml.element('rights', { attributes: { type: t.string() }, content: [t.string()] }, {});
