import { MusicXmlError } from '../MusicXmlError';
import { XmlDocument, XsComplexType, XsElement, XsGroup, XsSimpleType } from './types';
import { isNamed, isXsComplexType, isXsElement, isXsGroup, isXsSimpleType } from './util';

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
          if (isNamed(content)) {
            entries[content.attributes.name] = content;
          } else {
            throw new MusicXmlError(`expected type registry entry to be named: ${JSON.stringify(content, null, 2)}`);
          }
        }
      }
    }

    return new TypeRegistry(entries);
  }

  private constructor(private entries: Record<string, TypeRegistryEntry>) {}

  get(name: string): TypeRegistryEntry {
    if (!this.has(name)) {
      throw new MusicXmlMissingEntryError(`could not find entry with name: ${name}`);
    }
    return this.entries[name];
  }

  has(name: string): boolean {
    return typeof this.entries[name] !== 'undefined';
  }

  getNames(): string[] {
    return Object.keys(this.entries);
  }

  getEntries(): TypeRegistryEntry[] {
    return Object.values(this.entries);
  }
}
