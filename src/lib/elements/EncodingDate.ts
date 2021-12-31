import { t, xml } from '../xml';

/**
 * Parent element: `<encoding>`
 *
 * The `<encoding-date>` element specifies the date of the digital encoding.
 */
export type EncodingDate = ReturnType<typeof EncodingDate>;

export const EncodingDate = xml.element(
  'encoding-date',
  {
    attributes: {},
    content: [
      t.custom({
        zero: () => new Date(1970, 0, 1, 0, 0, 0, 0),
        encode: (date: Date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        decode: (str: string) => new Date(str),
      }),
    ],
  },
  {}
);
