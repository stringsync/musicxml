export type Declaration = {
  attributes: Record<string, string>;
};

export type RawXMLNode = ElementNode | TextNode | DoctypeNode;

export type ElementNode = {
  type: 'element';
  name: string;
  attributes: Record<string, string>;
  children: RawXMLNode[];
};

export type TextNode = {
  type: 'text';
  text: string;
};

export type DoctypeNode = {
  type: 'doctype';
  doctype: string;
};
