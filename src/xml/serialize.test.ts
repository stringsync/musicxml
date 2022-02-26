import { parse } from './parse';
import { seralize } from './serialize';

describe('serialize', () => {
  it('serializes a simple element', () => {
    const document = parse('<?xml version="1.0" encoding="UTF-8"?><root></root>');
    const xml = seralize(document);
    expect(xml).toBe('<?xml version="1.0" encoding="UTF-8"?>\n<root/>');
  });
});
