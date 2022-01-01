import { t } from '../xml';

/**
 * The start-stop-single type is used for an attribute of musical elements that can be used for either multi-note or
 * single-note musical elements, as for groupings.
 *
 * When multiple elements with the same tag are used within the same note, their order within the MusicXML document
 * should match the musical score order.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/start-stop-single/}
 */
export const startStopSingle = () => t.choices(...(['start', 'stop', 'single'] as const));
