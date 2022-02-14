import * as elements from './generated/elements';
import * as errors from './lib/errors';
import * as operations from './lib/operations';
import * as raw from './lib/raw';
import * as schema from './lib/schema';
import * as xml from './lib/xml';

export type Root = elements.ScorePartwise | elements.ScoreTimewise;

type MusicXMLOpts<T extends Root> = {
  root: T;
  index: number;
  nodes: raw.RawXMLNode[];
  declaration: raw.Declaration;
};

export class MusicXML<T extends Root> {
  static parse(xmlStr: string): MusicXML<Root> {
    const descriptor = schema.t.choices(elements.ScorePartwise, elements.ScoreTimewise);
    const { declaration, nodes } = raw.parse(xmlStr);
    const resolutions = nodes.map((node) => xml.parse([node], descriptor));

    const resolved = resolutions.filter((resolution) => resolution.type === 'resolved');
    if (resolved.length !== 1) {
      throw new errors.MusicXMLError({
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
    return new MusicXML({ root, index, nodes, declaration });
  }

  static createPartwise(): MusicXML<elements.ScorePartwise> {
    const root = new elements.ScorePartwise();
    const index = 0;
    const nodes = [xml.serialize(root)];
    const declaration = raw.getDefaultDeclaration();
    return new MusicXML({ root, index, nodes, declaration });
  }

  static createTimewise(): MusicXML<elements.ScoreTimewise> {
    const root = new elements.ScoreTimewise();
    const index = 0;
    const nodes = [xml.serialize(root)];
    const declaration = raw.getDefaultDeclaration();
    return new MusicXML({ root, index, nodes, declaration });
  }

  static isScorePartwise(value: any): value is elements.ScorePartwise {
    return operations.validate(value, elements.ScorePartwise);
  }

  static isScoreTimewise(value: any): value is elements.ScoreTimewise {
    return operations.validate(value, elements.ScoreTimewise);
  }

  private root: T;
  private index: number;
  private declaration: raw.Declaration;
  private nodes: raw.RawXMLNode[];

  private constructor(opts: MusicXMLOpts<T>) {
    this.root = opts.root;
    this.index = opts.index;
    this.declaration = opts.declaration;
    this.nodes = opts.nodes;
  }

  getRoot(): T {
    return this.root;
  }

  serialize(): string {
    const node = xml.serialize(this.root);
    const nodes = [...this.nodes];
    nodes[this.index] = node;
    return raw.seralize(this.declaration, nodes);
  }
}
