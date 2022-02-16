import * as xmlJs from 'xml-js';
import { MusicXMLError } from '../errors';
import { Declaration, RawXMLNode } from './types';

export const parse = (xml: string): { declaration: Declaration; nodes: RawXMLNode[] } => {
  const xmlJsElements = xmlJs.xml2js(xml);
  return { declaration: xmlJsElements.declaration!, nodes: (xmlJsElements.elements || []).map(toRawXMLNode) };
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

const toRawXMLNode = (node: xmlJs.Element): RawXMLNode => {
  switch (node.type) {
    case 'element':
      return {
        type: 'element',
        name: node.name || 'unknown',
        attributes: node.attributes ? toPlainAttributes(node.attributes) : {},
        children: (node.elements || []).map(toRawXMLNode),
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
    case 'comment':
      return {
        type: 'comment',
        comment: node.comment || '',
      };
    default:
      throw new MusicXMLError({
        symptom: 'cannot parse element',
        context: { element: node },
        remedy: 'update the implementation of toRawXMLElement to handle element',
      });
  }
};
