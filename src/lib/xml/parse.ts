import { MusicXMLError } from '../errors';
import { Cursor } from '../util';
import { Descriptor, DESCRIPTOR_NAMES, getDecoder, getZeroValue, Resolve, t } from './t';
import { RawXMLElement } from './types';
import { XMLElementFactory } from './xml';

type Resolution =
  | {
      type: 'none';
      value: undefined;
    }
  | {
      type: 'zero';
      value: any;
    }
  | {
      type: 'resolved';
      value: any;
    };

export const parse = <T extends Descriptor | ReadonlyArray<Descriptor>>(
  elements: RawXMLElement[],
  descriptor: T
): Resolve<T> => {
  const cursor = Cursor.from(elements);
  const resolution = resolve(cursor, descriptor);
  switch (resolution.type) {
    case 'none':
      return getZeroValue(descriptor);
    case 'zero':
    case 'resolved':
      return resolution.value;
  }
};

const isXMLElementFactory = (value: any): value is XMLElementFactory<any, any, any> => {
  return typeof value === 'function' && typeof value.elementName === 'string';
};

const isDescriptor = (value: any): value is Descriptor => {
  return typeof value === 'object' && DESCRIPTOR_NAMES.has(value.type);
};

const resolve = (cursor: Cursor<RawXMLElement>, schema: any): Resolution => {
  if (cursor.done()) {
    return { type: 'zero', value: getZeroValue(schema) };
  }

  if (isDescriptor(schema)) {
    const descriptor = schema;
    switch (descriptor.type) {
      case 'optional':
      case 'required':
        return resolveRequirement(cursor, descriptor);
      case 'choices':
        return resolveChoices(cursor, descriptor);
      case 'zeroOrMore':
      case 'oneOrMore':
        return resolveMulti(cursor, descriptor);
      case 'constant':
        return resolveConstant(descriptor);
      case 'string':
      case 'int':
      case 'float':
        return resolvePrimitive(cursor, descriptor);
    }
  }

  if (isXMLElementFactory(schema)) {
    return resolveElement(cursor, schema);
  }

  if (Array.isArray(schema)) {
    return { type: 'resolved', value: schema.map((s) => resolve(cursor, s)) };
  }

  throw new MusicXMLError({
    symptom: 'cannot handle schema',
    context: { schema },
    remedy: 'fix the schema or update resolve',
  });
};

const resolveRequirement = (
  cursor: Cursor<RawXMLElement>,
  descriptor: ReturnType<typeof t['optional' | 'required']>
): Resolution => {
  const resolution = resolve(cursor, descriptor.value);
  switch (resolution.type) {
    case 'none':
      return { type: 'zero', value: getZeroValue(descriptor) };
    case 'zero':
    case 'resolved':
      return resolution;
  }
};

const resolveChoices = (cursor: Cursor<RawXMLElement>, descriptor: ReturnType<typeof t['choices']>): Resolution => {
  for (const choice of descriptor.values) {
    const probeCursor = cursor.dup();
    const resolution = resolve(probeCursor, choice);
    if (resolution.type === 'resolved') {
      cursor.sync(probeCursor);
      return resolution;
    }
  }
  return { type: 'zero', value: getZeroValue(descriptor) };
};

const resolveMulti = (
  cursor: Cursor<RawXMLElement>,
  descriptor: ReturnType<typeof t['zeroOrMore' | 'oneOrMore']>
): Resolution => {
  const value = new Array<any>();

  let shouldResolve = true;
  while (shouldResolve) {
    const probeCursor = cursor.dup();
    const resolution = resolve(probeCursor, descriptor.value);
    if (resolution.type === 'resolved') {
      cursor.sync(probeCursor);
      value.push(resolution.value);
    } else {
      shouldResolve = false;
    }
  }

  if (descriptor.type === 'oneOrMore' && value.length < 1) {
    return { type: 'zero', value: getZeroValue(descriptor) };
  } else {
    return { type: 'resolved', value };
  }
};

const resolveConstant = (descriptor: ReturnType<typeof t['constant']>): Resolution => {
  return { type: 'resolved', value: descriptor.value.toString() };
};

const resolvePrimitive = (
  cursor: Cursor<RawXMLElement>,
  descriptor: ReturnType<typeof t['string' | 'float' | 'int']>
): Resolution => {
  const element = cursor.get();
  if (element.type === 'text') {
    cursor.next();
    const decode = getDecoder(descriptor);
    return { type: 'resolved', value: decode(element.text) };
  } else {
    return { type: 'zero', value: getZeroValue(descriptor) };
  }
};

const resolveElement = (cursor: Cursor<RawXMLElement>, factory: XMLElementFactory<any, any, any>): Resolution => {
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

    const resolution = resolve(Cursor.from(element.children), factory.schema.content);
    switch (resolution.type) {
      case 'none':
        return { type: 'zero', value: factory() };
      case 'zero':
      case 'resolved':
        return {
          type: 'resolved',
          value: factory({ attributes, content: resolution.value.map((r: Resolution) => r.value) }),
        };
    }
  }

  return { type: 'none', value: undefined };
};
