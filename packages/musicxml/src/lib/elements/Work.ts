import { schema, t } from '../schema';
import { Opus } from './Opus';
import { WorkNumber } from './WorkNumber';
import { WorkTitle } from './WorkTitle';

/**
 * The `<work>` element
 *
 * Parent elements: `<score-partwise version="4.0">`, `<score-timewise>`
 *
 * Works are optionally identified by number and title. The `<work>` element also may indicate a link to the `<opus>`
 * document that composes multiple scores into a collection.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/work/}
 */
export const Work = schema('work', {}, [t.optional(WorkNumber), t.optional(WorkTitle), t.optional(Opus)] as const);
