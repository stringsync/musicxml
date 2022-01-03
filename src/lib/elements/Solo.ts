import { xml } from '../xml';

/**
 * The `<solo>` element
 *
 * Parent elements: `<instrument-change>`, `<score-instrument>`
 *
 * The `<solo>` element is present if performance is intended by a solo instrument.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/solo/}
 */
export type Solo = ReturnType<typeof Solo>;

export const Solo = xml.element('solo', { attributes: {}, content: [] as const }, {});
