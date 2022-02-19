import { schema, t } from '../schema';
import { merge } from './merge';

describe('merge', () => {
  it('calculates the zero value of a schema attributes', () => {
    const Foo = schema(
      'foo',
      {
        bar: t.int(),
        baz: t.string(),
      },
      [] as const
    );

    expect(merge({}, Foo)).toStrictEqual({ bar: 0, baz: '' });
  });

  it('merges attributes with the zero value of a schema', () => {
    const Foo = schema(
      'foo',
      {
        bar: t.int(),
        baz: t.string(),
      },
      [] as const
    );

    expect(merge({ bar: 1 }, Foo)).toStrictEqual({ bar: 1, baz: '' });
  });

  it('uses the zero value if the attribute value is invalid', () => {
    const Foo = schema(
      'foo',
      {
        bar: t.int(),
        baz: t.string(),
      },
      [] as const
    );

    expect(merge({ bar: 'not an int', baz: 42 }, Foo)).toStrictEqual({ bar: 0, baz: '' });
  });
});
