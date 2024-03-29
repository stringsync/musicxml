import { schema, t } from '../schema';
import { Encoder } from './Encoder';
import { EncodingDate } from './EncodingDate';
import { EncodingDescription } from './EncodingDescription';
import { Software } from './Software';
import { Supports } from './Supports';

/**
 * The `<encoding>` element
 *
 * Parent element: `<identification>`
 *
 * The `<encoding>` element contains information about who did the digital encoding, when, with what software, and in
 * what aspects.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/encoding/}
 */
export const Encoding = schema('encoding', {}, [
  t.label({
    label: 'encodings',
    value: t.zeroOrMore([
      t.optional(EncodingDate),
      t.optional(Encoder),
      t.optional(Software),
      t.optional(EncodingDescription),
      t.optional(Supports),
    ]),
  }),
] as const);
