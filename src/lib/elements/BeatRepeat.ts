import * as dataTypes from '../dataTypes';
import { t, xml } from '../xml';
import { ExceptVoice } from './ExceptVoice';
import { SlashDot } from './SlashDot';
import { SlashType } from './SlashType';

/**
 * The `<beat-repeat>` element
 *
 * Parent element: `<measure-style>`
 *
 * The `<beat-repeat>` element is used to indicate that a single beat (but possibly many notes) is repeated.
 *
 * The stop type indicates the first beat where the repeats are no longer displayed. Both the start and stop of the
 * beats being repeated should be specified unless the repeats are displayed through the end of the part.
 *
 * The `<beat-repeat>` element specifies a notation style for repetitions. The actual music being repeated needs to be
 * repeated within the MusicXML file. This element specifies the notation that indicates the repeat.
 *
 * {@link https://www.w3.org/2021/06/musicxml40/musicxml-reference/elements/beat-repeat/}
 */
export type BeatRepeat = ReturnType<typeof BeatRepeat>;

export const BeatRepeat = xml.element(
  'beat-repeat',
  {
    attributes: {
      /**
       * Indicates the starting or stopping point of the section displaying the beat repeat symbols.
       */
      type: t.required(dataTypes.startStop()),

      /**
       * Specifies the number of slashes to use in the symbol. The value is 1 if not specified.
       */
      slashes: t.optional(dataTypes.positiveInteger()),

      /**
       * Indicates whether or not to use dots as well (for instance, with mixed rhythm patterns). The value is no if not
       * specified.
       */
      ['use-dots']: t.optional(dataTypes.yesNo()),
    },
    content: [
      t.optional([t.optional([t.required(SlashType), t.zeroOrMore(SlashDot)]), t.zeroOrMore(ExceptVoice)]),
    ] as const,
  },
  {}
);
