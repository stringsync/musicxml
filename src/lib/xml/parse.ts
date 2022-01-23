import * as xmlJs from 'xml-js';
import { MusicXMLError } from '../errors';
import { Cursor } from '../util';
import { Descriptor, DESCRIPTOR_NAMES, getDecoder, getZeroValue, t } from './t';
import { XMLElement, XMLElementFactory } from './xml';

type XMLElementsOf<T> = T extends Array<infer V>
  ? XMLElementsOf<V>
  : T extends XMLElementFactory<any, any, any>
  ? ReturnType<T>
  : never;

export type RawXMLElement =
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

const isXMLElementFactory = (value: any): value is XMLElementFactory<any, any, any> => {
  return typeof value === 'function' && typeof value.elementName === 'string';
};

const isDescriptor = (value: any): value is Descriptor => {
  return typeof value === 'object' && DESCRIPTOR_NAMES.has(value.type);
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

type ParsedElements = string | XMLElement<any, any, any> | null | Array<ParsedElements>;

const resolveChoices = (cursor: Cursor<RawXMLElement>, descriptor: ReturnType<typeof t['choices']>) => {
  for (const choice of descriptor.values) {
    const saveCursor = cursor.dup();
    const resolution = resolve(saveCursor, choice);
    if (resolution) {
      cursor.goto(saveCursor.getIndex());
      return resolution;
    }
  }
  return getZeroValue(descriptor);
};

export const resolve = (cursor: Cursor<RawXMLElement>, schema: any): ParsedElements => {
  if (cursor.done()) {
    return getZeroValue(schema);
  }

  if (isDescriptor(schema)) {
    const descriptor = schema;
    switch (descriptor.type) {
      case 'optional':
      case 'required':
        return resolve(cursor, descriptor.value) || getZeroValue(descriptor);
      case 'choices':
        return resolveChoices(cursor, descriptor);
      case 'zeroOrMore':
        const container: any = [];
        let cursorMoved = true;
        while (cursorMoved) {
          const dupCursor = cursor.dup();
          const resolution = resolve(dupCursor, descriptor.value);
          cursorMoved = cursor.getIndex() !== dupCursor.getIndex();
          cursor.goto(dupCursor.getIndex());
          if (cursorMoved) {
            container.push(resolution);
          }
        }
        return container;
      case 'oneOrMore':
        const container2: any = [];
        let cursorMoved2 = true;
        while (cursorMoved2) {
          const dupCursor = cursor.dup();
          const res2 = resolve(dupCursor, descriptor.value);
          cursorMoved2 = cursor.getIndex() !== dupCursor.getIndex();
          if (cursorMoved2) {
            cursor.goto(dupCursor.getIndex());
            container2.push(res2);
          }
        }
        return container2.length < 1 ? getZeroValue(descriptor) : container2;
      case 'constant':
        return descriptor.value;
      case 'string':
      case 'int':
      case 'float':
        const element = cursor.get();
        if (element.type === 'text') {
          const decode = getDecoder(descriptor);
          return decode(element.text);
        } else {
          return getZeroValue(descriptor);
        }
    }
  }

  if (isXMLElementFactory(schema)) {
    const factory = schema;
    const element = cursor.get();
    if (element.type === 'element' && element.name === factory.elementName) {
      cursor.next();
      const attributes: any = {};
      for (const [name, value] of Object.entries(element.attributes)) {
        if (name in factory.schema.attributes) {
          const descriptor = factory.schema.attributes[name];
          const decode = getDecoder(descriptor);
          attributes[name] = decode(value);
        }
      }
      return factory({
        attributes,
        content: resolve(Cursor.from(element.children), factory.schema.content),
      });
    } else {
      return null;
    }
  }

  if (Array.isArray(schema)) {
    return schema.map((s) => resolve(cursor, s));
  }

  throw new MusicXMLError({
    symptom: 'cannot resolve schema',
    context: { schema },
    remedy: 'update resolve',
  });
};

export const parse = <R extends [XMLElementFactory<any, any, any>, ...XMLElementFactory<any, any, any>[]]>(
  xml: string,
  rootDescriptors: Descriptor[]
): XMLElementsOf<R> => {
  const xmlJsElements = xmlJs.xml2js(xml).elements || [];
  const rawXmlElements = xmlJsElements.map(toRawXMLElement);
  return resolve(rawXmlElements, rootDescriptors) as XMLElementsOf<R>;
};
