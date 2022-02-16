import * as xmlJs from 'xml-js';
import { Declaration, RawXMLNode } from './types';

export const seralize = (declaration: Declaration, nodes: RawXMLNode[]): string => {
  const xmlJsElements = nodes.map(toXmlJsElement);
  return xmlJs.js2xml({ declaration, elements: xmlJsElements }, { spaces: 2 });
};

const toXmlJsElement = (element: RawXMLNode): xmlJs.Element => {
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
