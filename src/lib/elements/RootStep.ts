import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<root-step>` element
 *
 * Parent element: `<root>`
 *
 * The `<root-step>` element represents the pitch step of the root of the current chord within the harmony element.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/root-step/}
 */
export const RootStep = schema(
  'root-step',
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

    /**
     * Indicates how the root should appear in a score if not using the element contents.
     */
    text: t.optional(dataTypes.token()),
  },
  [] as const
);
