import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<sync>` element
 *
 * Parent element: `<listening>`
 *
 * The `<sync>` element specifies the style that a score following application should use the synchronize an
 * accompaniment with a performer. If this element is not included in a score, default synchronization depends on the
 * application.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/sync/}
 */
export type Sync = ReturnType<typeof Sync>;

export const Sync = xml.element(
  'sync',
  {
    attributes: {
      /**
       * Specifies the style that a score following application should use to synchronize an accompaniment with a
       * performer.
       */
      type: t.required(dataTypes.syncType()),

      /**
       * Specifies a latency time in milliseconds that the listening application should expect from the performer.
       */
      latency: t.optional(dataTypes.milliseconds()),

      /**
       * Restricts the element to apply to a single `<player>`.
       */
      player: t.optional(dataTypes.idref()),

      /**
       * Restricts the element to apply to a set of times through a repeated section.
       */
      ['time-only']: t.optional(dataTypes.timeOnly()),
    },
    content: [] as const,
  },
  {}
);
