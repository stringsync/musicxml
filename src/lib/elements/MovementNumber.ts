import { element, t } from './factory';

/**
 * Parent elements: <score-partwise>, <score-timewise>
 *
 * The <movement-number> element specifies the number of a movement.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/movement-number/}
 */
export const MovementNumber = element('movement-number', {
  attributes: {},
  content: t.none(),
});
