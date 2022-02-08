import { schema, t } from '../schema';

/**
 * The `<software>` element
 *
 * Parent element: `<encoding>`
 *
 * The `<software>` element specifies what software created the digital encoding.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/software/}
 */
export const Software = schema('software', {}, [t.string()] as const);
