import * as xmlJs from 'xml-js';
import { MusicXMLError } from '../errors';
import { RawXMLElement } from './types';

export const parse = (xml: string): RawXMLElement[] => {
  const xmlJsElements = xmlJs.xml2js(xml).elements || [];
  return xmlJsElements
    .filter((element: xmlJs.Element) => element.type === 'element' || element === 'text')
    .map(toRawXMLElement);
};

export const seralize = (elements: RawXMLElement[]): string => {
  const xmlJsElements = elements.map(toXmlJsElement);
  return xmlJs.js2xml({ type: 'element', elements: xmlJsElements });
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
        elements: element.children.map(toRawXMLElement),
      };
    case 'text':
      return {
        type: 'text',
        text: element.text,
      };
  }
};
