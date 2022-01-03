import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<level>` element
 *
 * Parent elements: `<attributes>`, `<backup>`, `<barline>`, `<direction>`, `<figure>`, `<figured-bass>`, `<forward>`,
 * `<harmony>`, `<lyric>`, `<notations>`, `<note>`, `<part-group>`
 *
 * The `<level>` element is used to specify editorial information for different MusicXML elements. The content contains
 * identifying and/or descriptive text about the editorial status of the parent element.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/level/}
 */
export type Level = ReturnType<typeof Level>;

export const Level = xml.element(
  'level',
  {
    attributes: {
      /**
       * Specifies whether or not brackets are put around a symbol for an editorial indication. If not specified, it is
       * left to application defaults.
       */
      bracket: t.optional(dataTypes.yesNo()),

      /**
       * Specifies whether or not parentheses are put around a symbol for an editorial indication. If not specified, it
       * is left to application defaults.
       */
      parentheses: t.optional(dataTypes.yesNo()),

      /**
       * If the reference attribute is yes, this indicates editorial information that is for display only and should not
       * affect playback. For instance, a modern edition of older music may set reference="yes" on the attributes
       * containing the music's original clef, key, and time signature. It is no if not specified.
       */
      reference: t.optional(dataTypes.yesNo()),

      /**
       * Specifies the symbol size to use for an editorial indication. If not specified, it is left to application
       * defaults.
       */
      size: t.optional(dataTypes.symbolSize()),

      /**
       * Indicates whether the editorial information applies to the start of a series of symbols, the end of a series of
       * symbols, or a single symbol. It is single if not specified for compatibility with earlier MusicXML versions.
       */
      type: t.optional(dataTypes.startStopSingle()),
    },
    content: [t.required(dataTypes.string())] as const,
  },
  {}
);
