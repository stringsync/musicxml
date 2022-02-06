import { t } from '../xml';

/**
 * The group-symbol-value type indicates how the symbol for a group or multi-staff part is indicated in the score.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/group-symbol-value/}
 */
export const groupSymbolValue = () => {
  return t.label({
    label: 'group-symbol-value',
    value: t.choices(...(['none', 'brace', 'bracket', 'line', 'square'] as const)),
  });
};
