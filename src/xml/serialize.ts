import * as xmlJs from 'xml-js';
import { AnyAttributes, XMLDocument, XMLElementContent, XMLNode } from './types';

export const seralize = (document: XMLDocument): string => {
  return xmlJs.js2xml(
    {
      declaration: document.declaration,
      elements: toXmlJsElement(document.root),
    },
    { spaces: 2 }
  );
};

const isXmlNode = (value: any): value is XMLNode => {
  return typeof value === 'object' && ['element', 'text', 'doctype', 'cdata'].includes(value.type);
};

const toXmlJsElementAttributes = (attributes: AnyAttributes): xmlJs.Attributes => {
  return Object.keys(attributes).reduce<xmlJs.Attributes>((xmlJsAttributes, key) => {
    xmlJsAttributes[key] = xmlJsAttributes[key] === null ? undefined : xmlJsAttributes[key];
    return xmlJsAttributes;
  }, {});
};

const toXmlJsElement = (content: XMLElementContent): xmlJs.Element[] => {
  if (typeof content === 'string') {
    return [
      {
        type: 'text',
        text: content,
      },
    ];
  }
  if (typeof content === 'number') {
    return [
      {
        type: 'text',
        text: content.toString(),
      },
    ];
  }
  if (Array.isArray(content)) {
    return content.flatMap(toXmlJsElement);
  }
  if (isXmlNode(content)) {
    switch (content.type) {
      case 'element':
        return [
          {
            type: 'element',
            name: content.name,
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
