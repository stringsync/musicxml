import { t, xml } from '../xml';

/**
 * Parent element: `<work>`
 *
 * The `<opus>` element represents a link to a MusicXML opus document that composes multiple MusicXML scores into a
 * collection.
 */
export type Opus = ReturnType<typeof Opus>;

export const Opus = xml.element(
  'opus',
  {
    attributes: {
      ['xlink:href']: t.required(t.string()),
      ['xlink:actuate']: t.optional(t.string()),
      ['xlink:role']: t.optional(t.string()),
      ['xlink:show']: t.optional(t.oneOf('new', 'replace', 'embed', 'other', 'none')),
      ['xlink:title']: t.optional(t.string()),
      ['xlink:type']: t.optional(t.oneOf('simple')),
    },
    content: [],
  },
  {}
);
