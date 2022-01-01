import { t } from '../xml';

/**
 * The sync-type type specifies the style that a score following application should use to synchronize an accompaniment
 * with a performer.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/sync-type/}
 */
export const syncType = () => {
  return t.choices(...(['none', 'tempo', 'mostly-tempo', 'mostly-event', 'event', 'always-event'] as const));
};
