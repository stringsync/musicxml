import { schema, t } from '../schema';
import { LeftMargin } from './LeftMargin';
import { RightMargin } from './RightMargin';

/**
 * The `<system-margins>` element
 *
 * Parent element: `<system-layout>`
 *
 * System margins are relative to the page margins. Positive values indent and negative values reduce the margin size.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/system-margins/}
 */
export const SystemMargins = schema('system-margins', {}, [t.required(LeftMargin), t.required(RightMargin)] as const);
