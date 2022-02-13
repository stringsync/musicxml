import * as xmlJs from 'xml-js';
import { MusicXMLError } from '../errors';
import { Declaration, RawXMLElement } from './types';

export const parse = (xml: string): { declaration: Declaration; elements: RawXMLElement[] } => {
  const xmlJsElements = xmlJs.xml2js(xml);
  return { declaration: xmlJsElements.declaration!, elements: (xmlJsElements.elements || []).map(toRawXMLElement) };
};

export const seralize = (declaration: Declaration, elements: RawXMLElement[]): string => {
  const xmlJsElements = elements.map(toXmlJsElement);
  return xmlJs.js2xml({ declaration, elements: xmlJsElements }, { spaces: 2 });
};

const toPlainAttributes = (attributes?: xmlJs.Attributes | undefined): Record<string, string> => {
  if (!attributes) {
    return {};
  }
  return Object.keys(attributes).reduce((plainAttributes, key) => {
    plainAttributes[key] = attributes[key]!.toString();
    return plainAttributes;
  }, {} as Record<keyof typeof attributes, string>);
};

const toRawXMLElement = (element: xmlJs.Element): RawXMLElement => {
  switch (element.type) {
    case 'element':
      return {
        type: 'element',
        name: element.name || 'unknown',
        attributes: toPlainAttributes(element.attributes),
        children: (element.elements || []).map(toRawXMLElement),
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
    default:
      throw new MusicXMLError({
        symptom: 'cannot parse element',
        context: { element },
        remedy: 'update the implementation of toRawXMLElement to handle element',
      });
  }
};

const toXmlJsElement = (element: RawXMLElement): xmlJs.Element => {
  switch (element.type) {
    case 'element':
      return {
        type: 'element',
        name: element.name,
        attributes: element.attributes,
        elements: element.children.map(toXmlJsElement),
      };
    case 'text':
      return {
        type: 'text',
        text: element.text,
      };
    case 'doctype':
      return {
        type: 'doctype',
        doctype: element.doctype,
      };
  }
};
