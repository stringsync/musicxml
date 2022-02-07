import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<coda>` element
 *
 * Parent elements: `<barline>`, `<direction-type>`
 *
 * The `<coda>` element is the visual indicator of a coda sign. A <sound>` element is also needed to guide playback
 * applications reliably.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/coda/}
 */
export type Coda = ReturnType<typeof Coda>;

export const Coda = xml.element(
  'coda',
  {
    attributes: {
      /**
       * Indicates the color of an element.
       */
      color: t.optional(dataTypes.color()),

      /**
       * Changes the computation of the default horizontal position. If the parent is a `<notehead-text>` element, the
       * origin is changed relative to the left-hand side of the note or the musical position within the bar. Otherwise,
       * the origin is changed relative to the start of the first measure on the system, and these values are used when
       * the current measure or a succeeding measure starts a new system. Positive x is right and negative x is left.
       */
      ['default-x']: t.label({ label: 'default-x', value: t.optional(dataTypes.tenths()) }),

      /**
       * Changes the computation of the default vertical position. The origin is changed relative to the top line of the
       * staff. Positive y is up and negative y is down.
       */
      ['default-y']: t.label({ label: 'default-y', value: t.optional(dataTypes.tenths()) }),

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
       * Changes the horizontal position relative to the default position, either as computed by the individual program,
       * or as overridden by the default-x attribute. Positive x is right and negative x is left.
       */
      ['relative-x']: t.label({ label: 'relative-x', value: t.optional(dataTypes.tenths()) }),

      /**
       * Changes the vertical position relative to the default position, either as computed by the individual program,
       * or as overridden by the default-y attribute. Positive y is up and negative y is down.
       */
      ['relative-y']: t.label({ label: 'relative-y', value: t.optional(dataTypes.tenths()) }),

      /**
       * Specifies the exact Standard Music Font Layout (SMuFL) accidental character, using its SMuFL canonical glyph
       * name.
       */
      smufl: t.optional(dataTypes.smuflAccidentalGlyphName()),

      /**
       * Indicates vertical alignment to the top, middle, bottom, or baseline of the text. The default is
       * implementation-dependent.
       */
      valign: t.optional(dataTypes.valign()),
    },
    content: [] as const,
  },
  {}
);
