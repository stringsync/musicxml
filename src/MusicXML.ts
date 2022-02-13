import { ScorePartwise, ScoreTimewise } from './generated/elements';
import { MusicXMLError } from './lib/errors';
import { t } from './lib/schema';
import * as xml from './lib/xml';

const ROOT_DESCRIPTOR = t.choices(ScorePartwise, ScoreTimewise);

export class MusicXML {
  static parse(xmlStr: string): MusicXML {
    const { declaration, elements } = xml.parse(xmlStr);
    const resolutions = elements.map((rawElement) => xml.fromRawXMLElements([rawElement], ROOT_DESCRIPTOR));
    const resolved = resolutions.filter((resolution) => resolution.type === 'resolved');

    if (resolved.length !== 1) {
      const rootElementNames = elements
        .filter((rawElement): rawElement is xml.ElementNode => rawElement.type === 'element')
        .map((rawElement) => rawElement.name);

      throw new MusicXMLError({
        symptom: 'invalid music xml document',
        context: { rootElementNames },
        remedy: 'use an xml document with exactly one top level <score-partwise> or <score-timewise> element',
      });
    }

    const root = resolved[0].value;
    const index = resolutions.findIndex((resolution) => resolution.type === 'resolved');
    return new MusicXML(root, index, declaration, elements);
  }

  private root: ScorePartwise | ScoreTimewise;
  private index: number;
  private declaration: xml.Declaration;
  private elements: xml.RawXMLElement[];

  private constructor(
    root: ScorePartwise | ScoreTimewise,
    index: number,
    declaration: xml.Declaration,
    elements: xml.RawXMLElement[]
  ) {
    this.root = root;
    this.index = index;
    this.declaration = declaration;
    this.elements = elements;
  }

  getRoot(): ScorePartwise | ScoreTimewise {
    return this.root;
  }

  serialize(): string {
    const element = xml.toRawXMLElement(this.root);
    const elements = [...this.elements];
    elements[this.index] = element;
    return xml.seralize(this.declaration, elements);
  }
}
