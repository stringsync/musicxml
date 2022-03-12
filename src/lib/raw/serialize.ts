import * as xmlJs from 'xml-js';
import { XmlDocument, XmlNode } from './types';

export const serialize = (xmlDocument: XmlDocument): string => {
  const xmlJsElements = xmlDocument.nodes.map(toXmlJsElement);
  return xmlJs.js2xml({ declaration: xmlDocument.declaration, elements: xmlJsElements }, { spaces: 2 });
};

const toXmlJsElement = (element: XmlNode): xmlJs.Element => {
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
