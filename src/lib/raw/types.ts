export type Declaration = {
  attributes: Record<string, string>;
};

export type RawXMLNode = ElementNode | TextNode | DoctypeNode | CommentNode;

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

export type CommentNode = {
  type: 'comment';
  comment: string;
};
