import { MusicXMLElement, MusicXMLNode } from './MusicXMLElement';

export type MovementNumberProps = Record<string, any>;

export class MovementNumber extends MusicXMLElement {
  constructor(props: MovementNumberProps = {}) {
    super();
  }

  toPOJO(): MusicXMLNode {
    return { type: 'element', name: 'movement-number' };
  }
}
