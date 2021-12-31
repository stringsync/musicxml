import { t, xml } from '../xml';

/**
 * Parent element: `<encoding>`
 *
 * The `<supports>` element indicates if a MusicXML encoding supports a particular MusicXML element. This is recommended
 * for elements like `<beam>`, `<stem>`, and `<accidental>`, where the absence of an element is ambiguous if you do not
 * know if the encoding supports that element. It also allows programs to indicate support for specific attributes, or
 * specific attributes with specific values. This lets applications communicate, for example, that all system and/or
 * page breaks are contained in the MusicXML file.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/supports/}
 */
export type Supports = ReturnType<typeof Supports>;

export const Supports = xml.element(
  'supports',
  {
    attributes: {
      element: t.required(t.string()),
      type: t.required(t.choices('yes', 'no')),
      attribute: t.optional(t.string()),
      value: t.optional(t.string()),
    },
    content: [],
  },
  {}
);
