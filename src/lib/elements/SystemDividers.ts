import { schema, t } from '../schema';
import { LeftDivider } from './LeftDivider';

/**
 * The `<system-dividers>` element
 *
 * Parent element: `<system-layout>`
 *
 * The `<system-dividers>` element indicates the presence or absence of system dividers (also known as system separation
 * marks) between systems displayed on the same page. Dividers on the left and right side of the page are controlled by
 * the `<left-divider>` and `<right-divider>` elements respectively.
 *
 * When used in the `<print>` element, the `<system-dividers>` element affects the dividers that would appear between
 * the current system and the previous system.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/system-dividers/}
 */
export const SystemDividers = schema('system-dividers', {}, [t.required(LeftDivider)] as const);
