import { element, t } from './factory';

/**
 * Parent elements: <score-partwise>, <score-timewise>
 *
 * Works are optionally identified by number and title. The <work> element also may indicate a link to the <opus>
 * document that composes multiple scores into a collection.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/work/}
 */
export const Work = element('work', {
  attributes: {},
  content: t.none(),
});
