export type Primitive<T extends string | number | null> = T;

export type XMLNode = AnyXMLElement | XMLText | XMLDoctype | XMLCData;

export type XMLElement<N extends string, A extends Record<string, AnyPrimitive>, C extends XMLElementContent[]> = {
  type: 'element';
  name: N;
  attributes: A;
  contents: C;
};

export type XMLText = {
  type: 'text';
  text: string;
};

export type XMLDoctype = {
  type: 'doctype';
  doctype: string;
};

export type XMLCData = {
  type: 'cdata';
  cdata: string;
};

export type XMLElementContent = XMLNode | AnyPrimitive | XMLElementContent[];

export type AnyXMLElement = XMLElement<string, AnyAttributes, XMLElementContent[]>;

export type AnyAttributes = Record<string, AnyPrimitive>;

export type AnyPrimitive = Primitive<string | number | null>;

export type XMLDeclaration = {
  attributes: Record<string, string>;
};

export type XMLDocument = {
  declaration: XMLDeclaration;
  root: XMLNode;
};

export type EmptyAttributes = Record<string, never>;

export type EmptyContents = never[];

export type XMLElementVariant<V extends string, E extends AnyXMLElement> = { $variant: V } & E;

export type Scalars = {
  ID: string;
  anyURI: string;
  qualification: 'qualified' | 'unqualified';
  language: string;
  NCName: string;
  QName: string;
  string: string;
  number: number;
  usage: 'optional' | 'prohibited' | 'required';
  occurs: number | 'unbounded';
  block: '#all' | 'extension' | 'restriction' | 'substituion';
  final: '#all' | 'extension' | 'restriction';
};

// A partial typing of XSD based on:
// https://docs.microsoft.com/en-us/previous-versions/dotnet/netframework-4.0/ms256235(v=vs.100)
export type Schema = XMLElement<
  'xs:schema',
  {
    attributeFormDefault: Scalars['qualification'];
    elementFormDefault: Scalars['qualification'];
  },
  [(Import | Annotation)[], [[[SimpleType | ComplexType, Group, AttributeGroup] | Element | Attribute], Annotation[]][]]
>;

export type Annotation = XMLElement<'xs:annotation', Record<string, never>, Documentation[]>;

export type Documentation = XMLElement<'xs:documentation', Record<string, never>, [Scalars['string']]>;

export type Import = XMLElement<
  'xs:import',
  {
    id: Scalars['ID'];
    namespace: Scalars['anyURI'];
    schemaLocation: Scalars['anyURI'];
  },
  [Annotation | null]
>;

export type SimpleType = XMLElement<
  'xs:simpleType',
  { name: Scalars['NCName'] },
  [Annotation | null, SimpleTypeRestriction | Union]
>;

export type SimpleTypeRestriction = XMLElementVariant<
  'xs:simpleType',
  XMLElement<
    'xs:restriction',
    { base: Scalars['QName'] },
    [
      Annotation | null,
      [SimpleType | null, [MinExclusive | MinInclusive | MaxInclusive | MinLength | Enumeration | Pattern][]]
    ]
  >
>;

export type SimpleContentRestriction = XMLElementVariant<
  'xs:simpleContent',
  XMLElement<
    'xs:restriction',
    { base: Scalars['QName'] },
    [
      Annotation | null,
      [SimpleType | null, (MinExclusive | MinInclusive | MaxInclusive | MinLength | Enumeration | Pattern)[]] | null,
      [(Attribute | AttributeGroup)[], null]
    ]
  >
>;

export type ComplexContentRestriction = XMLElementVariant<
  'xs:complexContent',
  XMLElement<
    'xs:restriction',
    { base: Scalars['QName'] },
    [Annotation | null, [Group | Choice | Sequence] | null, [(Attribute | AttributeGroup)[], null]]
  >
>;

export type Enumeration = XMLElement<'xs:enumeration', { value: Scalars['string'] }, []>;

export type MinInclusive = XMLElement<'xs:minInclusive', { value: Scalars['number'] }, []>;

export type MaxInclusive = XMLElement<'xs:maxInclusive', { value: Scalars['number'] }, []>;

export type Pattern = XMLElement<'xs:pattern', { value: string }, []>;

export type Union = XMLElement<'xs:union', { memberTypes: Scalars['QName'] }, [Annotation | null, SimpleType[]]>;

export type MinExclusive = XMLElement<'xs:minExclusive', { value: Scalars['number'] }, []>;

export type MinLength = XMLElement<'xs:minLength', { value: Scalars['number'] }, []>;

export type AttributeGroup = XMLElement<
  'xs:attributeGroup',
  { name: Scalars['NCName']; ref: Scalars['QName'] },
  [Annotation | null, [(Attribute | AttributeGroup)[], null]]
>;

export type Attribute = XMLElement<
  'xs:attribute',
  {
    name: Scalars['NCName'];
    type: Scalars['QName'];
    default: Scalars['string'];
    ref: Scalars['QName'];
    use: Scalars['usage'];
    fixed: Scalars['string'];
  },
  []
>;

export type ComplexType = XMLElement<
  'xs:complexType',
  { name: Scalars['NCName'] },
  [
    Annotation | null,
    [SimpleContent | ComplexContent | [Group | Choice | Sequence | null, (Attribute | AttributeGroup)[], null]]
  ]
>;

export type SimpleContent = XMLElement<
  'xs:simpleContent',
  Record<string, never>,
  [Annotation | null, SimpleContentRestriction | SimpleContentExtension]
>;

export type SimpleContentExtension = XMLElementVariant<
  'xs:simpleContent',
  XMLElement<'xs:extension', { base: Scalars['QName'] }, [Annotation | null, [(Attribute | AttributeGroup)[], null]]>
>;

export type ComplexContentExtension = XMLElementVariant<
  'xs:complexContent',
  XMLElement<
    'xs:extension',
    { base: Scalars['QName'] },
    [Annotation | null, [Group | Choice | Sequence | null, [(Attribute | AttributeGroup)[], null]]]
  >
>;

export type Choice = XMLElement<
  'xs:choice',
  { maxOccurs: Scalars['occurs']; minOccurs: Scalars['occurs'] },
  [Annotation | null, (Element | Group | Choice | Sequence)[]]
>;

export type Element = XMLElement<
  'xs:element',
  {
    name: Scalars['NCName'];
    type: Scalars['QName'];
    minOccurs: Scalars['occurs'];
    maxOccurs: Scalars['occurs'];
    block: Scalars['block'];
    final: Scalars['final'];
  },
  [Annotation | null, [[SimpleType | ComplexType] | null, []]]
>;

export type Sequence = XMLElement<'xs:sequence', { minOccurs: Scalars['occurs']; maxOccurs: Scalars['occurs'] }, []>;

export type Group = XMLElement<
  'xs:group',
  { ref: Scalars['QName']; minOccurs: Scalars['occurs']; maxOccurs: Scalars['occurs']; name: Scalars['NCName'] },
  []
>;

export type ComplexContent = XMLElement<
  'xs:complexContent',
  { name: Scalars['NCName'] },
  [
    Annotation | null,
    SimpleContent | ComplexContent | (Group | Choice | Sequence) | null,
    [(Attribute | AttributeGroup)[], null]
  ]
>;
