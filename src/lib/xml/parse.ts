import * as xmlJs from 'xml-js';
import { t } from '.';
import { MusicXMLError } from '../errors';
import { Descriptor, DESCRIPTOR_NAMES } from './t';
import { XMLElement, XMLElementFactory } from './xml';

type XMLElementsOf<T> = T extends Array<infer V>
  ? XMLElementsOf<V>
  : T extends XMLElementFactory<any, any, any>
  ? ReturnType<T>
  : never;

type RawXMLElement =
  | {
      type: 'element';
      name: string;
      attributes: Record<string, string>;
      children: RawXMLElement[];
    }
  | {
      type: 'text';
      text: string;
    };

type DescriptorChild =
  | { type: 'factory'; factory: XMLElementFactory<any, any, any> }
  | { type: 'descriptor'; descriptor: Descriptor }
  | { type: 'tuple'; values: Array<string | Descriptor | XMLElementFactory<any, any, any>> }
  | { type: 'string'; string: string };

const isXMLElementFactory = (value: any): value is XMLElementFactory<any, any, any> => {
  return typeof value === 'function' && typeof value.elementName === 'string';
};

const isDescriptor = (value: any): value is Descriptor => {
  return typeof value === 'object' && DESCRIPTOR_NAMES.has(value.type);
};

const isString = (value: any): value is string => {
  return typeof value === 'string';
};

const isChild = (value: any): boolean => {
  if (Array.isArray(value)) {
    return true;
  }
  if (isXMLElementFactory(value)) {
    return true;
  }
  if (isDescriptor(value)) {
    switch (value.type) {
      case 'constant':
      case 'custom':
      case 'date':
      case 'float':
      case 'int':
      case 'range':
      case 'regex':
      case 'string':
      case 'choices':
        return true;
    }
  }
  return false;
};

const toChild = (value: any): DescriptorChild => {
  if (Array.isArray(value)) {
    return { type: 'tuple', values: value };
  }
  if (isXMLElementFactory(value)) {
    return { type: 'factory', factory: value };
  }
  if (isDescriptor(value)) {
    return { type: 'descriptor', descriptor: value };
  }
  if (isString(value)) {
    return { type: 'string', string: value };
  }
  throw new MusicXMLError({
    symptom: 'cannot convert to leaf',
    context: { value },
    remedy: 'update toLeaf to handle value',
  });
};

const getChild = (descriptor: Descriptor): DescriptorChild => {
  const dfs = (value: any): DescriptorChild => {
    if (isChild(value)) {
      return toChild(value);
    }
    if (isDescriptor(value)) {
      const descriptor = value;
      switch (descriptor.type) {
        case 'optional':
        case 'required':
        case 'zeroOrMore':
        case 'oneOrMore':
          return dfs(descriptor.value);
      }
    }
    throw new MusicXMLError({
      symptom: 'cannot get leaf',
      context: { value },
      remedy: 'check if the value is leaf-able',
    });
  };
  return dfs(descriptor);
};

const toPlainAttributes = (attributes?: xmlJs.Attributes | undefined): Record<string, string> => {
  if (!attributes) {
    return {};
  }
  return Object.keys(attributes).reduce((plainAttributes, key) => {
    plainAttributes[key] = attributes[key]!.toString();
    return plainAttributes;
  }, {} as Record<keyof typeof attributes, string>);
};

const toRawXMLElement = (element: xmlJs.Element): RawXMLElement => {
  switch (element.type) {
    case 'element':
      return {
        type: 'element',
        name: element.name || 'unknown',
        attributes: toPlainAttributes(element.attributes),
        children: (element.elements || []).map(toRawXMLElement),
      };
    case 'text':
      return {
        type: 'text',
        text: element.text?.toString() || '',
      };
    default:
      throw new MusicXMLError({
        symptom: 'cannot parse element',
        context: { element },
        remedy: 'update the implementation of toRawXMLElement to handle element',
      });
  }
};

export const parse = <R extends [XMLElementFactory<any, any, any>, ...XMLElementFactory<any, any, any>[]]>(
  xml: string,
  roots: R
): XMLElementsOf<R> => {
  const xmlJsElements = xmlJs.xml2js(xml).elements || [];
  const rawXmlElements = xmlJsElements.map(toRawXMLElement);
  const rootDescriptors = roots.map(t.optional);

  const dfs = (elements: RawXMLElement[], descriptors: Descriptor[]): Array<string | XMLElement<any, any, any>> => {
    const children = descriptors.map(getChild);
    const factories = new Array<XMLElementFactory<any, any, any>>();
    for (const child of children) {
      if (child.type === 'factory') {
        factories.push(child.factory);
      }
    }

    const xmlElements = new Array<string | XMLElement<any, any, any>>();
    for (const element of elements) {
      if (element.type === 'element') {
        const factory = factories.find((factory) => factory.elementName === element.name);
        if (!factory) {
          continue;
        }
        xmlElements.push(
          factory({
            attributes: element.attributes,
            content: dfs(element.children, factory.schema.content),
          })
        );
      }

      if (element.type === 'text') {
        xmlElements.push(element.text);
      }
    }

    return xmlElements;
  };

  return dfs(rawXmlElements, rootDescriptors) as XMLElementsOf<R>;
};

// const getXMLElementFactory = (value: any): XMLElementFactory | null => {
//   if (typeof value === 'function' && 'elementName' in value) {
//     return value;
//   }
//   if (isDescriptor(value)) {
//     const descriptor = value;
//     switch (descriptor.type) {
//       case 'optional':
//       case 'required':
//         return getXMLElementFactory(descriptor.value);
//       default:
//         return null;
//     }
//   }
//   throw new Error('lol');
// };

// export const dfs = (rawElements: RawXMLElement[], descriptors: Descriptor[]): XMLElement<any, any, any>[] => {
//   const factories = descriptors.map(getXMLElementFactory);
//   const registry = factories.reduce((registry, factory) => {
//     if (factory) {
//       registry[factory.elementName] = factory;
//     }
//     return registry;
//   }, {} as any);

//   const elements = [];
//   for (const rawElement of rawElements) {
//     if (rawElement.type === 'element' && rawElement.name in registry) {
//       const factory = registry[rawElement.name];

//       const attributes: any = {};
//       for (const [name, value] of Object.entries(rawElement.attributes)) {
//         if (name in factory.schema.attributes) {
//           const descriptor = factory.schema.attributes[name];
//           const decode = getDecoder(descriptor);
//           attributes[name] = decode(value);
//         }
//       }

//       const content = dfs(rawElement.children, factory.schema.content);
//       elements.push(factory({ attributes, content }));
//     }
//   }

//   return elements;
// };
