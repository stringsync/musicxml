export type XmlDocument = {
  declaration: Declaration;
  nodes: XmlNode[];
};

export type Declaration = {
  attributes: Record<string, string>;
};

export type XmlNode = ElementNode | TextNode | DoctypeNode;

export type ElementNode = {
  type: 'element';
  name: string;
  attributes: Record<string, string>;
  children: XmlNode[];
};

export type TextNode = {
  type: 'text';
  text: string;
};

export type DoctypeNode = {
  type: 'doctype';
  doctype: string;
};
