import { t } from '../schema';
/**
 * The time-relation type indicates the symbol used to represent the interchangeable aspect of dual time signatures.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/time-relation/}
 */
export const timeRelation = () => {
  return t.label({
    label: 'time-relation',
    value: t.choices(...(['space', 'bracket', 'equals', 'hyphen', 'parentheses', 'slash'] as const)),
  });
};
