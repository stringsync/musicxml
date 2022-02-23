export type Primitive<T extends string | number | null> = T;

export type XMLElement<N extends string, A extends Record<string, AnyPrimitive>, C extends Content[]> = {
  $name: N;
  attributes: A;
  contents: C;
};

export type Content = AnyXMLElement | AnyPrimitive | Content[];

export type AnyXMLElement = XMLElement<string, Record<string, AnyPrimitive>, Content[]>;

export type AnyPrimitive = Primitive<string | number | null>;

export type XMLDocument = XMLElement<'document', EmptyAttributes, Content[]>;

export type EmptyAttributes = Record<string, never>;

export type EmptyContents = never[];
