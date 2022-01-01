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
      /**
       * Indicates the element that is supported or not by the encoding.
       */
      element: t.required(t.string()),

      /**
       * If yes, the absence of a particular element with a specified attribute or value is meaningful. It indicates
       * that this information is not present in the score. If no, the absence is not meaningful because the encoding
       * does not include this type of information.
       */
      type: t.required(t.choices('yes' as const, 'no' as const)),

      /**
       * Indicates a specific element attribute that is supported or not by the encoding.
       */
      attribute: t.optional(t.string()),

      /**
       * Indicates a specific attribute value that is supported or not by the encoding. Only used together with the
       * attribute attribute.
       */
      value: t.optional(t.string()),
    },
    content: [] as const,
  },
  {}
);
