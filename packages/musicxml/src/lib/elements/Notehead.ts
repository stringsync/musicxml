import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<notehead>` element
 *
 * Parent element: `<note>`
 *
 * The `<notehead>` element indicates shapes other than the open and closed ovals associated with note durations.
 *
 * The smufl attribute can be used to specify a particular notehead, allowing application interoperability without
 * requiring every Standard Music Font Layout (SMuFL) glyph to have a MusicXML element equivalent. This attribute can be
 * used either with the other value, or to refine a specific notehead value such as cluster.
 *
 * Noteheads in the SMuFL Note name noteheads and Note name noteheads supplement ranges
 * (U+E150–U+E1AF and U+EEE0–U+EEFF) should not use the smufl attribute or the other value, but instead use the
 * `<notehead-text>` element.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/notehead/}
 */
export const Notehead = schema(
  'notehead',
  {
    /**
     * Indicates the color of an element.
     */
    color: t.optional(dataTypes.color()),

    /**
     * Changes the appearance of enclosed shapes from the default of hollow for half notes and longer, and filled
     * otherwise.
     */
    filled: t.optional(dataTypes.yesNo()),

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
     * If yes, the notehead is parenthesized. It is no if not specified.
     */
    parentheses: t.optional(dataTypes.yesNo()),

    /**
     * Indicates a particular Standard Music Font Layout (SMuFL) character using its canonical glyph name. Sometimes
     * this is a formatting choice, and sometimes this is a refinement of the semantic meaning of an element.
     */
    smufl: t.optional(dataTypes.smuflGlyphName()),
  },
  [t.required(dataTypes.noteheadValue())] as const
);
