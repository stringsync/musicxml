import * as xmlJs from 'xml-js';
import { AnyAttributes, XmlDocument, XmlElementContent } from './types';
import { isXmlNode } from './util';

export const seralize = (document: XmlDocument): string => {
  return xmlJs.js2xml(
    {
      declaration: document.declaration,
      elements: toXmlJsElement(document.root),
    },
    { spaces: 2 }
  );
};

const toXmlJsElementAttributes = (attributes: AnyAttributes): xmlJs.Attributes => {
  return Object.keys(attributes).reduce<xmlJs.Attributes>((xmlJsAttributes, key) => {
    xmlJsAttributes[key] = xmlJsAttributes[key] === null ? undefined : xmlJsAttributes[key];
    return xmlJsAttributes;
  }, {});
};

const toXmlJsElement = (content: XmlElementContent): xmlJs.Element[] => {
  if (Array.isArray(content)) {
    return content.flatMap(toXmlJsElement);
  }
  if (isXmlNode(content)) {
    switch (content.type) {
      case 'element':
        return [
          {
            type: 'element',
            name: content.tagName,
            attributes: toXmlJsElementAttributes(content.attributes),
            elements: content.contents.flatMap(toXmlJsElement),
          },
        ];
      case 'text':
        return [{ type: 'text', text: content.text }];
      case 'cdata':
        return [{ type: 'cdata', cdata: content.cdata }];
      case 'doctype':
        return [{ type: 'doctype', doctype: content.doctype }];
    }
  }
  throw new Error(`cannot serialize content: ${content}`);
};
