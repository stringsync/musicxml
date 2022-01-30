import { AnyFunction } from '../util';
import { t } from './t';
import { Descriptor, XMLElement, XMLElementFactory } from './types';

export const isString = (value: any): value is string => {
  return typeof value === 'string';
};

export const isNumber = (value: any): value is number => {
  return typeof value === 'number' && !isNaN(value);
};

export const isNull = (value: any): value is null => {
  return value === null;
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

export const isXMLElementFactory = (value: any): value is XMLElementFactory<any, any, any> => {
  return isFunction(value) && 'elementName' in value;
};

export const isXMLElement = (value: any): value is XMLElement<any, any, any> => {
  return isObject(value) && value.type === 'element';
};

export const toCamelCase = (str: string) => {
  return str
    .split('-')
    .map((part) => part[0].toUpperCase() + part.substring(1))
    .join('');
};
