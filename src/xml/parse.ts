import * as xmlJs from 'xml-js';
import { XMLDeclaration, XMLDocument, XMLNode } from './types';

const IGNORE_ELEMENT_TYPES = ['comment'];

export const parse = (xml: string): XMLDocument => {
  const doc = xmlJs.xml2js(xml);
  const nodes = toXMLNodes(doc.elements);

  if (nodes.length !== 1) {
    throw new Error(`expected to have one root element, got: ${nodes.length}`);
  }
  const root = nodes[0];

  const declaration: XMLDeclaration = doc.attributes
    ? { attributes: toPlainAttributes(doc.attributes) }
    : getDefaultDeclaration();

  return { declaration, root };
};

const getDefaultDeclaration = (): XMLDeclaration => ({
  attributes: { version: '1.0', encoding: 'UTF-8' },
});

const toXMLNodes = (elements: xmlJs.Element[]): XMLNode[] => {
  return elements.filter((element) => !IGNORE_ELEMENT_TYPES.includes(element.type || '')).map(toXMLNode);
};

const toXMLNode = (element: xmlJs.Element): XMLNode => {
  switch (element.type) {
    case 'element':
      return {
        type: 'element',
        name: element.name || 'unknown',
        attributes: element.attributes ? toPlainAttributes(element.attributes) : {},
        contents: toXMLNodes(element.elements || []),
      };
    case 'text':
      return {
        type: 'text',
        text: element.text?.toString() || '',
      };
    case 'doctype':
      return {
        type: 'doctype',
        doctype: element.doctype?.toString() || '',
      };
    case 'cdata':
      return {
        type: 'cdata',
        cdata: element.cdata?.toString() || '',
      };
    default:
      throw new Error(`unhandled element type: ${element.type}`);
  }
};

const toPlainAttributes = (attributes: xmlJs.Attributes): Record<string, string> => {
  // The keys are sorted so that it deterministically gets serialzed by xmlJs.js2xml.
  // See https://github.com/nashwaan/xml-js/blob/f0376f265c4f299100fb4766828ebf066a0edeec/lib/js2xml.js#L62
  // and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in:
  // >A for...in loop iterates over the properties of an object in an arbitrary order
  return Object.keys(attributes)
    .sort()
    .reduce((plainAttributes, key) => {
      plainAttributes[key] = attributes[key]!.toString();
      return plainAttributes;
    }, {} as Record<keyof typeof attributes, string>);
};