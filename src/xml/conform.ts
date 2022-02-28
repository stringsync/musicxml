import { MusicXmlError } from '../MusicXmlError';
import { TypeRegistry, TypeRegistryEntry } from './TypeRegistry';
import { AnyXmlElement, XmlDocument, XmlNode, XsComplexType, XsElement, XsGroup, XsSimpleType } from './types';
import { assertUnreachable, deepCopy, isXmlElement } from './util';

class MusicXmlResolveError extends MusicXmlError {}

export const conform = (xsd: XmlDocument) => {
  const registry = TypeRegistry.from(xsd);
  const resolver = new Resolver(registry);
  return (xml: XmlDocument): XmlDocument => resolver.resolve(xml);
};

class Resolver {
  private registry: TypeRegistry;

  constructor(registry: TypeRegistry) {
    this.registry = registry;
  }

  resolve(xml: XmlDocument): XmlDocument {
    if (!isXmlElement(xml.root)) {
      throw new MusicXmlResolveError(`expected root to be type 'element', got: ${xml.root.type}`);
    }
    return { declaration: deepCopy(xml.declaration), root: this.resolveElement(xml.root) };
  }

  private resolveElement(element: AnyXmlElement): XmlNode {
    if (element.type !== 'element') {
      throw new MusicXmlResolveError(`expected node with type 'element', got: '${element.type}'`);
    }

    const entry = this.registry.getEntry(element.name);
    switch (entry.name) {
      case 'xs:simpleType':
        return this.resolveXsSimpleType(element, entry);
      case 'xs:complexType':
        return this.resolveXsComplexType(element, entry);
      case 'xs:element':
        return this.resolveXsElement(element, entry);
      case 'xs:group':
        return this.resolveXsGroup(element, entry);
    }

    throw new MusicXmlResolveError(`could not resolve element: ${element}`);
  }

  private resolveXsSimpleType(element: AnyXmlElement, xsSimpleType: XsSimpleType): AnyXmlElement {
    throw new MusicXmlResolveError(`could not resolve element: ${element}`);
  }

  private resolveXsComplexType(element: AnyXmlElement, xsComplexType: XsComplexType): AnyXmlElement {
    throw new MusicXmlResolveError(`could not resolve element: ${element}`);
  }

  private resolveXsElement(element: AnyXmlElement, xsElement: XsElement): AnyXmlElement {
    throw new MusicXmlResolveError(`could not resolve element: ${element}`);
  }

  private resolveXsGroup(element: AnyXmlElement, xsGroup: XsGroup): AnyXmlElement {
    throw new MusicXmlResolveError(`could not resolve element: ${element}`);
  }
}

class Validator {
  static validate(node: XmlNode, entry: TypeRegistryEntry): boolean {
    switch (entry.name) {
      case 'xs:element':
      case 'xs:simpleType':
      case 'xs:complexType':
      case 'xs:group':
        return true;
    }
    return assertUnreachable();
  }

  private static validateElement(node: XmlNode, xsElement: XsElement): boolean {
    if (node.type !== 'element') {
      return false;
    }
    return true;
  }

  private static validateElementAttributes(node: XmlNode, xsElement: XsElement): boolean {
    const attributeGroup = xsElement.contents[1];
    return true;
  }

  private static validateElementContent(node: XmlNode, xsElement: XsElement): boolean {
    return true;
  }

  private constructor() {
    // noop
  }
}
