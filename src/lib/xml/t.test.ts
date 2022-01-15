import { getZeroValue } from '.';
import { Descriptor, getDecoder, isValid, t } from './t';

describe('t', () => {
  describe('getZeroValue', () => {
    it.each<{ name: string; createDescriptor: () => Descriptor; expectation: any }>([
      {
        name: 'string',
        createDescriptor: () => t.string(),
        expectation: '',
      },
      {
        name: 'int',
        createDescriptor: () => t.int(),
        expectation: 0,
      },
      {
        name: 'float',
        createDescriptor: () => t.float(),
        expectation: 0.0,
      },
      {
        name: 'regex',
        createDescriptor: () => t.regex({ pattern: /foo/, zero: () => 'foo' }),
        expectation: 'foo',
      },
      {
        name: 'range',
        createDescriptor: () => t.range({ min: 42, max: 100 }),
        expectation: 42,
      },
      {
        name: 'date',
        createDescriptor: () => t.date(),
        expectation: new Date(1970, 0, 1, 0, 0, 0, 0),
      },
      {
        name: 'constant',
        createDescriptor: () => t.constant('foo'),
        expectation: 'foo',
      },
      {
        name: 'choices',
        createDescriptor: () => t.choices('foo', 'bar', 'baz'),
        expectation: 'foo',
      },
      {
        name: 'optional',
        createDescriptor: () => t.optional(t.string()),
        expectation: null,
      },
      {
        name: 'required',
        createDescriptor: () => t.required(t.string()),
        expectation: '',
      },
      {
        name: 'zeroOrMore',
        createDescriptor: () => t.zeroOrMore(t.string()),
        expectation: [],
      },
      {
        name: 'oneOrMore',
        createDescriptor: () => t.oneOrMore(t.string()),
        expectation: [''],
      },
      {
        name: 'custom',
        createDescriptor: () => {
          const identity = <T>(x: T) => x;
          return t.custom({
            decode: identity,
            encode: identity,
            isValid: () => true,
            zero: () => 'foo',
          });
        },
        expectation: 'foo',
      },
      {
        name: 'not',
        createDescriptor: () => t.not(t.constant('foo'), t.string()),
        expectation: '',
      },
    ])('gets the zero value of $name', ({ createDescriptor, expectation }) => {
      const descriptor = createDescriptor();
      expect(getZeroValue(descriptor)).toStrictEqual(expectation);
    });
  });

  describe('isValid', () => {
    it.each<{ name: string; createDescriptor: () => Descriptor; value: any; expectation: boolean }>([
      {
        name: 'valid strings',
        createDescriptor: () => t.string(),
        value: 'foo',
        expectation: true,
      },
      {
        name: 'invalid strings',
        createDescriptor: () => t.string(),
        value: Symbol('foo'),
        expectation: false,
      },
      {
        name: 'valid regex',
        createDescriptor: () => t.regex({ pattern: /bar/, zero: () => 'bar' }),
        value: 'bar',
        expectation: true,
      },
      {
        name: 'invalid regex',
        createDescriptor: () => t.regex({ pattern: /bar/, zero: () => 'bar' }),
        value: 'baz',
        expectation: false,
      },
      {
        name: 'valid ints',
        createDescriptor: () => t.int(),
        value: 42,
        expectation: true,
      },
      {
        name: 'invalid ints',
        createDescriptor: () => t.int(),
        value: 4.2,
        expectation: false,
      },
      {
        name: 'valid floats',
        createDescriptor: () => t.float(),
        value: 4.2,
        expectation: true,
      },
      {
        name: 'invalid floats',
        createDescriptor: () => t.float(),
        value: NaN,
        expectation: false,
      },
      {
        name: 'valid ranges',
        createDescriptor: () => t.range({ min: 0, max: 100 }),
        value: 42,
        expectation: true,
      },
      {
        name: 'invalid ranges',
        createDescriptor: () => t.range({ min: 0, max: 100 }),
        value: 101,
        expectation: false,
      },
      {
        name: 'valid constants',
        createDescriptor: () => t.constant('foo'),
        value: 'foo',
        expectation: true,
      },
      {
        name: 'invalid constants',
        createDescriptor: () => t.constant('foo'),
        value: 'bar',
        expectation: false,
      },
      {
        name: 'valid dates',
        createDescriptor: () => t.date(),
        value: new Date(),
        expectation: true,
      },
      {
        name: 'invalid dates',
        createDescriptor: () => t.date(),
        value: 'foo',
        expectation: false,
      },
      {
        name: 'valid empty optionals',
        createDescriptor: () => t.optional(t.string()),
        value: null,
        expectation: true,
      },
      {
        name: 'valid non-empty optionals',
        createDescriptor: () => t.optional(t.string()),
        value: 'hello',
        expectation: true,
      },
      {
        name: 'invalid non-empty optionals',
        createDescriptor: () => t.optional(t.string()),
        value: 42,
        expectation: false,
      },
      {
        name: 'valid required',
        createDescriptor: () => t.required(t.int()),
        value: 42,
        expectation: true,
      },
      {
        name: 'invalid required',
        createDescriptor: () => t.required(t.int()),
        value: 4.2,
        expectation: false,
      },
      {
        name: 'valid zeroOrMore',
        createDescriptor: () => t.zeroOrMore(t.int()),
        value: [4, 2, 42],
        expectation: true,
      },
      {
        name: 'invalid zeroOrMore',
        createDescriptor: () => t.zeroOrMore(t.int()),
        value: [4, 2.1, 42],
        expectation: false,
      },
      {
        name: 'valid oneOrMore',
        createDescriptor: () => t.oneOrMore(t.int()),
        value: [42],
        expectation: true,
      },
      {
        name: 'invalid oneOrMore',
        createDescriptor: () => t.oneOrMore(t.int()),
        value: [],
        expectation: false,
      },
      {
        name: 'valid simple choices',
        createDescriptor: () => t.choices('foo', 'bar'),
        value: 'foo',
        expectation: true,
      },
      {
        name: 'invalid simple choices',
        createDescriptor: () => t.choices('foo', 'bar'),
        value: 'baz',
        expectation: false,
      },
      {
        name: 'valid complex choices',
        createDescriptor: () =>
          t.choices([t.choices('foo', 'qux'), t.regex({ pattern: /bar/, zero: () => 'bar' })], ['baz']),
        value: ['qux', 'bar'],
        expectation: true,
      },
      {
        name: 'invalid complex choices',
        createDescriptor: () => t.choices(['foo', t.constant('bar')], ['baz']),
        value: ['foo', 'baz'],
        expectation: false,
      },
      {
        name: 'valid simple not descriptor',
        createDescriptor: () => t.not('bar', t.string()),
        value: 'baz',
        expectation: true,
      },
      {
        name: 'invalid simple not descriptor',
        createDescriptor: () => t.not('bar', t.string()),
        value: 'bar',
        expectation: false,
      },
      {
        name: 'valid complex not descriptor',
        createDescriptor: () =>
          t.not(['bar', t.regex({ pattern: /baz/, zero: () => 'baz' })], t.zeroOrMore(t.string())),
        value: ['bar', 'bar'],
        expectation: true,
      },
      {
        name: 'invalid complex not descriptor',
        createDescriptor: () =>
          t.not(['bar', t.regex({ pattern: /baz/, zero: () => 'baz' })], t.zeroOrMore(t.string())),
        value: ['bar', 'baz'],
        expectation: false,
      },
      {
        name: 'valid object schema',
        createDescriptor: () => t.required({ foo: t.string(), bar: t.int() }),
        value: { foo: 'foo', bar: 42 },
        expectation: true,
      },
      {
        name: 'invalid object schema',
        createDescriptor: () => t.required({ foo: t.string(), bar: t.int() }),
        value: { foo: 'foo', bar: 4.2 },
        expectation: false,
      },
    ])('validates $name', ({ createDescriptor, value, expectation }) => {
      const descriptor = createDescriptor();
      expect(isValid(value, descriptor)).toBe(expectation);
    });
  });

  describe('getDecoder', () => {
    it.each<{ name: string; createDescriptor: () => Descriptor; value: any; expectation: any }>([
      {
        name: 'strings',
        createDescriptor: () => t.string(),
        value: 'foo',
        expectation: 'foo',
      },
      {
        name: 'ints',
        createDescriptor: () => t.int(),
        value: '42',
        expectation: 42,
      },
      {
        name: 'floats',
        createDescriptor: () => t.float(),
        value: '4.2',
        expectation: 4.2,
      },
      {
        name: 'constants',
        createDescriptor: () => t.constant('foo'),
        value: 'bar',
        expectation: 'foo',
      },
      {
        name: 'dates',
        createDescriptor: () => t.date(),
        value: '2022-01-15T13:47:12.000Z',
        expectation: new Date('2022-01-15T13:47:12.000Z'),
      },
      {
        name: 'empty optionals as null',
        createDescriptor: () => t.optional(t.string()),
        value: '',
        expectation: null,
      },
      {
        name: 'optional strings',
        createDescriptor: () => t.optional(t.string()),
        value: 'foo',
        expectation: 'foo',
      },
      {
        name: 'optional ints',
        createDescriptor: () => t.optional(t.int()),
        value: '42',
        expectation: 42,
      },
      {
        name: 'optional floats',
        createDescriptor: () => t.optional(t.float()),
        value: '4.2',
        expectation: 4.2,
      },
      {
        name: 'optional empty constants',
        createDescriptor: () => t.optional(t.constant('foo')),
        value: '',
        expectation: 'foo',
      },
      {
        name: 'optional non-empty constants',
        createDescriptor: () => t.optional(t.constant('foo')),
        value: 'bar',
        expectation: 'foo',
      },
      {
        name: 'required strings',
        createDescriptor: () => t.required(t.string()),
        value: 'foo',
        expectation: 'foo',
      },
      {
        name: 'required ints',
        createDescriptor: () => t.required(t.int()),
        value: '42',
        expectation: 42,
      },
      {
        name: 'required floats',
        createDescriptor: () => t.required(t.float()),
        value: '4.2',
        expectation: 4.2,
      },
      {
        name: 'ranges',
        createDescriptor: () => t.range({ min: 0, max: 100 }),
        value: '42',
        expectation: 42,
      },
      {
        name: 'choices with a valid string',
        createDescriptor: () => t.choices('foo', 'bar'),
        value: 'foo',
        expectation: 'foo',
      },
      {
        name: 'choices with an invalid string',
        createDescriptor: () => t.choices('foo', 'bar'),
        value: 'baz',
        expectation: 'foo',
      },
      {
        name: 'not with an included value',
        createDescriptor: () => t.not(t.constant('foo'), t.constant('bar')),
        value: 'bar',
        expectation: 'bar',
      },
      {
        name: 'not with an excluded value',
        createDescriptor: () => t.not(t.constant('foo'), t.constant('bar')),
        value: 'foo',
        expectation: 'bar',
      },
      {
        name: 'simple zeroOrMore descriptor',
        createDescriptor: () => t.zeroOrMore(t.string()),
        value: ['foo'],
        expectation: ['foo'],
      },
      {
        name: 'complex zeroOrMore descriptor',
        createDescriptor: () => t.zeroOrMore([t.regex({ pattern: /foo|bar/, zero: () => 'foo' }), t.int()]),
        value: [
          ['foo', '42'],
          ['bar', '4'],
          ['baz', '2'],
        ],
        expectation: [
          ['foo', 42],
          ['bar', 4],
          ['foo', 2],
        ],
      },
      {
        name: 'simple oneOrMore descriptor',
        createDescriptor: () => t.oneOrMore(t.string()),
        value: ['foo'],
        expectation: ['foo'],
      },
      {
        name: 'simple oneOrMore descriptor with empty value',
        createDescriptor: () => t.oneOrMore(t.string()),
        value: [],
        expectation: [''],
      },
      {
        name: 'simple oneOrMore descriptor with empty value',
        createDescriptor: () => t.oneOrMore(t.string()),
        value: [],
        expectation: [''],
      },
      {
        name: 'complex oneOrMore descriptor',
        createDescriptor: () => t.oneOrMore([t.string(), t.int()]),
        value: [['foo', 42]],
        expectation: [['foo', 42]],
      },
      {
        name: 'complex oneOrMore descriptor with empty value',
        createDescriptor: () => t.oneOrMore([t.string(), t.int()]),
        value: [],
        expectation: [['', 0]],
      },
    ])('decodes $name', ({ createDescriptor, value: input, expectation }) => {
      const descriptor = createDescriptor();
      const decode = getDecoder(descriptor);
      expect(decode(input)).toStrictEqual(expectation);
    });
  });
});
