import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';
import { Cancel } from './Cancel';
import { Fifths } from './Fifths';
import { KeyAccidental } from './KeyAccidental';
import { KeyAlter } from './KeyAlter';
import { KeyOctave } from './KeyOctave';
import { KeyStep } from './KeyStep';
import { Mode } from './Mode';

/**
 * The `<key>` element
 *
 * Parent element: `<attributes>`
 *
 * The `<key>` element represents a key signature. Both traditional and non-traditional key signatures are supported.
 * Key signatures appear at the start of each system unless the print-object attribute has been set to "no".
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/key/}
 */
export const Key = schema(
  'key',
  {
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
    ['default-x']: t.label({ label: 'default-x', value: t.optional(dataTypes.tenths()) }),

    /**
     * Changes the computation of the default vertical position. The origin is changed relative to the top line of the
     * staff. Positive y is up and negative y is down.
     *
     * This attribute provides higher-resolution positioning data than the placement attribute. Applications reading a
     * MusicXML file that can understand both attributes should generally rely on this attribute for its greater
     * accuracy.
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
     * Specifies an ID that is unique to the entire document.
     */
    id: t.optional(dataTypes.id()),

    /**
     * Allows a key signature to apply to only the specified staff in the part. If absent, the key signature applies
     * to all staves in the part.
     */
    number: t.optional(dataTypes.staffNumber()),

    /**
     * Specifies whether or not to print an object. It is yes if not specified.
     */
    ['print-object']: t.optional(dataTypes.yesNo()),

    /**
     * Changes the horizontal position relative to the default position, either as computed by the individual
     * program, or as overridden by the default-x attribute. Positive x is right and negative x is left. It should be
     * interpreted in the context of the <offset> element or directive attribute if those are present.
     */
    ['relative-x']: t.label({ label: 'relative-x', value: t.optional(dataTypes.tenths()) }),

    /**
     * Changes the horizontal position relative to the default position, either as computed by the individual
     * program, or as overridden by the default-x attribute. Positive x is right and negative x is left. It should be
     * interpreted in the context of the <offset> element or directive attribute if those are present.
     */
    ['relative-y']: t.label({ label: 'relative-y', value: t.optional(dataTypes.tenths()) }),
  },
  [
    t.label({
      label: 'key',
      value: t.choices(
        [t.optional(Cancel), t.required(Fifths), t.optional(Mode)],
        t.zeroOrMore([t.required(KeyStep), t.required(KeyAlter), t.optional(KeyAccidental)]),
        t.zeroOrMore(KeyOctave)
      ),
    }),
  ] as const
);
