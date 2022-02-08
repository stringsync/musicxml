import { schema } from '../schema';

/**
 * The `<solo>` element
 *
 * Parent elements: `<instrument-change>`, `<score-instrument>`
 *
 * The `<solo>` element is present if performance is intended by a solo instrument.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/solo/}
 */
export const Solo = schema('solo', {}, [] as const);
