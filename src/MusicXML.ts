import * as elements from './generated/elements';
import { MusicXMLError } from './lib/errors';
import * as raw from './lib/raw';
import * as schema from './lib/schema';
import * as xml from './lib/xml';

/**
 * The allowed root elements for {@link MusicXML} objects.
 */
export type MusicXMLRoot = elements.ScorePartwise | elements.ScoreTimewise;

type MusicXMLOpts<T extends MusicXMLRoot> = {
  root: T;
  index: number;
  nodes: raw.RawXMLNode[];
  declaration: raw.Declaration;
};

/**
 * The MusicXML class manages data in a MusicXML document.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/}
 */
export class MusicXML<T extends MusicXMLRoot> {
  /**
   * Parses an XML string into a {@link MusicXML} object.
   *
   * This method expects exactly one top level `<score-partwise>` or `<score-timewise>` element in the XML document
   * string. If you need a blank {@link MusicXML} object, use {@link MusicXML.createPartwise} or
   * {@link MusicXML.createTimewise} instead.
   *
   * @param {string} xmlStr an XML document as a string
   * @returns {MusicXML} a {@link MusicXML} object
   */
  static parse(xmlStr: string): MusicXML<MusicXMLRoot> {
    const descriptor = schema.t.choices(elements.ScorePartwise, elements.ScoreTimewise);
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
    return new MusicXML({ root, index, nodes, declaration });
  }

  /**
   * Creates a {@link MusicXML} object with a {@link elements.ScorePartwise} as the root.
   *
   * @returns {MusicXML} a {@link MusicXML} object
   */
  static createPartwise(): MusicXML<elements.ScorePartwise> {
    const root = new elements.ScorePartwise();
    const index = 0;
    const nodes = [xml.serialize(root)];
    const declaration = raw.getDefaultDeclaration();
    return new MusicXML({ root, index, nodes, declaration });
  }

  /**
   * Creates a {@link MusicXML} object with a {@link elements.ScoreTimewise} as the root.
   *
   * @returns {MusicXML} a {@link MusicXML} object
   */
  static createTimewise(): MusicXML<elements.ScoreTimewise> {
    const root = new elements.ScoreTimewise();
    const index = 0;
    const nodes = [xml.serialize(root)];
    const declaration = raw.getDefaultDeclaration();
    return new MusicXML({ root, index, nodes, declaration });
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

  /**
   * Gets the root of this {@link MusicXML} object.
   *
   * @returns {elements.ScorePartwise|elements.ScoreTimewise} the root of this {@link MusicXML} object
   */
  getRoot(): T {
    return this.root;
  }

  /**
   * Serializes this {@link MusicXML} object into a string.
   *
   * @returns {string} the string representation of this {@link MusicXML} object
   */
  serialize(): string {
    const node = xml.serialize(this.root);
    const nodes = [...this.nodes];
    nodes[this.index] = node;
    return raw.seralize(this.declaration, nodes);
  }
}
