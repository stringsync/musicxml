import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<kind>` element
 *
 * Parent element: `<harmony>`
 *
 * The `<kind>` element indicates the type of chord. The `<degree>` elements can then add, subtract, or alter from these
 * starting points
 *
 * The attributes are used to indicate the formatting of the symbol. Since the `<kind>` element is the constant in all
 * the harmony-chord element groups that can make up a polychord, many formatting attributes are here. The alignment
 * attributes are for the entire harmony-chord group of which this kind element is a part.
 *
 * For the major-minor `<kind>`, only the minor symbol is used when use-symbols is yes. The major symbol is set using
 * the symbol attribute in the `<degree-value>` element. The corresponding `<degree-alter>` value will usually be 0 in
 * this case.
 *
 * The text attribute may use strings such as "13sus" that refer to both the kind and one or more `<degree>` elements.
 * In this case, the corresponding `<degree>` elements should have the print-object attribute set to no to keep
 * redundant alterations from being displayed.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/kind/}
 */
export type Kind = ReturnType<typeof Kind>;

export const Kind = xml.element(
  'kind',
  {
    attributes: {
      /**
       * The bracket-degrees attribute is yes if all the degrees should be in a bracket. The default is
       * implementation-dependent.
       */
      ['bracket-degrees']: t.optional(dataTypes.yesNo()),

      /**
       * Indicates the color of an element.
       */
      color: t.optional(dataTypes.color()),

      /**
       * 	Changes the computation of the default horizontal position. The origin is changed relative to the left-hand
       * side of the note or the musical position within the bar. Positive x is right and negative x is left.
       *
       * This attribute provides higher-resolution positioning data than the `<offset>` element. Applications reading a
       * MusicXML file that can understand both features should generally rely on this attribute for its greater
       * accuracy.
       */
      ['default-x']: t.optional(dataTypes.tenths()),

      /**
       * Changes the computation of the default vertical position. The origin is changed relative to the top line of the
       * staff. Positive y is up and negative y is down.
       *
       * This attribute provides higher-resolution positioning data than the placement attribute. Applications reading a
       * MusicXML file that can understand both attributes should generally rely on this attribute for its greater
       * accuracy.
       */
      ['default-y']: t.optional(dataTypes.tenths()),

      /**
       * A comma-separated list of font names.
       */
      ['font-family']: t.optional(dataTypes.fontFamily()),

      /**
       * One of the CSS sizes or a numeric point size.
       */
      ['font-size']: t.optional(dataTypes.fontSize()),

      /**
       * Normal or italic style.
       */
      ['font-style']: t.optional(dataTypes.fontStyle()),

      /**
       * Normal or bold weight.
       */
      ['font-weight']: t.optional(dataTypes.fontWeight()),

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
      halign: t.optional(dataTypes.leftCenterRight()),

      /**
       * The parentheses-degrees attribute is yes if all the degrees should be in parentheses. The default is
       * implementation-dependent.
       */
      ['parentheses-degrees']: t.optional(dataTypes.yesNo()),

      /**
       * Changes the horizontal position relative to the default position, either as computed by the individual
       * program, or as overridden by the default-x attribute. Positive x is right and negative x is left. It should be
       * interpreted in the context of the <offset> element or directive attribute if those are present.
       */
      ['relative-x']: t.optional(dataTypes.tenths()),

      /**
       * Changes the horizontal position relative to the default position, either as computed by the individual
       * program, or as overridden by the default-x attribute. Positive x is right and negative x is left. It should be
       * interpreted in the context of the <offset> element or directive attribute if those are present.
       */
      ['relative-y']: t.optional(dataTypes.tenths()),

      /**
       * If yes, the `<degree>` elements should be stacked above each other. The default is implementation-dependent.
       */
      ['stack-degrees']: t.optional(dataTypes.yesNo()),

      /**
       * Describes how the `<kind>` should be spelled in a score. If the use-symbols attribute is yes, this value
       * follows the symbol. The default is implementation-dependent.
       */
      text: t.optional(dataTypes.token()),

      /**
       * 	The use-symbols attribute is yes if the `<kind>` should be represented when possible with harmony symbols
       * rather than letters and numbers. These symbols include:
       *
       * - major: a triangle, like Unicode 25B3
       * - minor: -, like Unicode 002D
       * - augmented: +, like Unicode 002B
       * - diminished: °, like Unicode 00B0
       * - half-diminished: ø, like Unicode 00F8
       *
       * The default is implementation-dependent.
       */
      ['use-symbols']: t.optional(dataTypes.yesNo()),

      /**
       * Indicates vertical alignment to the top, middle, bottom, or baseline of the text. The default is
       * implementation-dependent.
       */
      valign: t.optional(dataTypes.valign()),
    },
    content: [t.required(dataTypes.kindValue())] as const,
  },
  {}
);
