import { t, xml } from '../xml';

/**
 * Parent element: `<system-dividers>`
 *
 * The `<left-divider>` element indicates the presence or absence of a system divider (also known as a system separation
 * mark) displayed on the left side of the page.
 *
 * The default vertical position is half the `<system-distance>` value from the top of the system that is below the
 * divider. The default horizontal position is the left system margin.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/left-divider/}
 */
export type LeftDivider = ReturnType<typeof LeftDivider>;

export const LeftDivider = xml.element(
  'left-divider',
  {
    attributes: {
      /**
       * Indicates the color of an element.
       */
      color: t.optional(t.color()),

      /**
       * 	Changes the computation of the default horizontal position. The origin is changed relative to the left-hand
       * side of the note or the musical position within the bar. Positive x is right and negative x is left.
       *
       * This attribute provides higher-resolution positioning data than the `<offset>` element. Applications reading a
       * MusicXML file that can understand both features should generally rely on this attribute for its greater
       * accuracy.
       */
      ['default-x']: t.optional(t.float()),

      /**
       * Changes the computation of the default vertical position. The origin is changed relative to the top line of the
       * staff. Positive y is up and negative y is down.
       *
       * This attribute provides higher-resolution positioning data than the placement attribute. Applications reading a
       * MusicXML file that can understand both attributes should generally rely on this attribute for its greater
       * accuracy.
       */
      ['default-y']: t.optional(t.float()),

      /**
       * A comma-separated list of font names.
       */
      ['font-family']: t.optional(t.string()),

      /**
       * One of the CSS sizes or a numeric point size.
       */
      ['font-size']: t.optional(t.float()),

      /**
       * Normal or italic style.
       */
      ['font-style']: t.optional(t.choices('normal' as const, 'italic' as const)),

      /**
       * Normal or bold weight.
       */
      ['font-weight']: t.optional(t.choices('normal' as const, 'bold' as const)),

      /**
       * In cases where text extends over more than one line, horizontal alignment and justify values can be different.
       * The most typical case is for credits, such as:
       *
       * Words and music by
       *   Pat Songwriter
       *
       * Typically this type of credit is aligned to the right, so that the position information refers to the
       * right-most part of the text. But in this example, the text is center-justified, not right-justified.
       *
       * The halign attribute is used in these situations. If it is not present, its value is the same as for the
       * justify attribute. For elements where a justify attribute is not allowed, the default is
       * implementation-dependent.
       */
      halign: t.optional(t.choices('left' as const, 'center' as const, 'right' as const)),

      /**
       * Specifies whether or not to print an object. It is yes if not specified.
       */
      ['print-object']: t.optional(t.choices('yes' as const, 'no' as const)),

      /**
       * Changes the horizontal position relative to the default position, either as computed by the individual
       * program, or as overridden by the default-x attribute. Positive x is right and negative x is left. It should be
       * interpreted in the context of the <offset> element or directive attribute if those are present.
       */
      ['relative-x']: t.optional(t.float()),

      /**
       * Changes the horizontal position relative to the default position, either as computed by the individual
       * program, or as overridden by the default-x attribute. Positive x is right and negative x is left. It should be
       * interpreted in the context of the <offset> element or directive attribute if those are present.
       */
      ['relative-y']: t.optional(t.float()),

      /**
       * Indicates vertical alignment to the top, middle, bottom, or baseline of the text. The default is
       * implementation-dependent.
       */
      valign: t.optional(t.choices('top' as const, 'middle' as const, 'bottom' as const, 'baseline' as const)),
    },
    content: [] as const,
  },
  {}
);

const l = LeftDivider();
l.attributes.color;
