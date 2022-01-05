import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';
import { ArrowDirection } from './ArrowDirection';
import { Arrowhead } from './Arrowhead';
import { ArrowStyle } from './ArrowStyle';
import { CircularArrow } from './CircularArrow';

/**
 * The `<arrow>` element
 *
 * Parent element: `<technical>`
 *
 * The `<arrow>` element represents an arrow used for a musical technical indication. It can represent both Unicode and
 * Standard Music Font Layout (SMuFL) arrows. The smufl attribute distinguishes different SMuFL glyphs that have an
 * arrow appearance such as arrowBlackUp, guitarStrumUp, or handbellsSwingUp. The specified glyph should match the
 * descriptive representation.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/arrow/}
 */
export type Arrow = ReturnType<typeof Arrow>;

export const Arrow = xml.element(
  'arrow',
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
      ['default-x']: t.optional(dataTypes.tenths()),

      /**
       * Changes the computation of the default vertical position. The origin is changed relative to the top line of the
       * staff. Positive y is up and negative y is down.
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
       * Indicates whether something is above or below another element, such as a note or a notation.
       */
      placement: t.optional(dataTypes.aboveBelow()),

      /**
       * Changes the horizontal position relative to the default position, either as computed by the individual program,
       * or as overridden by the default-x attribute. Positive x is right and negative x is left.
       */
      ['relative-x']: t.optional(dataTypes.tenths()),

      /**
       * Changes the vertical position relative to the default position, either as computed by the individual program,
       * or as overridden by the default-y attribute. Positive y is up and negative y is down.
       */
      ['relative-y']: t.optional(dataTypes.tenths()),

      /**
       * Indicates a particular Standard Music Font Layout (SMuFL) character using its canonical glyph name. Sometimes
       * this is a formatting choice, and sometimes this is a refinement of the semantic meaning of an element.
       */
      smufl: t.optional(dataTypes.smuflGlyphName()),
    },
    content: [
      t.required(ArrowDirection),
      t.optional(ArrowStyle),
      t.optional(Arrowhead),
      t.optional(CircularArrow),
    ] as const,
  },
  {}
);
