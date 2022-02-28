import { MusicXmlError } from '../MusicXmlError';
import { XmlDocument, XsComplexType, XsElement, XsGroup, XsSimpleType } from './types';
import { isXsComplexType, isXsElement, isXsGroup, isXsSimpleType } from './util';

class MusicXmlMissingEntryError extends MusicXmlError {}

export type TypeRegistryEntry = XsSimpleType | XsComplexType | XsGroup | XsElement;

const isTypeRegistryEntry = (value: any): value is TypeRegistryEntry => {
  return isXsSimpleType(value) || isXsComplexType(value) || isXsGroup(value) || isXsElement(value);
};

export class TypeRegistry {
  static from(xsd: XmlDocument) {
    const entries: Record<string, TypeRegistryEntry> = {};

    if (xsd.root.type === 'element') {
      for (const content of xsd.root.contents) {
        if (isTypeRegistryEntry(content)) {
          entries[content.attributes.name] = content;
        }
      }
    }

    return new TypeRegistry(entries);
  }

  private constructor(private entries: Record<string, TypeRegistryEntry>) {}

  getEntry(name: string): TypeRegistryEntry {
    const entry = this.entries[name];
    if (typeof entry === 'undefined') {
      throw new MusicXmlMissingEntryError(`could not find entry with name: ${name}`);
    }
    return entry;
  }
}
