import { t, xml } from '../xml';

/**
 * The `<other-appearance>` element
 *
 * Parent element: `<appearance>`
 *
 * The `<other-appearance>` element is used to define any graphical settings not yet in the current version of the
 * MusicXML format. This allows extended representation, though without application interoperability.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/other-appearance/}
 */
export type OtherAppearance = ReturnType<typeof OtherAppearance>;

export const OtherAppearance = xml.element(
  'other-appearance',
  {
    attributes: {
      /**
       * The appearance type being specified.
       */
      type: t.required(t.string()),
    },
    content: [t.required(t.string())] as const,
  },
  {}
);
