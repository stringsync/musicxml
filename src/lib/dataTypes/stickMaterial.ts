import { t } from '../schema';
/**
 * The stick-material type represents the material being displayed in a stick pictogram.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/stick-material/}
 */
export const stickMaterial = () => {
  return t.label({
    label: 'stick-material',
    value: t.choices(...(['x', 'hard', 'medium', 'shaded', 'soft'] as const)),
  });
};
