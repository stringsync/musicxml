import { t } from '../xml';

/**
 * The hole-closed-value type represents whether the hole is closed, open, or half-open.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/hole-closed-value/}
 */
export const holeClosedValue = () => {
  return t.label({ label: 'hole-closed-value', value: t.choices(...(['yes', 'no', 'half'] as const)) });
};
