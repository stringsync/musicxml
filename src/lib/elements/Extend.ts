import * as dataTypes from '../dataTypes';
import { schema, t } from '../schema';

/**
 * The `<extend>` element
 *
 * Parent elements: `<figure>`, `<lyric>`
 *
 * The `<extend>` element represents lyric word extension / melisma lines as well as figured bass extensions.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/extend/}
 */
export const Extend = schema(
  'extend',
  {
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
     * Changes the horizontal position relative to the default position, either as computed by the individual program,
     * or as overridden by the default-x attribute. Positive x is right and negative x is left. It should be
     * interpreted in the context of the `<offset>` element or directive attribute if those are present.
     */
    ['relative-x']: t.label({ label: 'relative-x', value: t.optional(dataTypes.tenths()) }),

    /**
     * Changes the vertical position relative to the default position, either as computed by the individual program,
     * or as overridden by the default-y attribute. Positive y is up and negative y is down. It should be interpreted
     * in the context of the placement attribute if that is present.
     */
    ['relative-y']: t.label({ label: 'relative-y', value: t.optional(dataTypes.tenths()) }),

    /**
     * Indicates if this is the start, stop, or continuation of the extension. Before Version 3.0 this attribute was
     * not available, and an `<extend>` element was always treated as the start of the extension.
     */
    type: t.optional(dataTypes.startStopContinue()),
  },
  [] as const
);
