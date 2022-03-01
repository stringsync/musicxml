import { XsSimpleTypeRestriction } from '.';
import { EventHandlers, Schema } from '../schemas';
import * as util from '../util';
import { TypeRegistry } from './TypeRegistry';
import { XmlDocument, XsComplexType, XsElement, XsEnumeration, XsGroup, XsSimpleType, XsUnion } from './types';
import { isNamed, isXsElement } from './util';

export const generate = (version: string, xsd: XmlDocument): Schema => {
  const registry = TypeRegistry.from(xsd);
  const schemaGenerator = new SchemaGenerator(version, registry);
  schemaGenerator.generate();
  return schemaGenerator.schema;
};

class SchemaGenerator {
  schema: Schema;
  registry: TypeRegistry;

  constructor(version: string, registry: TypeRegistry) {
    this.registry = registry;
    this.schema = {
      version,
      root: [{ dummy: 0 }],
      states: {},
    };
  }

  generate() {
    this.generateRoot();
    this.generateStates();
  }

  private generateRoot() {
    const roots = this.registry.getEntries().filter(isXsElement).filter(isNamed);
    this.schema.root = [Object.fromEntries(roots.map((root) => [root.attributes.name, 1]))];
  }

  private generateStates() {
    for (const entryName of this.registry.getNames()) {
      const entry = this.registry.get(entryName);
      switch (entry.tagName) {
        case 'xs:simpleType':
          this.schema.states[entryName] = this.onXsSimpleType(entry);
          break;
        case 'xs:complexType':
          this.schema.states[entryName] = this.onXsComplexType(entry);
          break;
        case 'xs:group':
          this.schema.states[entryName] = this.onXsGroup(entry);
          break;
        case 'xs:element':
          this.schema.states[entryName] = this.onXsElement(entry);
          break;
        default:
          util.assertUnreachable();
      }
    }
  }

  private onXsSimpleType(xsSimpleType: XsSimpleType): EventHandlers[] {
    for (const content of xsSimpleType.contents) {
      switch (content.tagName) {
        case 'xs:restriction':
          return this.onXsSimpleTypeRestriction(content);
        case 'xs:union':
          return this.onXsUnion(content);
      }
    }
    return util.assertUnreachable();
  }

  private onXsSimpleTypeRestriction(xsSimpleTypeRestriction: XsSimpleTypeRestriction): EventHandlers[] {
    for (const content of xsSimpleTypeRestriction.contents) {
      switch (content.tagName) {
        case 'xs:simpleType':
          return this.onXsSimpleType(content);
        case 'xs:enumeration':
          return this.onXsEnumeration(content);
      }
    }
    return util.assertUnreachable();
  }

  private onXsComplexType(xsComplexType: XsComplexType): EventHandlers[] {
    return [];
  }

  private onXsElement(xsElement: XsElement): EventHandlers[] {
    return [];
  }

  private onXsGroup(xsGroup: XsGroup): EventHandlers[] {
    return [];
  }

  private onXsUnion(xsUnion: XsUnion): EventHandlers[] {
    return [];
  }

  private onXsEnumeration(xsEnumeration: XsEnumeration): EventHandlers[] {
    return [];
  }
}
