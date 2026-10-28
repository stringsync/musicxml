import { t } from '../schema';
/**
 * The handbell-value type represents the type of handbell technique being notated.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/handbell-value/}
 */
export const handbellValue = () => {
  return t.label({
    label: 'handbell-value',
    value: t.choices(
      ...([
        'belltree',
        'damp',
        'echo',
        'gyro',
        'hand martellato',
        'mallet lift',
        'mallet table',
        'martellato',
        'martellato lift',
        'muted martellato',
        'pluck lift',
        'swing',
      ] as const)
    ),
  });
};
