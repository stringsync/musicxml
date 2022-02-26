import { parse } from './parse';

describe('parse', () => {
  it('parses a simple document', () => {
    const result = parse('<?xml version="1.0" encoding="UTF-8" ?><root></root>');
    expect(result).toStrictEqual({
      declaration: { attributes: { encoding: 'UTF-8', version: '1.0' } },
      root: { type: 'element', name: 'root', attributes: {}, contents: [] },
    });
  });
});
