import { AnyXmlElement, XmlNode, XsComplexType, XsElement, XsGroup, XsSimpleType } from './types';

export const isXmlNode = (value: any): value is XmlNode => {
  return typeof value === 'object' && ['element', 'text', 'doctype', 'cdata'].includes(value.type);
};

export const isXmlElement = (value: any): value is AnyXmlElement => {
  return isXmlNode(value) && value.type === 'element';
};

export const isXsSimpleType = (value: any): value is XsSimpleType => {
  return isXmlElement(value) && value.tagName === 'xs:simpleType';
};

export const isXsComplexType = (value: any): value is XsComplexType => {
  return isXmlElement(value) && value.tagName === 'xs:complexType';
};

export const isXsGroup = (value: any): value is XsGroup => {
  return isXmlElement(value) && value.tagName === 'xs:group';
};

export const isXsElement = (value: any): value is XsElement => {
  return isXmlElement(value) && value.tagName === 'xs:element';
};

export const isNamed = (value: any): value is { attributes: { name: string } } => {
  return isXmlElement(value) && typeof value.attributes.name === 'string';
};

export const deepCopy = <T>(value: T): T => {
  if (Array.isArray(value)) {
    return value.map((v) => deepCopy(v)) as any;
  } else if (typeof value === 'object') {
    const copy: any = {};
    for (const [k, v] of Object.entries(value)) {
      copy[k] = deepCopy(v);
    }
    return copy;
  }
  return value;
};
