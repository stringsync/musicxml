import { t } from '../xml';

/**
 * The tremolo-type is used to distinguish double-note, single-note, and unmeasured tremolos.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/tremolo-type/}
 */
export const tremoloType = () => t.choices(...(['start', 'stop', 'single', 'unmeasured'] as const));
