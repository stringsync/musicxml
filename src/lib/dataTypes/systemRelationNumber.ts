import { t } from '../xml';

/**
 * The system-relation-number type distinguishes measure numbers that are associated with a system rather than the
 * particular part where the element appears.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/system-relation-number/}
 */
export const systemRelationNumber = () => {
  return t.choices(...(['none', 'only-top', 'only-bottom', 'also-top', 'also-bottom'] as const));
};
