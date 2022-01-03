import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<stem>` element
 *
 * Parent element: `<note>`
 *
 * Values for the `<stem>` element can be down, up, none, or double. A `<stem>` element associated with a `<rest>`
 * refers to a stemlet.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/stem/}
 */
export type Stem = ReturnType<typeof Stem>;

export const Stem = xml.element(
  'stem',
  {
    attributes: {
      /**
       * Indicates the color of an element.
       */
      color: t.optional(dataTypes.color()),

      /**
       * Changes the computation of the default horizontal position. The origin is changed relative to the bottom
       * left-hand corner of the specified page. Positive x is right and negative x is left.
       */
      ['default-x']: t.optional(dataTypes.tenths()),

      /**
       * Changes the computation of the default vertical position. The origin is changed relative to the bottom
       * left-hand corner of the specified page. Positive y is up and negative y is down.
       */
      ['default-y']: t.optional(dataTypes.tenths()),

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
    },
    content: [] as const,
  },
  {}
);
