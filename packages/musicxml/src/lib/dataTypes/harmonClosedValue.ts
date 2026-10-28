import { t } from '../schema';
/**
 * The harmon-closed-value type represents whether the harmon mute is closed, open, half-open.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/harmon-closed-value/}
 */
export const harmonClosedValue = () => {
  return t.label({ label: 'harmon-closed-value', value: t.choices(...(['yes', 'no', 'half'] as const)) });
};
