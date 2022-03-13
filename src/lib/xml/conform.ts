import { MusicXMLError } from '../errors';
import * as operations from '../operations';
import * as resolutions from '../resolutions';
import * as schema from '../schema';
import * as util from '../util';
import { parsePrimitive } from './parsePrimitive';
import { XmlNode } from './types';

export const conform = <T extends schema.Descriptor | schema.Descriptor[]>(
  nodes: XmlNode[],
  child: T
): resolutions.Resolution => {
  return resolve(util.Cursor.from(nodes), child);
};

const resolve = (cursor: util.Cursor<XmlNode>, child: schema.DescriptorChild): resolutions.Resolution => {
  if (cursor.done()) {
    return resolutions.zero(operations.zero(child));
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
      case 'date':
        return resolveDate(cursor, child);
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
  throw new MusicXMLError('cannot handle child', { child });
};

const resolveRequirement = (
  cursor: util.Cursor<XmlNode>,
  descriptor: schema.OptionalDescriptor<any> | schema.RequiredDescriptor<any>
): resolutions.Resolution => {
  const probeCursor = cursor.dup();
  const resolution = resolve(probeCursor, descriptor.value);
  switch (resolution.type) {
    case 'none':
      return resolutions.zero(operations.zero(descriptor));
    case 'zero':
      return resolution;
    case 'resolved':
      cursor.sync(probeCursor);
      return resolution;
  }
};

const resolvePrimitive = (
  cursor: util.Cursor<XmlNode>,
  descriptor: schema.IntDescriptor | schema.FloatDescriptor | schema.StringDescriptor
): resolutions.Resolution => {
  const element = cursor.get();
  if (element.type === 'text') {
    cursor.next();
    return resolutions.resolved(parsePrimitive(element.text, descriptor));
  } else {
    return resolutions.zero(operations.zero(descriptor));
  }
};

const resolveConstant = (cursor: util.Cursor<XmlNode>, child: string | number): resolutions.Resolution => {
  const element = cursor.get();
  if (element.type === 'text' && element.text === child.toString()) {
    cursor.next();
    return resolutions.resolved(child);
  } else {
    return resolutions.zero(child);
  }
};

const resolveChoices = (
  cursor: util.Cursor<XmlNode>,
  descriptor: schema.ChoicesDescriptor<any>
): resolutions.Resolution => {
  const results = new Array<{ resolution: resolutions.Resolution; cursor: util.Cursor<XmlNode> }>();
  for (const choice of descriptor.choices) {
    const probeCursor = cursor.dup();
    const resolution = resolve(probeCursor, choice);
    results.push({ resolution, cursor: probeCursor });
  }

  const resolvedResults = results.filter((result) => result.resolution.type === 'resolved');
  const maxResolvedIndex = Math.max(cursor.getIndex(), ...resolvedResults.map((result) => result.cursor.getIndex()));

  const cursorDidNotMove = cursor.getIndex() === maxResolvedIndex;
  if (cursorDidNotMove) {
    return resolutions.zero(operations.zero(descriptor));
  }

  for (const result of resolvedResults) {
    if (maxResolvedIndex === result.cursor.getIndex()) {
      cursor.sync(result.cursor);
      return result.resolution;
    }
  }

  return resolutions.zero(operations.zero(descriptor));
};

const resolveMulti = (
  cursor: util.Cursor<XmlNode>,
  descriptor: schema.ZeroOrMoreDescriptor<any> | schema.OneOrMoreDescriptor<any>
): resolutions.Resolution => {
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

  if (operations.validate(value, descriptor)) {
    return resolutions.resolved(value);
  } else {
    return resolutions.zero(operations.zero(descriptor));
  }
};

const resolveContent = (
  cursor: util.Cursor<XmlNode>,
  descriptors: schema.Descriptor[] | ReadonlyArray<schema.Descriptor>
) => {
  const content = new Array<any>();
  for (const descriptor of descriptors) {
    const resolution = resolve(cursor, descriptor);
    switch (resolution.type) {
      case 'none':
        content.push(operations.zero(descriptor));
        break;
      case 'resolved':
      case 'zero':
        content.push(resolution.value);
    }
  }
  return content;
};

const resolveElement = (cursor: util.Cursor<XmlNode>, ctor: schema.XMLElementCtor): resolutions.Resolution => {
  const node = cursor.get();
  if (node.type === 'element' && node.name === ctor.schema.name) {
    cursor.next();

    const attributes: any = {};
    for (const [name, value] of Object.entries(node.attributes)) {
      if (name in ctor.schema.attributes) {
        const descriptor = ctor.schema.attributes[name];
        attributes[name] = parsePrimitive(value, descriptor);
      }
    }

    const contents = resolveContent(util.Cursor.from(node.children), ctor.schema.contents);

    return resolutions.resolved(new ctor({ attributes, contents }));
  }

  return resolutions.none();
};

const resolveArray = (cursor: util.Cursor<XmlNode>, children: any[]): resolutions.Resolution => {
  const value = new Array<any>();
  const probeCursor = cursor.dup();
  for (const child of children) {
    const resolution = resolve(probeCursor, child);
    switch (resolution.type) {
      case 'none':
        return resolution;
      case 'zero':
      case 'resolved':
        value.push(resolution.value);
    }
  }
  if (cursor.getIndex() === probeCursor.getIndex()) {
    return resolutions.none();
  }
  cursor.sync(probeCursor);
  return resolutions.resolved(value);
};

const isValidDateString = (str: string) => {
  const timestamp = Date.parse(str);
  return !isNaN(timestamp);
};

const resolveDate = (cursor: util.Cursor<XmlNode>, descriptor: schema.DateDescriptor): resolutions.Resolution => {
  const node = cursor.get();
  if (node.type === 'text' && isValidDateString(node.text)) {
    return resolutions.resolved(new Date(node.text));
  }
  return resolutions.zero(operations.zero(descriptor));
};
