import { MusicXMLElement, MusicXMLNode } from './MusicXMLElement';

export type PartProps = Record<string, any>;

/**
 * Parent element: <score-partwise>
 *
 * The <part> element is the top level of musical organization below the <score-partwise> document element. It contains
 * a sequence of <measure> elements.
 *
 *  {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/part-partwise/}
 */
export class Part extends MusicXMLElement {
  constructor(props: PartProps) {
    super();
  }

  toPOJO(): MusicXMLNode {
    return { type: 'element', name: 'part' };
  }
}
