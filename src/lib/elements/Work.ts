import { t, xml } from '../xml';
import { Opus } from './Opus';
import { WorkNumber } from './WorkNumber';
import { WorkTitle } from './WorkTitle';

/**
 * The `<work>` element
 *
 * Parent elements: `<score-partwise>`, `<score-timewise>`
 *
 * Works are optionally identified by number and title. The `<work>` element also may indicate a link to the `<opus>`
 * document that composes multiple scores into a collection.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/work/}
 */
export type Work = ReturnType<typeof Work>;

export const Work = xml.element(
  'work',
  {
    attributes: {},
    content: [t.optional(WorkNumber), t.optional(WorkTitle), t.optional(Opus)] as const,
  },
  {}
);
