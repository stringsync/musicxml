import { MusicXMLElement, MusicXMLNode } from './MusicXMLElement';

export type MovementTitleProps = Record<string, any>;

/**
 * Parent elements: <score-partwise>, <score-timewise>
 *
 * The <movement-title> element specifies the title of a movement, not including its number.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/movement-title/}
 */
export class MovementTitle extends MusicXMLElement {
  constructor(props: MovementTitleProps = {}) {
    super();
  }

  toPOJO(): MusicXMLNode {
    return { type: 'element', name: 'movement-title' };
  }
}
