import { Descriptor, t, XMLElement, XMLElementCtor, XMLElementSchema } from '../schema';
import { AnyFunction } from './types';

export const isString = (value: any): value is string => {
  return typeof value === 'string';
};

export const isNumber = (value: any): value is number => {
  return typeof value === 'number' && !isNaN(value);
};

export const isNull = (value: any): value is null => {
  return value === null;
};

export const isUndefined = (value: any): value is undefined => {
  return typeof value === 'undefined';
};

export const isFunction = (value: any): value is AnyFunction => {
  return typeof value === 'function';
};

export const isArray = (value: any): value is any[] => {
  return Array.isArray(value);
};

export const isObject = (value: any): value is Record<string, any> => {
  return !!value && typeof value === 'object';
};

export const isDescriptor = (value: any): value is Descriptor => {
  return isObject(value) && value.type in t;
};

export const isXMLElementSchema = (value: any): value is XMLElementSchema => {
  return isObject(value) && isString(value.name) && isObject(value.attributes) && isArray(value.contents);
};

export const isXMLElement = (value: any): value is XMLElement => {
  return isObject(value) && isXMLElementSchema(value.schema) && isObject(value.attributes) && isArray(value.contents);
};

export const isXMLElementCtor = (value: any): value is XMLElementCtor => {
  return 'schema' in value && isXMLElementSchema(value.schema) && isFunction(value);
};
