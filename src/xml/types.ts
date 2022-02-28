export type Primitive<T extends string | number | null> = T;

export type XmlNode = AnyXmlElement | XmlText | XmlDoctype | XmlCData;

export type XmlElement<N extends string, A extends Record<string, AnyPrimitive>, C extends XmlElementContent[]> = {
  type: 'element';
  name: N;
  attributes: A;
  contents: C;
};

export type XmlText = {
  type: 'text';
  text: string;
};

export type XmlDoctype = {
  type: 'doctype';
  doctype: string;
};

export type XmlCData = {
  type: 'cdata';
  cdata: string;
};

export type XmlElementContent = XmlNode | null | XmlElementContent[];

export type AnyXmlElement = XmlElement<string, AnyAttributes, XmlElementContent[]>;

export type AnyAttributes = Record<string, AnyPrimitive>;

export type AnyPrimitive = Primitive<string | number | null>;

export type XmlDeclaration = {
  attributes: Record<string, string>;
};

export type XmlDocument = {
  declaration: XmlDeclaration;
  root: XmlNode;
};

export type EmptyAttributes = Record<string, never>;

export type EmptyContents = never[];

export type XmlElementVariant<V extends string, E extends AnyXmlElement> = { $variant: V } & E;

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
export type XsSchema = XmlElement<
  'xs:schema',
  {
    attributeFormDefault: Scalars['qualification'];
    elementFormDefault: Scalars['qualification'];
  },
  [
    (XsImport | XsAnnotation)[],
    (XsSimpleType | XsComplexType | XsGroup | XsAttributeGroup | XsElement | XsAttribute | XsAnnotation)[]
  ]
>;

export type XsAnnotation = XmlElement<'xs:annotation', Record<string, never>, XsDocumentation[]>;

export type XsDocumentation = XmlElement<'xs:documentation', Record<string, never>, [XmlText | XmlCData]>;

export type XsImport = XmlElement<
  'xs:import',
  {
    id: Scalars['ID'];
    namespace: Scalars['anyURI'];
    schemaLocation: Scalars['anyURI'];
  },
  [XsAnnotation | null]
>;

export type XsSimpleType = XmlElement<
  'xs:simpleType',
  { name: Scalars['NCName'] },
  [XsAnnotation | null, XsSimpleTypeRestriction | XsUnion]
>;

export type XsSimpleTypeRestriction = XmlElementVariant<
  'xs:simpleType',
  XmlElement<
    'xs:restriction',
    { base: Scalars['QName'] },
    [
      XsAnnotation | null,
      [
        XsSimpleType | null,
        (XsMinExclusive | XsMinInclusive | XsMaxInclusive | XsMinLength | XsEnumeration | XsPattern)[]
      ]
    ]
  >
>;

export type XsSimpleContentRestriction = XmlElementVariant<
  'xs:simpleContent',
  XmlElement<
    'xs:restriction',
    { base: Scalars['QName'] },
    [
      XsAnnotation | null,
      (
        | [
            XsSimpleType | null,
            (XsMinExclusive | XsMinInclusive | XsMaxInclusive | XsMinLength | XsEnumeration | XsPattern)[]
          ]
        | null
      ),
      (XsAttribute | XsAttributeGroup)[]
    ]
  >
>;

export type XsComplexContentRestriction = XmlElementVariant<
  'xs:complexContent',
  XmlElement<
    'xs:restriction',
    { base: Scalars['QName'] },
    [XsAnnotation | null, [XsGroup | XsChoice | XsSequence] | null, [(XsAttribute | XsAttributeGroup)[], null]]
  >
>;

export type XsEnumeration = XmlElement<'xs:enumeration', { value: Scalars['string'] }, []>;

export type XsMinInclusive = XmlElement<'xs:minInclusive', { value: Scalars['number'] }, []>;

export type XsMaxInclusive = XmlElement<'xs:maxInclusive', { value: Scalars['number'] }, []>;

export type XsPattern = XmlElement<'xs:pattern', { value: string }, []>;

export type XsUnion = XmlElement<'xs:union', { memberTypes: Scalars['QName'] }, [XsAnnotation | null, XsSimpleType[]]>;

export type XsMinExclusive = XmlElement<'xs:minExclusive', { value: Scalars['number'] }, []>;

export type XsMinLength = XmlElement<'xs:minLength', { value: Scalars['number'] }, []>;

export type XsAttributeGroup = XmlElement<
  'xs:attributeGroup',
  { name: Scalars['NCName']; ref: Scalars['QName'] },
  [XsAnnotation | null, [(XsAttribute | XsAttributeGroup)[], null]]
>;

export type XsAttribute = XmlElement<
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

export type XsComplexType = XmlElement<
  'xs:complexType',
  { name: Scalars['NCName'] },
  (
    | XsAnnotation
    | XsSimpleContent
    | XsComplexContent
    | XsGroup
    | XsChoice
    | XsSequence
    | XsAttribute
    | XsAttributeGroup
  )[]
>;

export type XsSimpleContent = XmlElement<
  'xs:simpleContent',
  Record<string, never>,
  [XsAnnotation | null, XsSimpleContentRestriction | XsSimpleContentExtension]
>;

export type XsSimpleContentExtension = XmlElementVariant<
  'xs:simpleContent',
  XmlElement<
    'xs:extension',
    { base: Scalars['QName'] },
    [XsAnnotation | null, [(XsAttribute | XsAttributeGroup)[], null]]
  >
>;

export type XsComplexContentExtension = XmlElementVariant<
  'xs:complexContent',
  XmlElement<
    'xs:extension',
    { base: Scalars['QName'] },
    [XsAnnotation | null, [XsGroup | XsChoice | XsSequence | null, [(XsAttribute | XsAttributeGroup)[], null]]]
  >
>;

export type XsChoice = XmlElement<
  'xs:choice',
  { maxOccurs: Scalars['occurs']; minOccurs: Scalars['occurs'] },
  [XsAnnotation | null, (XsElement | XsGroup | XsChoice | XsSequence)[]]
>;

export type XsElement = XmlElement<
  'xs:element',
  {
    name: Scalars['NCName'];
    type: Scalars['QName'];
    minOccurs: Scalars['occurs'];
    maxOccurs: Scalars['occurs'];
    block: Scalars['block'];
    final: Scalars['final'];
  },
  [...XsAnnotation[], XsSimpleType | XsComplexType]
>;

export type XsSequence = XmlElement<'xs:sequence', { minOccurs: Scalars['occurs']; maxOccurs: Scalars['occurs'] }, []>;

export type XsGroup = XmlElement<
  'xs:group',
  { ref: Scalars['QName']; minOccurs: Scalars['occurs']; maxOccurs: Scalars['occurs']; name: Scalars['NCName'] },
  []
>;

export type XsComplexContent = XmlElement<
  'xs:complexContent',
  { name: Scalars['NCName'] },
  [
    XsAnnotation | null,
    XsSimpleContent | XsComplexContent | (XsGroup | XsChoice | XsSequence) | null,
    [(XsAttribute | XsAttributeGroup)[], null]
  ]
>;
