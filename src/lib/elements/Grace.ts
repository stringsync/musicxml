import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';

/**
 * The `<grace>` element
 *
 * Parent element: `<note>`
 *
 * The `<grace>` element indicates the presence of a grace note.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/grace/}
 */
export type Grace = ReturnType<typeof Grace>;

export const Grace = xml.element(
  'grace',
  {
    attributes: {
      /**
       * Indicates to make time, not steal time, for grace note playback. The units are in real-time divisions for the
       * grace note.
       */
      ['make-time']: t.optional(dataTypes.divisions()),

      /**
       * The value is yes for slashed grace notes and no if no slash is present.
       */
      slash: t.optional(dataTypes.yesNo()),

      /**
       * Indicates the percentage of time to steal from the following note for the grace note playback, as for
       * appoggiaturas.
       */
      ['steal-time-following']: t.optional(dataTypes.percent()),

      /**
       * The steal-time-previous attribute indicates the percentage of time to steal from the previous note for the
       * grace note playback.
       */
      ['steal-time-previous']: t.optional(dataTypes.percent),
    },
    content: [] as const,
  },
  {}
);
