import { t } from '.';
import { loadExample } from '../../testing/helpers';
import { parse } from './parse';
import * as xml from './xml';

describe('parse', () => {
  it('sandbox', async () => {
    const Bar = xml.element(
      'bar',
      {
        attributes: {
          bar: t.string(),
        },
        content: [t.string()],
      },
      {}
    );

    const Foo = xml.element(
      'foo',
      {
        attributes: {
          foo: t.string(),
        },
        content: [t.required(Bar)],
      },
      {}
    );

    const xmlStr = await loadExample('nested.xml');

    expect(parse(xmlStr, [Foo])).toBe({});
  });
});
