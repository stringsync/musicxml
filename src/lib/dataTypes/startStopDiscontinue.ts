import { t } from '../xml';

/**
 * The start-stop-discontinue type is used to specify `<ending>` types.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/data-types/start-stop-discontinue/}
 */
export const startStopDiscontinue = () => t.choices(...(['start', 'stop', 'discontinue'] as const));
