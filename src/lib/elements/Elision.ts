import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<elision>` element
 *
 * Parent element: `<lyric>`
 *
 * The `<elision>` element represents an elision between lyric syllables. The text content specifies the symbol used to
 * display the elision. Common values are a no-break space (Unicode 00A0), an underscore (Unicode 005F), or an undertie
 * (Unicode 203F). If the text content is empty, the smufl attribute is used to specify the symbol to use. If neither
 * text content nor a smufl attribute are present, the elision glyph is application-specific.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/elision/}
 */
export type Elision = ReturnType<typeof Elision>;

export const Elision = xml.element(
  'elision',
  {
    attributes: {
      /**
       * Indicates the color of an element.
       */
      color: t.optional(dataTypes.color()),

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
       * Used to specify the elision symbol to use if the element text content is empty. It is ignored otherwise.
       */
      smufl: t.optional(dataTypes.smuflLyricsGlyphName()),
    },
    content: [] as const,
  },
  {}
);
