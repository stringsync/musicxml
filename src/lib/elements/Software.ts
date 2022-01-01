import { t, xml } from '../xml';

/**
 * Parent element: `<encoding>`
 *
 * The `<software>` element specifies what software created the digital encoding.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/software/}
 */
export type Software = ReturnType<typeof Software>;

export const Software = xml.element('software', { attributes: {}, content: [t.string()] as const }, {});
