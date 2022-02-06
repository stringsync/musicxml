import { t } from '../xml';

/**
 * The degree-type-value type indicates whether the current degree element is an addition, alteration, or subtraction to
 * the kind of the current chord in the harmony element.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/degree-type-value/}
 */
export const degreeTypeValue = () => {
  return t.label({ label: 'degree-type-value', value: t.choices(...(['add', 'alter', 'subtract'] as const)) });
};
