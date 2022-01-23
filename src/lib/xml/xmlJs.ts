import * as xmlJs from 'xml-js';
import { MusicXMLError } from '../errors';
import { Parser, RawXMLElement } from './types';

export const parse: Parser = (xml) => {
  const xmlJsElements = xmlJs.xml2js(xml).elements || [];
  return xmlJsElements.map(toRawXMLElement);
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
