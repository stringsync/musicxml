import { MusicXMLError } from '../errors';
import { Cursor } from '../util';
import { fromString } from './fromString';
import * as helpers from './helpers';
import {
  Child,
  ChoicesDescriptor,
  Descriptor,
  DescriptorValue,
  FloatDescriptor,
  IntDescriptor,
  OneOrMoreDescriptor,
  OptionalDescriptor,
  RawXMLElement,
  RequiredDescriptor,
  Resolution,
  StringDescriptor,
  XMLElementFactory,
  ZeroOrMoreDescriptor,
} from './types';
import { zero } from './zero';

export const fromRawXMLElements = <T extends Descriptor | Descriptor[]>(
  elements: RawXMLElement[],
  child: T
): DescriptorValue<T> => {
  const res = resolve(Cursor.from(elements), child);
  switch (res.type) {
    case 'resolved':
    case 'zero':
      return res.value;
    default:
      return zero(child);
  }
};

const resolve = (cursor: Cursor<RawXMLElement>, child: Child): Resolution => {
  if (cursor.done()) {
    return { type: 'zero', value: zero(child) };
  }
  if (helpers.isString(child)) {
    return resolveConstant(cursor, child);
  }
  if (helpers.isNumber(child)) {
    return resolveConstant(cursor, child);
  }
  if (helpers.isDescriptor(child)) {
    switch (child.type) {
      case 'optional':
      case 'required':
        return resolveRequirement(cursor, child);
      case 'choices':
        return resolveChoices(cursor, child);
      case 'zeroOrMore':
      case 'oneOrMore':
        return resolveMulti(cursor, child);
      case 'constant':
        return resolveConstant(cursor, child.value);
      case 'string':
      case 'int':
      case 'float':
        return resolvePrimitive(cursor, child);
    }
  }
  if (helpers.isXMLElementFactory(child)) {
    return resolveElement(cursor, child);
  }
  if (helpers.isFunction(child)) {
    return resolve(cursor, child());
  }
  if (helpers.isArray(child)) {
    return resolveArray(cursor, child);
  }
  throw new MusicXMLError({
    symptom: 'cannot handle child',
    context: { child },
    remedy: 'use a valid child',
  });
};

const resolveRequirement = (
  cursor: Cursor<RawXMLElement>,
  descriptor: OptionalDescriptor<any> | RequiredDescriptor<any>
): Resolution => {
  const resolution = resolve(cursor, descriptor.value);
  switch (resolution.type) {
    case 'none':
      return { type: 'zero', value: zero(descriptor) };
    case 'zero':
    case 'resolved':
      return resolution;
  }
};

const resolvePrimitive = (
  cursor: Cursor<RawXMLElement>,
  descriptor: IntDescriptor | FloatDescriptor | StringDescriptor
): Resolution => {
  const element = cursor.get();
  if (element.type === 'text') {
    cursor.next();
    return { type: 'resolved', value: fromString(element.text, descriptor) };
  } else {
    return { type: 'zero', value: zero(descriptor) };
  }
};

const resolveConstant = (cursor: Cursor<RawXMLElement>, child: string | number): Resolution => {
  const element = cursor.get();
  if (element.type === 'text' && element.text === child.toString()) {
    cursor.next();
    return { type: 'resolved', value: child };
  } else {
    return { type: 'zero', value: child };
  }
};

const resolveChoices = (cursor: Cursor<RawXMLElement>, descriptor: ChoicesDescriptor<any>): Resolution => {
  const results = new Array<{ resolution: Resolution; cursor: Cursor<RawXMLElement> }>();
  for (const choice of descriptor.choices) {
    const probeCursor = cursor.dup();
    const resolution = resolve(probeCursor, choice);
    results.push({ resolution, cursor: probeCursor });
  }

  const resolvedResults = results.filter((result) => result.resolution.type === 'resolved');
  const maxResolvedIndex = Math.max(cursor.getIndex(), ...resolvedResults.map((result) => result.cursor.getIndex()));

  const cursorDidNotMove = cursor.getIndex() === maxResolvedIndex;
  if (cursorDidNotMove) {
    return { type: 'zero', value: zero(descriptor) };
  }

  for (const result of resolvedResults) {
    if (maxResolvedIndex === result.cursor.getIndex()) {
      cursor.sync(result.cursor);
      return { type: 'resolved', value: result.resolution.value };
    }
  }

  return { type: 'zero', value: zero(descriptor) };
};

const resolveMulti = (
  cursor: Cursor<RawXMLElement>,
  descriptor: ZeroOrMoreDescriptor<any> | OneOrMoreDescriptor<any>
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
    return { type: 'zero', value: zero(descriptor) };
  } else {
    return { type: 'resolved', value };
  }
};

const resolveContent = (cursor: Cursor<RawXMLElement>, descriptors: Descriptor[]) => {
  const content = new Array<any>();
  for (const descriptor of descriptors) {
    const resolution = resolve(cursor, descriptor);
    switch (resolution.type) {
      case 'none':
        content.push(zero(descriptor));
        break;
      case 'resolved':
      case 'zero':
        content.push(resolution.value);
    }
  }
  return content;
};

const resolveElement = (cursor: Cursor<RawXMLElement>, factory: XMLElementFactory<any, any, any>): Resolution => {
  const element = cursor.get();
  if (element.type === 'element' && element.name === factory.elementName) {
    cursor.next();

    const attributes: any = {};
    for (const [name, value] of Object.entries(element.attributes)) {
      if (name in factory.schema.attributes) {
        const descriptor = factory.schema.attributes[name];
        attributes[name] = fromString(value, descriptor);
      }
    }

    const content = resolveContent(Cursor.from(element.children), factory.schema.content);
    return {
      type: 'resolved',
      value: factory({ attributes, content }),
    };
  }

  return { type: 'none', value: undefined };
};

const resolveArray = (cursor: Cursor<RawXMLElement>, children: any[]): Resolution => {
  const value = new Array<any>();
  const probeCursor = cursor.dup();
  for (const child of children) {
    const resolution = resolve(probeCursor, child);
    switch (resolution.type) {
      case 'none':
        return { type: 'none', value: undefined };
      case 'zero':
      case 'resolved':
        value.push(resolution.value);
    }
  }
  cursor.sync(probeCursor);
  return { type: 'resolved', value };
};
