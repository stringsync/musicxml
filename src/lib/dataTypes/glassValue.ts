import { t } from '../xml';

/**
 * The glass-value type represents pictograms for glass percussion instruments.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/glass-value/}
 */
export const glassValue = () => {
  return t.label({
    label: 'glass-value',
    value: t.choices(...(['glass harmonica', 'glass harp', 'wind chimes'] as const)),
  });
};
