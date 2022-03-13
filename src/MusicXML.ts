import * as elements from './generated/elements';
import * as schema from './lib/schema';
import * as xml from './lib/xml';
import { MusicXMLError } from './MusicXMLError';

/**
 * The allowed root elements for {@link MusicXML} objects.
 */
export type MusicXMLRoot = elements.ScorePartwise | elements.ScoreTimewise;

type MusicXMLOpts<T extends MusicXMLRoot> = {
  root: T;
  index: number;
  xmlDocument: xml.XmlDocument;
};

/**
 * The MusicXML class manages data in a MusicXML document.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/}
 */
export class MusicXML<T extends MusicXMLRoot = MusicXMLRoot> {
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
  static parse(xmlStr: string): MusicXML {
    const descriptor = schema.t.choices(elements.ScorePartwise, elements.ScoreTimewise);
    const xmlDocument = xml.parse(xmlStr);
    const resolutions = xmlDocument.nodes.map((node) => xml.conform([node], descriptor));

    const resolved = resolutions.filter((resolution) => resolution.type === 'resolved');
    if (resolved.length !== 1) {
      throw new MusicXMLError(
        'invalid music xml document, expected an xml document with exactly one top level <score-partwise> or <score-timewise> element',
        {
          rootElementNames: xmlDocument.nodes
            .filter((node): node is xml.ElementNode => node.type === 'element')
            .map((node) => node.name),
        }
      );
    }

    const root = resolved[0].value;
    const index = resolutions.findIndex((resolution) => resolution.type === 'resolved');
    return new MusicXML({ root, index, xmlDocument });
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
    const declaration = xml.getDefaultDeclaration();
    const xmlDocument = { declaration, nodes };
    return new MusicXML({ root, index, xmlDocument });
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
    const declaration = xml.getDefaultDeclaration();
    const xmlDocument = { declaration, nodes };
    return new MusicXML({ root, index, xmlDocument });
  }

  private root: T;
  private index: number;
  private xmlDocument: xml.XmlDocument;

  private constructor(opts: MusicXMLOpts<T>) {
    this.root = opts.root;
    this.index = opts.index;
    this.xmlDocument = opts.xmlDocument;
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
    const nodes = [...this.xmlDocument.nodes];
    nodes[this.index] = node;
    const declaration = this.xmlDocument.declaration;
    const xmlDocument = { declaration, nodes };
    return xml.toString(xmlDocument);
  }
}
