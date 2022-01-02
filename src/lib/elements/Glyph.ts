import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<glyph>` element
 *
 * Parent element: `<appearance>`
 *
 * The `<glyph>` element represents what Standard Music Font Layout (SMuFL) glyph should be used for different
 * variations of symbols that are semantically identical. The type attribute specifies what type of glyph is being
 * defined. The element value specifies what SMuFL canonical glyph name to use, including recommended stylistic
 * alternates.
 *
 * The SMuFL canonical glyph name should match the type. For instance, a type of quarter-rest would use values
 * restQuarter, restQuarterOld, or restQuarterZ. A type of g-clef-ottava-bassa would use values gClef8vb, gClef8vbOld,
 * or gClef8vbCClef. A type of octave-shift-up-8 would use values ottava, ottavaBassa, ottavaBassaBa, ottavaBassaVb, or
 * octaveBassa.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/glyph/}
 */
export type Glyph = ReturnType<typeof Glyph>;

export const Glyph = xml.element(
  'glyph',
  {
    attributes: {
      /**
       * The type of glyph that is being defined.
       */
      type: t.required(dataTypes.glyphType()),
    },
    content: [t.required(dataTypes.smuflGlyphName())] as const,
  },
  {}
);
