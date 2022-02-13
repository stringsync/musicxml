import { ScorePartwise, ScoreTimewise } from './generated/elements';
import { MusicXMLError } from './lib/errors';
import * as raw from './lib/raw';
import { t } from './lib/schema';
import * as xml from './lib/xml';

export class MusicXML {
  static parse(xmlStr: string): MusicXML {
    const descriptor = t.choices(ScorePartwise, ScoreTimewise);
    const { declaration, nodes } = raw.parse(xmlStr);
    const resolutions = nodes.map((node) => xml.parse([node], descriptor));

    const resolved = resolutions.filter((resolution) => resolution.type === 'resolved');
    if (resolved.length !== 1) {
      throw new MusicXMLError({
        symptom: 'invalid music xml document',
        context: {
          rootElementNames: nodes
            .filter((node): node is raw.ElementNode => node.type === 'element')
            .map((node) => node.name),
        },
        remedy: 'use an xml document with exactly one top level <score-partwise> or <score-timewise> element',
      });
    }

    const root = resolved[0].value;
    const index = resolutions.findIndex((resolution) => resolution.type === 'resolved');
    return new MusicXML(root, index, declaration, nodes);
  }

  private root: ScorePartwise | ScoreTimewise;
  private index: number;
  private declaration: raw.Declaration;
  private nodes: raw.RawXMLNode[];

  private constructor(
    root: ScorePartwise | ScoreTimewise,
    index: number,
    declaration: raw.Declaration,
    elements: raw.RawXMLNode[]
  ) {
    this.root = root;
    this.index = index;
    this.declaration = declaration;
    this.nodes = elements;
  }

  getRoot(): ScorePartwise | ScoreTimewise {
    return this.root;
  }

  serialize(): string {
    const node = xml.serialize(this.root);
    const nodes = [...this.nodes];
    nodes[this.index] = node;
    return raw.seralize(this.declaration, nodes);
  }
}
