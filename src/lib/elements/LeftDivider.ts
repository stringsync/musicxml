import { xml } from '../xml';

/**
 * Parent element: `<system-dividers>`
 *
 * The `<left-divider>` element indicates the presence or absence of a system divider (also known as a system separation
 * mark) displayed on the left side of the page.
 *
 * The default vertical position is half the `<system-distance>` value from the top of the system that is below the
 * divider. The default horizontal position is the left system margin.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/left-divider/}
 */
export type LeftDivider = ReturnType<typeof LeftDivider>;

export const LeftDivider = xml.element('left-divider', { attributes: {}, content: [] as const }, {});
