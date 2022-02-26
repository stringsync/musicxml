import { parse } from './parse';

describe('parse', () => {
  it('parses a document with a declaration and root', () => {
    const result = parse('<?xml version="1.0" encoding="UTF-8" ?><root></root>');
    expect(result).toStrictEqual({
      declaration: { attributes: { encoding: 'UTF-8', version: '1.0' } },
      root: { type: 'element', name: 'root', attributes: {}, contents: [] },
    });
  });

  it('parses a document with just a root', () => {
    const result = parse('<root></root>');
    expect(result).toStrictEqual({
      declaration: { attributes: { encoding: 'UTF-8', version: '1.0' } },
      root: { type: 'element', name: 'root', attributes: {}, contents: [] },
    });
  });

  it('parses a self closing root', () => {
    const result = parse('<root/>');
    expect(result).toStrictEqual({
      declaration: { attributes: { encoding: 'UTF-8', version: '1.0' } },
      root: { type: 'element', name: 'root', attributes: {}, contents: [] },
    });
  });

  it('parses nested elements', () => {
    const result = parse('<foo><bar></bar></foo>');
    expect(result).toStrictEqual({
      declaration: { attributes: { encoding: 'UTF-8', version: '1.0' } },
      root: {
        type: 'element',
        name: 'foo',
        attributes: {},
        contents: [{ type: 'element', name: 'bar', attributes: {}, contents: [] }],
      },
    });
  });

  it('parses attributes', () => {
    const result = parse('<root foo="foo" bar="42" baz="False"></root>');
    expect(result).toStrictEqual({
      declaration: { attributes: { encoding: 'UTF-8', version: '1.0' } },
      root: { type: 'element', name: 'root', attributes: { foo: 'foo', bar: '42', baz: 'False' }, contents: [] },
    });
  });

  it('throws an error when there is more than one root', () => {
    expect(() => parse('<root1></root1><root2></root2>')).toThrow();
  });
});
