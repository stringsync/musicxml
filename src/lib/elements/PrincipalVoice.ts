import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<principal-voice>` element
 *
 * Parent element: `<direction-type>`
 *
 * The `<principal-voice>` element represents principal and secondary voices in a score, either for analysis or for
 * square bracket symbols that appear in a score. The content of the `<principal-voice>` element is used for analysis
 * and may be any text value.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/principal-voice/}
 */
export type PrincipalVoice = ReturnType<typeof PrincipalVoice>;

export const PrincipalVoice = xml.element(
  'principal-voice',
  {
    attributes: {
      /**
       * Indicates the type of symbol used. When used for analysis separate from any printed score markings, it should
       * be set to none. Otherwise if the type is stop it should be set to plain.
       */
      symbol: t.required(dataTypes.principalVoiceSymbol()),

      /**
       * Indicates if this is the start or stop of the principal voice.
       */
      type: t.required(dataTypes.startStop()),

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
       * Specifies an ID that is unique to the entire document.
       */
      id: t.optional(dataTypes.id()),

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
       * Indicates vertical alignment to the top, middle, bottom, or baseline of the text. The default is
       * implementation-dependent.
       */
      valign: t.optional(dataTypes.valign()),
    },
    content: [t.required(dataTypes.string())] as const,
  },
  {}
);
