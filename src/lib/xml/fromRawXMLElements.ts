import { MusicXMLError } from '../errors';
import {
  ChoicesDescriptor,
  Descriptor,
  DescriptorChild,
  FloatDescriptor,
  IntDescriptor,
  OneOrMoreDescriptor,
  OptionalDescriptor,
  RequiredDescriptor,
  StringDescriptor,
  XMLElement,
  XMLElementCtor,
  ZeroOrMoreDescriptor,
} from '../schema';
import * as util from '../util';
import { Cursor } from '../util';
import { fromString } from './fromString';
import { RawXMLElement, Resolution } from './types';
import { zero } from './zero';

export const fromRawXMLElements = <T extends Descriptor[]>(elements: RawXMLElement[], child: T): XMLElement[] => {
  const res = resolve(Cursor.from(elements), child);
  switch (res.type) {
    case 'resolved':
    case 'zero':
      return res.value;
    default:
      return zero(child);
  }
};

const resolve = (cursor: Cursor<RawXMLElement>, child: DescriptorChild): Resolution => {
  if (cursor.done()) {
    return { type: 'zero', value: zero(child) };
  }
  if (util.isString(child)) {
    return resolveConstant(cursor, child);
  }
  if (util.isNumber(child)) {
    return resolveConstant(cursor, child);
  }
  if (util.isDescriptor(child)) {
    switch (child.type) {
      case 'label':
        return resolve(cursor, child.value);
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
  if (util.isXMLElementCtor(child)) {
    return resolveElement(cursor, child);
  }
  if (util.isFunction(child)) {
    return resolve(cursor, child());
  }
  if (util.isArray(child)) {
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
  const probeCursor = cursor.dup();
  const resolution = resolve(probeCursor, descriptor.value);
  switch (resolution.type) {
    case 'none':
      return { type: 'zero', value: zero(descriptor) };
    case 'zero':
      return resolution;
    case 'resolved':
      cursor.sync(probeCursor);
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
    if (cursor.done()) {
      shouldResolve = false;
    }
  }

  if (descriptor.type === 'oneOrMore' && value.length < 1) {
    return { type: 'zero', value: zero(descriptor) };
  } else {
    return { type: 'resolved', value };
  }
};

const resolveContent = (cursor: Cursor<RawXMLElement>, descriptors: Descriptor[] | ReadonlyArray<Descriptor>) => {
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

const resolveElement = (cursor: Cursor<RawXMLElement>, ctor: XMLElementCtor): Resolution => {
  const element = cursor.get();
  if (element.type === 'element' && element.name === ctor.schema.name) {
    cursor.next();

    const attributes: any = {};
    for (const [name, value] of Object.entries(element.attributes)) {
      if (name in ctor.schema.attributes) {
        const descriptor = ctor.schema.attributes[name];
        attributes[name] = fromString(value, descriptor);
      }
    }

    const content = resolveContent(Cursor.from(element.children), ctor.schema.contents);
    return {
      type: 'resolved',
      value: new ctor({ attributes, content }),
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
  if (cursor.getIndex() === probeCursor.getIndex()) {
    return { type: 'none', value: undefined };
  }
  cursor.sync(probeCursor);
  return { type: 'resolved', value };
};
