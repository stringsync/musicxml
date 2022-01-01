import { t, xml } from '../xml';
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
export type SystemMargins = ReturnType<typeof SystemMargins>;

export const SystemMargins = xml.element(
  'system-margins',
  { attributes: {}, content: [t.required(LeftMargin), t.required(RightMargin)] as const },
  {}
);
