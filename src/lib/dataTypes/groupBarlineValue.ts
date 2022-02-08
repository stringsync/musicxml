import { t } from '../schema';
/**
 * The group-barline-value type indicates if the group should have common barlines.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/group-barline-value/}
 */
export const groupBarlineValue = () => {
  return t.label({ label: 'group-barline-value', value: t.choices(...(['yes', 'no', 'Mensurstrich'] as const)) });
};
