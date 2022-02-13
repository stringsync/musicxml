export type Declaration = {
  attributes: Record<string, string>;
};

export type RawXMLElement = ElementNode | TextNode | DoctypeNode;

export type ElementNode = {
  type: 'element';
  name: string;
  attributes: Record<string, string>;
  children: RawXMLElement[];
};

export type TextNode = {
  type: 'text';
  text: string;
};

export type DoctypeNode = {
  type: 'doctype';
  doctype: string;
};

export type Resolution<T = any> = ResolvedResolution<T> | ZeroResolution<T> | NoneResolution;

export type ResolvedResolution<T> = {
  type: 'resolved';
  value: T;
};

export type ZeroResolution<T> = {
  type: 'zero';
  value: T;
};

export type NoneResolution = {
  type: 'none';
  value: undefined;
};
