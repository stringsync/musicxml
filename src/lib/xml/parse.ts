import * as xmlJs from 'xml-js';
import { MusicXMLError } from '../../MusicXMLError';
import { XmlDocument, XmlNode } from './types';

const IGNORE_ELEMENT_TYPES = ['comment', 'instruction'];

export const parse = (xml: string): XmlDocument => {
  const xmlJsElements = xmlJs.xml2js(xml);
  return {
    declaration: xmlJsElements.declaration!,
    nodes: toRawXMLNodes(xmlJsElements.elements || []),
  };
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

const toRawXMLNodes = (elements: xmlJs.Element[]): XmlNode[] => {
  return elements.filter((element) => !IGNORE_ELEMENT_TYPES.includes(element.type || '')).map(toRawXMLNode);
};

const toRawXMLNode = (node: xmlJs.Element): XmlNode => {
  switch (node.type) {
    case 'element':
      return {
        type: 'element',
        name: node.name || 'unknown',
        attributes: node.attributes ? toPlainAttributes(node.attributes) : {},
        children: toRawXMLNodes(node.elements || []),
      };
    case 'text':
      return {
        type: 'text',
        text: node.text?.toString() || '',
      };
    case 'doctype':
      return {
        type: 'doctype',
        doctype: node.doctype?.toString() || '',
      };
    case 'cdata':
      // We don't need to preserve cdata, see https://stackoverflow.com/a/61626192.
      return {
        type: 'text',
        text: node.cdata?.toString() || '',
      };
    default:
      throw new MusicXMLError('cannot parse element', { element: node });
  }
};
